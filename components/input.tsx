import { useState } from "react"
import styled from "styled-components"

interface InputProps {
    onMessage: (txt: string) => void
}

const InputWrapper = styled.form`
    grid-area: input;
`

export const Input = ({ onMessage }: InputProps) => {
    const [txt, setTxt] = useState("")

    return <InputWrapper onSubmit={(e) => {
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
    </InputWrapper>
}