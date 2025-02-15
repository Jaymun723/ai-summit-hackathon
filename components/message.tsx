import React, { forwardRef } from "react"

export interface Message {
    bot?: boolean
    txt: string
}

export const Message = forwardRef<HTMLDivElement, Message>(function MessageEl({ bot, txt }, ref) {
    return <div className={`message ${bot ? "is-primary" : "is-info"}`} ref={ref}>
        {/* <div className="message-header">
            {bot ? "FestiCarbon" : "You"}
        </div> */}
        <div className="message-body">
            {txt}
        </div>
    </div>
})