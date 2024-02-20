// routes/resumes.router.js

import express from "express";
import { prisma } from "../prisma/index.js";
import authMiddleware from "../middlewares/need-signin.middleware.js";

const router = express.Router();

/** 이력서 생성 API **/
router.post("/resumes", authMiddleware, async (req, res, next) => {
  try {
    const user = res.locals.user;
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
    }
    if (!content) {
      return res.status(400).json({ errorMessage: "자기소개를 입력해주세요." });
    }

    const resume = await prisma.resumes.create({
      data: {
        userName: user.userName,
        title,
        content
      }
    });

    return res.status(201).json({ data: resume });
  } catch (error) {
    next(error);
  }
});

/** 이력서 목록 조회 API **/
router.get("/resumes", async (req, res, next) => {
  const orderKey = req.query.orderKey ?? "resumeId";
  const orderValue = req.query.orderValue ?? "desc";

  if (!["resumeId", "status"].includes(orderKey)) {
    return res.status(400).json({ errorMessage: "orderKey가 올바르지 않습니다." });
  }
  if (!["asc", "desc"].includes(orderValue.toLocaleLowerCase())) {
    return res.status(400).json({ errorMessage: "orderValue가 올바르지 않습니다." });
  }

  try {
    const resumes = await prisma.resumes.findMany({
      select: {
        resumeId: true,
        userName: true,
        title: true,
        content: true,
        status: true,
        createdAt: true
      },
      orderBy: {
        [orderKey]: orderValue
      }
    });

    if (!resumes) {
      return res.status(404).json({ errorMessage: "이력서 조회에 실패하였습니다." });
    }

    return res.status(200).json({ data: resumes });
  } catch (error) {
    next(error);
  }
});

/** 이력서 상세 조회 API **/
router.get("/resumes/:resumeId", async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const resume = await prisma.resumes.findFirst({
      where: {
        resumeId: +resumeId
      },
      select: {
        resumeId: true,
        userName: true,
        title: true,
        content: true,
        status: true,
        createdAt: true
      }
    });

    if (!resume) {
      return res.status(404).json({ errorMessage: "이력서 조회에 실패하였습니다." });
    }

    return res.status(200).json({ data: resume });
  } catch (error) {
    next(error);
  }
});

/** 이력서 수정 API **/
router.patch("/resumes/:resumeId", authMiddleware, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { title, content, status } = req.body;

    if (!title) {
      return res.status(400).json({ errorMessage: "수정할 제목을 입력해주세요." });
    }
    if (!content) {
      return res.status(400).json({ errorMessage: "수정할 자기소개를 입력해주세요." });
    }
    if (!status) {
      return res.status(400).json({ errorMessage: "변경할 상태를 입력해주세요." });
    }

    const resume = await prisma.resumes.findFirst({
      where: {
        resumeId: +resumeId
      },
      select: {
        title: true,
        content: true,
        status: true
      }
    });

    if (!resume) {
      return res.status(404).json({ errorMessage: "이력서 조회에 실패하였습니다." });
    }

    const updateResume = await prisma.resumes.update({
      where: {
        resumeId: +resumeId
      },
      data: {
        title: title,
        status: status,
        content: content
      }
    });

    return res.status(200).json({ data: updateResume, message: "성공적으로 수정되었습니다." });
  } catch (error) {
    next(error);
  }
});

/** 이력서 삭제 API **/
router.delete("/resumes/:resumeId", authMiddleware, async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await prisma.resumes.findFirst({
      where: {
        resumeId: +resumeId
      },
      select: {
        resumeId: true,
        userName: true,
        title: true,
        content: true,
        status: true,
        createdAt: true
      }
    });

    if (!resume) {
      return res.status(404).json({ errorMessage: "이력서 조회에 실패하였습니다." });
    }

    const deleteResume = await prisma.resumes.delete({
      where: {
        resumeId: +resumeId
      }
    });

    return res.status(200).json({ data: deleteResume, message: "성공적으로 삭제되었습니다." });
  } catch (error) {
    next(error);
  }
});

export default router;
