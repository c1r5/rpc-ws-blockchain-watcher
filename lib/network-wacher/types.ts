import { jsonRpcQuery } from "./NetworkWatcher";

export type WebSocketAuth = {
    username: string,
    password: string
}
export type NetworkWebSocketOptions = {
    url?: string
    host?: string,
    port?: string
    auth?: WebSocketAuth
}

export type jsonRpcQueryOptions = {
    id: 0 | 1,
    method: "subscribe"
    jsonrpc: "2.0"
    params: {
        query: string
    }
}

export type Target = {
    network_name: string
    websocketOptions: NetworkWebSocketOptions,
    message: jsonRpcQuery
}