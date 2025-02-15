export class WebSocketHandler {
    private ws: WebSocket
    private response: string = ""

    constructor(public onAnswer: (response: string) => void, public onError: (err: string) => void) {
        this.ws = new WebSocket(process.env["BACKEND_URL"] || "ws://localhost:8000/ws")
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
            case "start":
                this.response = ""
                break;
            case "token":
                this.response += msg.content
                break;
            case "end":
                this.onAnswer(this.response)
                this.response = ""
                break;
            default:
                break;
        }
    }

    ask = (message: string) => {
        this.ws.send(message)
    }
}