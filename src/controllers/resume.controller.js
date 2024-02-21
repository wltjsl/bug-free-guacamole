import resumeService from "../services/resume.service.js";

class ResumeController {
  constructor() {
    this.resumeService = resumeService;
  }

  async createResume(req, res, next) {
    try {
      const user = res.locals.user;
      const { title, content } = req.body;

      if (!title) {
        return res.status(400).json({ errorMessage: "제목을 입력해주세요." });
      }
      if (!content) {
        return res.status(400).json({ errorMessage: "자기소개를 입력해주세요." });
      }

      const resume = await this.resumeService.createResume(user.userName, title, content);

      return res.status(201).json({ data: resume });
    } catch (error) {
      next(error);
    }
  }

  async getAllResumes(req, res, next) {
    try {
      const orderKey = req.query.orderKey ?? "resumeId";
      const orderValue = req.query.orderValue ?? "DESC";
      const resumes = await this.resumeService.getAllResumes(orderKey, orderValue);

      return res.status(200).json({ data: resumes });
    } catch (error) {
      next(error);
    }
  }

  async getResumeById(req, res, next) {
    try {
      const { resumeId } = req.params;
      const resume = await this.resumeService.getResumeById(resumeId);

      if (!resume) {
        return res.status(404).json({ errorMessage: "이력서 조회에 실패하였습니다." });
      }

      return res.status(200).json({ data: resume });
    } catch (error) {
      next(error);
    }
  }

  async updateResume(req, res, next) {
    try {
      const { resumeId } = req.params;
      const { title, content, status } = req.body;

      const updatedResume = await this.resumeService.updateResume(resumeId, title, content, status);

      return res.status(200).json({ data: updatedResume, message: "성공적으로 수정되었습니다." });
    } catch (error) {
      next(error);
    }
  }

  async deleteResume(req, res, next) {
    try {
      const { resumeId } = req.params;
      const deletedResume = await this.resumeService.deleteResume(resumeId);

      return res.status(200).json({ data: deletedResume, message: "성공적으로 삭제되었습니다." });
    } catch (error) {
      next(error);
    }
  }
}

export default ResumeController;
