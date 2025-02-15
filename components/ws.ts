import { BilanItem } from "./history"

const getUrl = () => {
    const defaultUrl = process.env["BACKEND_URL"] || "ws://localhost:8000/ws"
    let localUrl = localStorage.getItem("BACKEND_URL")

    if (localUrl === null) {
        localStorage.setItem("BACKEND_URL", defaultUrl)
        localUrl = defaultUrl
    }

    return localUrl
}

export class WebSocketHandler {
    private ws: WebSocket
    private response: string = ""

    constructor(public onAnswer: (response: string) => void, public onError: (err: string) => void, public updateBilan: (bilan: BilanItem[]) => void) {
        this.ws = new WebSocket(getUrl())
        this.ws.addEventListener("error", (err) => {
            console.log(err)
            this.onError("An error as occured.")
        })

        this.ws.addEventListener("message", this.onMessage)

        this.ws.onmessage = (msg) => this.onMessage(msg)
    }

    destory() {
        this.ws.removeEventListener("message", this.onMessage)
    }

    onMessage = (message: MessageEvent<any>) => {
        const msg = JSON.parse(message.data)

        switch (msg.type) {
            case "message":
                this.onAnswer(msg.content)
            case "update_bilan":
                this.updateBilan(JSON.parse(msg.content))
                break;
            default:
                break;
        }
    }

    ask = (message: string) => {
        this.ws.send(message)
    }
}