// https://joshuatz.com/posts/2021/strongly-typed-service-workers/
/// <reference lib="webworker" />

declare const self: SharedWorkerGlobalScope;

console.log('loaded', process.env.WS);
// Open a connection. This is a common
// connection. This will be opened only once.
// const ws = new WebSocket("ws://localhost:3001");

import {PlaintextMsg, HumaneMsg, MsgType} from './humane-types';

// Create a broadcast channel to notify about state changes
// const broadcastChannel = new BroadcastChannel('humane-chat');

// Mapping to keep track of ports. You can think of ports as
// mediums through we can communicate to and from tabs.
// This is a map from a uuid assigned to each context(tab)
// to its Port. This is needed because Port API does not have
// any identifier we can use to identify messages coming from it.
const idToPortMap: Map<string, MessagePort> = new Map();

// Let all connected contexts(tabs) know about state cahnges
// ws.onopen = () =>
//   broadcastChannel.postMessage({type: 'WSState', state: ws.readyState});
// ws.onclose = () =>
//   broadcastChannel.postMessage({type: 'WSState', state: ws.readyState});

// When we receive data from the server.
// ws.onmessage = ({data}) => {
//   console.log(data);
//   // Construct object to be passed to handlers
//   const parsedData = {data: JSON.parse(data), type: 'message'};
//   if (!parsedData.data.from) {
//     // Broadcast to all contexts(tabs). This is because
//     // no particular id was set on the from field here.
//     // We're using this field to identify which tab sent
//     // the message
//     broadcastChannel.postMessage(parsedData);
//   } else {
//     // Get the port to post to using the uuid, ie send to
//     // expected tab only.
//     idToPortMap[parsedData.data.from].postMessage(parsedData);
//   }
// };

// Event handler called when a tab tries to connect to this worker.
self.onconnect = (e: MessageEvent) => {
  console.log('onconnect');
  const port = e.ports[0];
  port.onmessage = (e: MessageEvent<HumaneMsg>) => {
    const payload = e.data;
    if (!payload) throw new Error('no payload');
    console.debug('onmessage', JSON.stringify(payload));
    switch (payload.type) {
      case MsgType.PLAINTEXT:
        handleIncomingMessage(payload);
        break;
      case MsgType.CONNECTED:
        handleConnected(payload.userId, port);
        break;
      case MsgType.DISCONNECTED:
        handleDisconnected(payload.userId);
        break;
    }
  };
};

function handleIncomingMessage(payload: PlaintextMsg) {
  idToPortMap.forEach((port, userId) => {
    if (userId != payload.userId) {
      try {
        port.postMessage(payload);
      } catch (e) {
        console.error(e);
        handleDisconnected(userId);
      }
    }
  });
}

function handleConnected(userId: string, port: MessagePort) {
  idToPortMap.set(userId, port);
  port.postMessage({
    type: MsgType.CONNECTED,
    userId,
  });
}

function handleDisconnected(userId: string) {
  idToPortMap.delete(userId);
}
