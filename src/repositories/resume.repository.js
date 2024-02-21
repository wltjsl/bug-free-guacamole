import { Resumes } from "../entities/resume.entity.js";

class ResumeRepository {
  async createResume(title, content, userName) {
    return await Resumes.create({ title, content, userName });
  }

  async getAllResumes() {
    return await Resumes.findAll();
  }

  async getResumeById(resumeId) {
    return await resumeId.findByPk(resumeId);
  }

  async updateResume(resumeId, title, content, status) {
    const resume = await resume.findByPk(resumeId);
    if (!resume) {
      throw new Error("이력서 조회에 실패하였습니다.");
    }
    resume.title = title;
    resume.content = content;
    resume.status = status;
    await resume.save();
    return resume;
  }

  async deleteResume(resumeId) {
    return await resumeId.destroy({ where: { resumeId } });
  }
}

export default new ResumeRepository();
