import ResumeRepository from "../repositories/resume.repository.js";

class ResumesService {
  async createResume(title, content, userName) {
    return await ResumeRepository.createResume(title, content, userName);
  }

  async getAllResumes() {
    return await ResumeRepository.getAllResumes();
  }

  async getResumeById(resumeId) {
    return await ResumeRepository.getResumeById(resumeId);
  }

  async updateResume(resumeId, title, content, status) {
    return await ResumeRepository.updateResume(resumeId, title, content, status);
  }

  async deleteResume(resumeId) {
    return await ResumeRepository.deleteResume(resumeId);
  }
}

export default new ResumesService();
