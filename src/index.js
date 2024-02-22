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
  synchronize: true,
  logging: false,
  entities: ["./entities/resume.entity.js", "./entities/user.entity.js"],
  cli: {
    entitiesDir: `./entities`
  }
};

export const dataSource = new typeorm.DataSource(config);
