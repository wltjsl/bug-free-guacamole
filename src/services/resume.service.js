import ResumeRepository from "../repositories/resume.repository.js";

class ResumesService {
  createResume = async (userId, userName, title, content) => {
    return await ResumeRepository.createResume(userId, userName, title, content);
  };

  getAllResumes = async () => {
    return await ResumeRepository.getAllResumes();
  };

  getResumeById = async (resumeId) => {
    return await ResumeRepository.getResumeById(resumeId);
  };

  updateResume = async (resumeId, title, content, status) => {
    return await ResumeRepository.updateResume(resumeId, title, content, status);
  };

  deleteResume = async (resumeId) => {
    return await ResumeRepository.deleteResume(resumeId);
  };
}

export default new ResumesService();
