import { BilanItem } from "./history"

const getUrl = () => {
    const defaultUrl = process.env["BACKEND_URL"] || "ws://localhost:8000/ws"
    let localUrl = global?.localStorage?.getItem("BACKEND_URL") || null

    if (localUrl === null) {
        global?.localStorage?.setItem("BACKEND_URL", defaultUrl)
        localUrl = defaultUrl
    }

    return localUrl
}

export class WebSocketHandler {
    private ws: WebSocket

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