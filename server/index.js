const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectToDb();
const port = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`server running on port ${port}`.yellow.bold));
