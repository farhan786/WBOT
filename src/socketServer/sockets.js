module.exports = function socketServer(server) {
  // const server = require("http").createServer(app);
  var socket = require("socket.io");

  var io = socket(
    server
    //   , {
    //   handlePreflightRequest: (req, res) => {
    //     const headers = {
    //       "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //       "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
    //       "Access-Control-Allow-Credentials": true,
    //     };
    //     res.writeHead(200, headers);
    //     res.end();
    //   },
    // }
  );

  io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    socket.on("disconnect", function () {
      console.log("user disconnected");
    });
  });
};
