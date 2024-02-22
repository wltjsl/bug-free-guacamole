import { dataSource } from "../index.js";
import { Resumes } from "../entities/resume.entity.js";

class ResumeRepository {
  resumeRepository = dataSource.getRepository(Resumes);

  createResume = async (userId, userName, title, content) => {
    return await this.resumeRepository.insert({ userId, userName, title, content });
  };

  getAllResumes = async () => {
    return await this.resumeRepository.find();
  };

  getResumeById = async (resumeId) => {
    return await this.resumeRepository.findOne({ where: { resumeId: resumeId } });
  };

  updateResume = async (resumeId, title, content, status) => {
    const resume = await this.resumeRepository.findOne({ where: { resumeId: resumeId } });
    if (!resume) {
      throw new Error("이력서 조회에 실패하였습니다.");
    }
    resume.title = title;
    resume.content = content;
    resume.status = status;
    await this.resumeRepository.save(resume);
    return resume;
  };

  deleteResume = async (resumeId) => {
    return await this.resumeRepository.delete(resumeId);
  };
}

export default new ResumeRepository();
