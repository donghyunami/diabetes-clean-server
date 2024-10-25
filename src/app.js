import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config/key.js";
import dbconnect from "./dbconfig.js";
import {
  usersRouter,
  authRouter,
  commentRouter,
  contentsRouter,
  diabetesRouter,
  likeRouter,
  searchRouter,
  imageRouter
} from "./routes/index.js";
import {
  BASIC_API_URL,
  COMMENT,
  LIKE,
  SEARCH,
  USERS,
  AUTH,
  DIABETES,
  CONTENTS,
  BASIC_CLIENT_URL
} from "./constants/path.js";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const app = express();
const { PORT, COOKIE_SECRET, CLIENT_URL } = config;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dbconnect();
app.use(morgan("dev"));
app.use(
  cors({
    origin: CLIENT_URL || `${BASIC_CLIENT_URL}`,
    credentials: true
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));

app.use("/img/uimg", express.static(path.join(__dirname, "uploads/userImg")));
app.use("/img/pimg", express.static(path.join(__dirname, "uploads/postImg")));

app.use(`${BASIC_API_URL}/${USERS}`, usersRouter);
app.use(`${BASIC_API_URL}/${AUTH}`, authRouter);
app.use(`${BASIC_API_URL}/${DIABETES}`, diabetesRouter);
app.use(`${BASIC_API_URL}/${CONTENTS}`, contentsRouter);
app.use(`${BASIC_API_URL}/${COMMENT}`, commentRouter);
app.use(`${BASIC_API_URL}/${LIKE}`, likeRouter);
app.use(`${BASIC_API_URL}/${SEARCH}`, searchRouter);
app.use(`${BASIC_API_URL}/image`, imageRouter);

app.listen(PORT, () =>
  console.log(`Server Listening on http://localhost:${PORT}`)
);
