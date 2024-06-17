import { Pool } from "pg";

export default new Pool({
  host: process.env.POSTGRES_HOST || "postgres",
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASS || "postgres",
  database: "iceboxdb",
  max: 10, //최대 커넥션 수
});
