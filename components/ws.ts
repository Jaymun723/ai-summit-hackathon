import { BilanItem } from "./history"

export const getWsUrl = () => {
    const defaultUrl = process.env["BACKEND_URL"] || "ws://localhost:8000/ws"
    let localUrl = global?.localStorage?.getItem("BACKEND_URL") || null

    if (localUrl === null) {
        global?.localStorage?.setItem("BACKEND_URL", defaultUrl)
        localUrl = defaultUrl
    }

    return localUrl
}