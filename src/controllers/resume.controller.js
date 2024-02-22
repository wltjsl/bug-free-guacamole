import ResumeService from "../services/resume.service.js";

class ResumeController {
  createResume = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const { title, content } = req.body;

      if (!title) {
        return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
      }
      if (!content) {
        return res.status(400).json({ errorMessage: "자기소개를 입력해주세요." });
      }

      const resume = await ResumeService.createResume(user.userId, user.userName, title, content);

      return res.status(201).json({ data: resume });
    } catch (error) {
      next(error);
    }
  };

  getAllResumes = async (req, res, next) => {
    try {
      const orderKey = req.query.orderKey ?? "resumeId";
      const orderValue = req.query.orderValue ?? "DESC";
      const resumes = await ResumeService.getAllResumes(orderKey, orderValue);

      if (!resumes.length) {
        return res.status(404).json({ errorMessage: "조회된 이력서가 없습니다." });
      }

      return res.status(200).json({ data: resumes });
    } catch (error) {
      next(error);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const resume = await ResumeService.getResumeById(resumeId);

      if (!resume) {
        return res.status(404).json({ errorMessage: "이력서 조회에 실패하였습니다." });
      }

      return res.status(200).json({ data: resume });
    } catch (error) {
      next(error);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const { title, content, status } = req.body;

      const resume = await ResumeService.getResumeById(resumeId);

      if (!resume) {
        return res.status(404).json({ errorMessage: "수정할 이력서가 존재하지 않습니다." });
      }

      if (!title) {
        return res.status(400).json({ errorMessage: "수정할 제목을 입력해주세요." });
      }
      if (!content) {
        return res.status(400).json({ errorMessage: "수정할 자기소개를 입력해주세요." });
      }
      if (!status) {
        return res.status(400).json({ errorMessage: "변경할 상태를 입력해주세요." });
      }

      const updatedResume = await ResumeService.updateResume(resumeId, title, content, status);

      return res.status(200).json({ data: updatedResume, message: "성공적으로 수정되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { resumeId } = req.params;
      const deletedResume = await ResumeService.deleteResume(resumeId);

      return res.status(200).json({ message: "성공적으로 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  };
}

export default ResumeController;
