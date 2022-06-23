
module.exports = async function server() {
  const bodyParser = require("body-parser");
  const express = require("express");

  const app = express();

  app.use(
    bodyParser.urlencoded({
      limit: "500mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  app.use(
    bodyParser.json({
      limit: "500mb",
    })
  );

  const server = app.listen(4000, function () {
    console.log("Listening to port 4000");
  });

  app.use(express.static("public"));

  const WebSocket = require("ws");

  const jadeSocket = new WebSocket.Server({
    port: 4001,
  });

  jadeSocket.on("connection", function connection(ws, req) {
    const { url } = req;
    console.log("user connected");

    global["socket"] = ws;

    app.post("/send/message", function (req, res) {
      const { body } = req;
      ws.send(JSON.stringify({ ...body }));
      res.send({
        sucess: true,
      });
    });

    ws.on("message", function incoming(payload) {
      console.log("INCOMING > PAYLOAD >", payload);
    });

    ws.on("close", function close(botid) {
      console.log("WS > ON_CLOSE >", botid);
    });
  });

}

 