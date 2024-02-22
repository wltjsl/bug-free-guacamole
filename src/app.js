// app.js

import express from "express";
import cookieParser from "cookie-parser";
import LogMiddleware from "./middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";
import UserController from "./controllers/user.controller.js";
import ResumeController from "./controllers/resume.controller.js";
import { swaggerUi, specs } from "../swagger/swagger.js";

const app = express();
const PORT = 3018;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());

const resumeController = new ResumeController();

app.post("/api/resumes", resumeController.createResume.bind(resumeController));
app.get("/api/resumes", resumeController.getAllResumes.bind(resumeController));
app.get("/api/resumes/:resumeId", resumeController.getResumeById.bind(resumeController));
app.patch("/api/resumes/:resumeId", resumeController.updateResume.bind(resumeController));
app.delete("/api/resumes/:resumeId", resumeController.deleteResume.bind(resumeController));

const userController = new UserController();

app.post("/api/users/signup", userController.signUp.bind(userController));
app.post("/api/users/signin", userController.signIn.bind(userController));
app.get("/api/users/me", userController.getUser.bind(userController));

app.use(ErrorHandlingMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
