import { NetworkWatcher, jsonRpcQuery } from "../src/mod";

const watcher = new NetworkWatcher();

const rpcmsg_sei = new jsonRpcQuery({
    id: 0,
    method: "subscribe",
    jsonrpc: "2.0",
    params: {
        query: "tm.event='Tx'"
    }
});

const rpcmsg_inj = new jsonRpcQuery({
    id: 0,
    method: "subscribe",
    jsonrpc: "2.0",
    params: {
        query: "tm.event='Tx'"
    }
});

watcher.newTarget({
    network_name: 'sei-network',
    message: rpcmsg_sei,
    websocketOptions: {
        url: "wss://sei-rpc.brocha.in/websocket"
    }
}).newTarget({
    network_name: 'injective-network',
    message: rpcmsg_inj,
    websocketOptions: {
        url: "wss://sentry.tm.injective.network/websocket"
    }

}).watch()