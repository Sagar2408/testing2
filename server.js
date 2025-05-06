const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const screenSocket = require("./sockets/screenSocket");

const app = express();
const server = http.createServer(app);

// ✅ Allow only Vercel frontend
const corsOptions = {
  origin: "https://castfrontend.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", authRoutes);

// ✅ socket.io CORS also for Vercel
const io = new Server(server, {
  cors: corsOptions
});

io.on("connection", (socket) => screenSocket(socket, io));

// ✅ Correct binding for Render deployment
const PORT = process.env.PORT || 10000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
