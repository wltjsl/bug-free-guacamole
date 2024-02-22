import { dataSource } from "../index.js";
import { Users } from "../entities/user.entity.js";

class UserRepository {
  constructor() {
    this.userRepository = dataSource.getRepository(Users);
  }

  async findByEmail(email) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(userId) {
    return await this.userRepository.findOne(userId);
  }

  async create(email, password, userName) {
    return await this.userRepository.save({
      email,
      password,
      userName
    });
  }
}

export default new UserRepository();
