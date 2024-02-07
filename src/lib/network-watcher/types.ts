import { jsonRpcQuery } from "./NetworkWatcher";

/**
 * @typedef {{
 *  username: string,
 *  passowrd: string
 * }}
 */
export type WebSocketAuth = {
    username: string
    password: string
}

/**
 * @type {{
 *   url?: string
 *   host?: string,
 *   port?: string
 *   auth?: WebSocketAuth
* }}
 */

export type NetworkWebSocketOptions = {
    url?: string
    host?: string,
    port?: string
    auth?: WebSocketAuth
}
/**
 * @typedef {{
 *   id: 0 | 1,
 *   method: "subscribe"
 *   jsonrpc: "2.0"
 *   params: {
 *   query: string
 * }
}}
 */
export type jsonRpcQueryOptions = {
    id: 0 | 1,
    method: "subscribe"
    jsonrpc: "2.0"
    params: {
        query: string
    }
}

export type Target = {
    targetID: string
    websocketOptions: NetworkWebSocketOptions,
    message: jsonRpcQuery
}

export type CallbackArgs = {
    target: Target
    data: Buffer
}

export type NodeData = {
    jsonrpc: "2.0",
    "id": 0 | 1,
    result: {
        subscription_id: string,
        query: string
        data: {
            type: string,
            value?: any
        }
    }
    events?: {}
}