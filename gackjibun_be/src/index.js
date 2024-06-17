import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/routes";
import dbConfig from "./configs/db.config";
import { v4 as uuidv4 } from "uuid";

const port = 8080;

const app = express();

const trackedRequests = new Map();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(routes);

// 미들웨어: 요청 중복 체크
app.use((req, res, next) => {
  const requestId = req.headers["x-request-id"] || uuidv4(); // 요청 ID를 헤더에서 가져오거나 새로 생성

  if (trackedRequests.has(requestId)) {
    // 이미 처리된 요청이면 중복 요청으로 처리
    return res.status(400).json({ error: "Duplicate request detected" });
  }

  // 요청을 추적 맵에 추가
  trackedRequests.set(requestId, true);

  // 다음 미들웨어로 전달
  next();
});

dbConfig.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database 💽");

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port} 🚀`);
  });
});
