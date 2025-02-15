import { useState } from "react"

interface InputProps {
    onMessage: (txt: string) => void
}

export const Input = ({ onMessage }: InputProps) => {
    const [txt, setTxt] = useState("")

    return <form onSubmit={(e) => {
        e.preventDefault()

        onMessage(txt)
        setTxt("")
    }} >
        <div className="field has-addons">
            <div className="control is-expanded">
                <input type="text" className="input is-info" placeholder="Your answer..." value={txt}
                    autoFocus
                    onChange={(e) => setTxt(e.target.value)}
                />
            </div>
            <div className="control">
                <input type="submit" className="button is-info" value="Send" />
            </div>
        </div>
    </form>
}