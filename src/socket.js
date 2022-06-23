function WebSocketClient(url, options = {}) {
  var self = this;

  options = toString.call(options) == "[object Object]" ? options : {};

  this.duration =
    options.duration && new RegExp(/^[\d]+$/).test(options.duration)
      ? options.duration
      : 5000;

  this.reconnect =
    options.reconnect && new RegExp(/^true$/).test(options.reconnect)
      ? options.reconnect
      : false;

  this.webSocket = new WebSocket(url);

  this.buffer = this.buffer || [];

  this.webSocket.addEventListener("open", function () {
    console.log("JADE CONNECTION ESTABLISHED");
  });

  this.webSocket.addEventListener("close", function () {
    if (self.reconnect) {
      setTimeout(function () {
        WebSocketClient.call(self, url, options);
      }, self.duration);
    } else console.log("JADE DISCONNECTED");
  });

  this.webSocket.addEventListener("message", function (evt) {
    
    const payload = JSON.parse(evt.data);

    const { to, message } = payload;

    const { type } = message;
    console.log(payload, "payload -----");
     WAPI.sendMessage(`${to}@c.us`, payload.message.text);
    // to.forEach((receiver) => {
    //   if (type === "image" || type === "audio" || type === "document") {
    //     window.log(
    //       "inside wapi-----------------------------" + JSON.stringify(message)
    //     );
    //     window
    //       .getFile(`/media/${message.path}`)
    //       .then((b64) => {
    //         WAPI.sendImage(
    //           b64,
    //           `${receiver}@c.us`,
    //           message.filename ? message.filename : message.path,
    //           message.caption ? message.caption : type.toUpperCase(),
    //           (res) => {
    //             // window.log("WAPI > SEND IMAGE >" , res);
    //             window.log("WAPI > SEND IMAGE > " + res);
    //           }
    //         );
    //       })
    //       .catch((err) => window.log("OUTGOING > GETFILE > ERROR >", err));
    //   } else {
    //     if (type === "video") {
    //       WAPI.sendMessage(`${receiver}@c.us`, payload.message.url);
    //     } else WAPI.sendMessage(`${receiver}@c.us`, payload.message.text);
    //   }
    // });
  });

  this.webSocket.addEventListener("error", function (e) {
    console.log("JADE CONNECTION ERROR >", e);
  });

}

var JADE = new WebSocketClient(
  "ws://localhost:4001/",
  { reconnect: true }
);
