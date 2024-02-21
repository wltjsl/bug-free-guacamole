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
  logging: false,
  entities: [`../entities/*.js`],
  migrations: [`../migrations/*.js`],
  cli: {
    entitiesDir: `../entities`,
    migrationsDir: `../migrations`
  }
};

export default config;
