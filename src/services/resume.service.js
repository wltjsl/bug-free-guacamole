import ResumeRepository from "../repositories/resume.repository.js";

class ResumesService {
  createResume = async (title, content, userName) => {
    return await ResumeRepository.createResume(title, content, userName);
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
