import { dataSource } from "../index.js";
import { Resumes } from "../entities/resume.entity.js";
class ResumeRepository {
  constructor() {
    this.resumeRepository = dataSource.getRepository(Resumes);
  }

  async createResume(title, content, userName) {
    return await this.resumeRepository.create({ title, content, userName });
  }

  async getAllResumes() {
    return await this.resumeRepository.find();
  }

  async getResumeById(resumeId) {
    return await this.resumeRepository.findOne(resumeId);
  }

  async updateResume(resumeId, title, content, status) {
    const resume = await this.resumeRepository.findOne(resumeId);
    if (!resume) {
      throw new Error("이력서 조회에 실패하였습니다.");
    }
    resume.title = title;
    resume.content = content;
    resume.status = status;
    await this.resumeRepository.save(resume);
    return resume;
  }

  async deleteResume(resumeId) {
    return await this.resumeRepository.delete(resumeId);
  }
}

export default new ResumeRepository();
