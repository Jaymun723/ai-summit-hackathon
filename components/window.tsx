import { useEffect, useRef, useState } from "react"
import { Message } from "./message"
import { Input } from "./input"
import styled from "styled-components"

interface WindowProps {

}

const initialMessages: Message[] = [
    { bot: true, txt: "Hi ! what is the name of your event ?" }
    , { txt: "It is called: \"Ai Summit Hackathon\"" },
    { txt: "How many people will attend the event ?", bot: true },
    { txt: "About 500 people." },
    { txt: "Will there be food provided ?", bot: true },
    { txt: "Yes !" },
    { txt: "Have you already ordered the food ? If yes, can you give me a receipt ? If no, what are your plans ?", bot: true }
]

const ChatBox = styled.div`
    max-height: 70vh;
    overflow-y: auto;
    margin: 10px;
    padding-bottom: 10px;
`

export const Window = ({ }: WindowProps) => {
    const [messages, setMessages] = useState(initialMessages)
    const lastMessageRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            lastMessageRef.current.focus();
        }
    }, [messages]);

    return <div className="box">
        <ChatBox>
            {messages.map((msg, i) => (
                <Message key={msg.txt} ref={
                    i === messages.length - 1 ? (lastMessageRef) : null
                } {...msg} />
            ))}
        </ChatBox>

        <Input onMessage={(txt) => {
            setMessages(messages.concat([{ txt }]))
        }} />
    </div>
}