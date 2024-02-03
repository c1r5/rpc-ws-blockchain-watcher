## A blockchain network lib to watch multiple networks

```bash
$ yarn add
```

---

## Example

```javascript
import { NetworkWatcher, jsonRpcQuery } from "rpc-ws-blockchain-watcher";

const watcher = new NetworkWatcher();

watcher
  .newTarget({
    network_name: "network-node-name",
    message: new jsonRpcQuery({
      id: 0,
      method: "subscribe",
      jsonrpc: "2.0",
      params: {
        query: "$QUERY_EVENT_FILTER",
      },
    }),
    websocketOptions: {
      url: "wss://$hostname/websocket",
    },
  })
  .watch();
```
