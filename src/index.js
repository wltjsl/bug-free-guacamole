import typeorm from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const config = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: process.env.USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: ["./entities/resume.entity.js", "./entities/user.entity.js"]
};

const dataSource = new typeorm.DataSource(config);

async function initializeApp() {
  try {
    await dataSource.initialize();
    console.log("데이터베이스 연결 성공!");
  } catch (error) {
    console.error("데이터베이스 연결 에러", error);
  }
}
initializeApp();

export { dataSource };
