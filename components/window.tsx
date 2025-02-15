import { act, useContext, useEffect, useMemo, useReducer, useRef, useState } from "react"
import { Message } from "./message"
import { Input } from "./input"
import styled from "styled-components"
import { WebSocketHandler } from "./ws"
import { BilanContext, BilanItem } from "./history"


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
    // const [messages, setMessages] = useState(initialMessages)

    const { changeBilan } = useContext(BilanContext)


    const [state, dispatch] = useReducer(reducer, { answering: false, error: "", messages: [] })

    const lastMessageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            lastMessageRef.current.focus();
        }
    }, [state.messages, changeBilan]);

    const wsHandler = useMemo(() => new WebSocketHandler(
        (answer) => dispatch({ type: "ai_message", content: answer }),
        (err) => dispatch({ type: "error", content: err }),
        (bilan) => changeBilan(bilan)),
        [changeBilan])

    useEffect(() => {
        return () => {
            wsHandler.destory()
        }
    })

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
            wsHandler.ask(txt)
        }} />
    </>
}