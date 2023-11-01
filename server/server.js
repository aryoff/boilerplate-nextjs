const http = require("http");
const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});
const { sessionStore } = require("./sessionStore");
const { Server } = require("socket.io");
const { decode } = require("next-auth/jwt");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

async function decodeToken(token) {
  const decoded = await decode({
    token: token,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return decoded;
}

io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    // find existing session
    console.log(sessionID)
    // const session = sessionStore.findSession(sessionID);
    // if (session) {
    //   socket.sessionID = sessionID;
    //   socket.userID = session.userID;
    //   socket.username = session.username;
    //   return next();
    // }
  }
  const jwtToken = socket.handshake.auth.jwtToken;
  decodeToken(socket.handshake.auth.jwtToken).then((token) => {
    if (!jwtToken || token === null || Date.now() >= token.exp * 1000) {
      return next(new Error("invalid token"));
    }
    // create new session
    socket.sessionID = token.websocketKey;
    socket.userID = token.id;
    socket.username = token.email;
    next();
  });
});

io.on("connection", (socket) => {
  console.log("A user connected");
  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.userID,
    username: socket.username,
  });

  socket.emit("session", {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  // Handle chat messages
  socket.on("chat message", (message) => {
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", async () => {
    const matchingSockets = await io.in(socket.userID).fetchSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      // notify other users
      socket.broadcast.emit("user disconnected", socket.userID);
      // update the connection status of the session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });
});

server.listen(3001, () => {
  console.log("WebSocket server listening on port 3001");
});
