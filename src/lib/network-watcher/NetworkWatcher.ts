import { Target, jsonRpcQueryOptions, CallbackArgs } from "./types";
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

    constructor(target: Target) {
        this.targets?.push(target)
    }

    newTarget(target: Target): NetworkWatcher {
        this.targets?.push(target)

        return this
    };

    private connect(target: Target, cb: (args: CallbackArgs) => void) {
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
                    log.info('[!]', `Websocket connection successfully to ${target.targetID} - ${url}`)
                    log.info('[!]', `Sending message ${target.message.as_string()}`)
                    socket.send(target.message.as_string() ?? "default_message" + '\n');
                })

                socket.on('error', () => {
                    log.error('[-]', `Websocket connection failed for ${target.targetID} - ${url}`)
                })

                socket.on('message', (data: Buffer) => {
                    cb({
                        target,
                        data
                    })
                })
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    capture(cb: (args: CallbackArgs) => any) {
        if (this.targets) {
            for (let target of this.targets) {
                this.connect(target, cb)
            }
        }
    }

}