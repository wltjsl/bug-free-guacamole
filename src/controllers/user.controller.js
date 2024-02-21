import UserService from "../services/user.service.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async signUp(req, res, next) {
    try {
      const { email, password, passwordCheck, userName } = req.body;
      const newUser = await this.userService.signUp(email, password, passwordCheck, userName);
      return res.status(201).json({ newUser, message: "회원가입이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.signIn(email, password);
      res.cookie("authorization", `Bearer ${token}`);
      return res.status(200).json({ message: "로그인 성공", token });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const userId = res.locals.user.userId;
      const user = await this.userService.getUser(userId);
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
