const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const screenSocket = require("./sockets/screenSocket");

const app = express();
const server = http.createServer(app);

// 👇 Allow only your frontend domain (Vercel)
const corsOptions = {
  origin: "https://castfrontend.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", authRoutes);

// 👇 Apply same CORS config to Socket.IO
const io = new Server(server, {
  cors: corsOptions
});

io.on("connection", (socket) => screenSocket(socket, io));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
