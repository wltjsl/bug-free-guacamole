import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/user.repository.js";

class UserService {
  signUp = async (email, password, passwordCheck, userName) => {
    // 필수 입력값 확인
    if (!email || !password || !passwordCheck || !userName) {
      throw new Error("모든 필드를 입력해주세요.");
    }

    // 비밀번호 확인
    if (password !== passwordCheck) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // 이미 가입된 이메일인지 확인
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = await UserRepository.create(email, hashedPassword, userName);

    return newUser;
  };

  signIn = async (email, password) => {
    // 이메일로 사용자 찾기
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("존재하지 않는 이메일입니다.");
    }

    // 비밀번호 검증
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    // 토큰 생성
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: "12h" });

    return token;
  };

  getUser = async (userId) => {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    return user;
  };
}

export default new UserService();
