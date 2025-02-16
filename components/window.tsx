import { act, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Message } from "./message"
import { Input } from "./input"
import styled from "styled-components"
import { getWsUrl } from "./ws"
import { BilanContext, BilanItem } from "./history"
import useWebSocket from "react-use-websocket"




const initialMessages: Message[] = [
    // { bot: true, txt: "Hi ! what is the name of your event ?" }
    // , { txt: "It is called: \"Ai Summit Hackathon\"" },
    // { txt: "How many people will attend the event ?", bot: true },
    // { txt: "About 500 people." },
    // { txt: "Will there be food provided ?", bot: true },
    // { txt: "Yes !" },
    // { txt: "Have you already ordered the food ? If yes, can you give me a receipt ? If no, what are your plans ?", bot: true }
]

const ChatBox = styled.div`
    overflow-y: auto;
    grid-area: chat;
`

interface State {
    error?: string
    answering: boolean
    messages: Message[]
}

const reducer = (state: State, action: { type: string, content: string }): State => {
    if (action.type === "user_message") {
        return { ...state, answering: true, messages: [...state.messages, { txt: action.content }] }
    } else if (action.type === "ai_message") {
        return { ...state, answering: false, messages: [...state.messages, { txt: action.content, bot: true }] }
    } else if (action.type === "error") {
        return { ...state, error: action.content }
    } else {
        return state
    }
}

export const Window = () => {
    const { changeBilan } = useContext(BilanContext)

    const [state, dispatch] = useReducer(reducer, { answering: false, error: "", messages: [] })

    const lastMessageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            lastMessageRef.current.focus();
        }
    }, [state.messages, changeBilan]);


    const [wsUrl, setWsUrl] = useState(getWsUrl())

    const changeWsUrl = (e: KeyboardEvent) => {
        if (e.key === "F1") {
            setWsUrl((wsUrl) => prompt("Ws url ?", wsUrl) || wsUrl)
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", changeWsUrl)

        return () => {
            window.removeEventListener("keydown", changeWsUrl)
        }
    })


    const { lastMessage, sendMessage } = useWebSocket(wsUrl)

    useEffect(() => {
        if (lastMessage !== null) {
            const msg = JSON.parse(lastMessage.data)

            switch (msg.type) {
                case "message":
                    dispatch({ type: "ai_message", content: msg.content })
                    break;
                case "update":

                    const bilan = msg.content.map((item: [number, string, number]) => ({
                        category: item[0],
                        description: item[1],
                        value: item[2]
                    }))

                    changeBilan(bilan)
                    break;
                default:
                    break;
            }
        }
    }, [changeBilan, lastMessage])

    return <>
        <ChatBox className="box">
            {state.error !== "" && (<div className="message is-danger">
                <div className="message-body">{state.error}</div>
            </div>)}
            {state.messages.map((msg, i) => (
                <Message key={msg.txt} ref={
                    i === state.messages.length - 1 ? (lastMessageRef) : null
                } {...msg} />
            ))}
            {state.answering && (
                <button className="button is-text is-large is-fullwidth is-loading"></button>
            )}
        </ChatBox>

        <Input onMessage={(txt) => {
            // setMessages(messages.concat([{ txt }]))
            dispatch({ type: "user_message", content: txt })
            // wsHandler.current?.ask(txt)
            sendMessage(txt)
        }} />
    </>
}