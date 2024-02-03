import { Target, jsonRpcQueryOptions } from "./types";
import WebSocket from "ws";
import log from "npmlog";

export class jsonRpcQuery {
    private query: jsonRpcQueryOptions;

    constructor(rpc_message: jsonRpcQueryOptions) {
        this.query = rpc_message
    }

    as_string() {
        return JSON.stringify(this.query)
    }

    as_json() {
        return this.query
    }

};

export class NetworkWatcher {
    private targets: Target[] = [];
    private ws?: WebSocket;

    constructor() { }

    newTarget(target: Target): this {
        this.targets?.push(target)

        return this
    };

    private connect(target: Target) {
        try {
            let url: string = "";

            if (target.websocketOptions.url) {
                url = target.websocketOptions.url;
            } else {
                let credentials: string = "";
                if (target.websocketOptions.auth) {
                    credentials = `${target.websocketOptions.auth.username}:${target.websocketOptions.auth.password}@`
                };

                url = `wss://${credentials}${target.websocketOptions.host}:${target.websocketOptions.port}`
            }

            this.ws = new WebSocket(url);

            if (this.ws) {
                const socket = this.ws;


                socket.on('open', () => {
                    log.info('[!]', `Websocket connection successfully to ${target.network_name} - ${url}`)
                    log.info('[!]', `Sending message ${target.message.as_string()}`)
                    socket.send(target.message.as_string() ?? "default_message" + '\n');
                })

                socket.on('error', () => {
                    log.error('[-]', `Websocket connection failed for ${target.network_name} - ${url}`)
                })
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    watch() {
        if (this.targets) {
            for (let target of this.targets) {
                this.connect(target)
            }
        }
    }

    onMessage(cb: (ws: WebSocket, data: any) => void) {
        if (this.ws) {
            const socket = this.ws;

            socket.on('message', (ws: WebSocket, data: any) => {
                cb.apply(ws, data)
            })
        }
    }
}