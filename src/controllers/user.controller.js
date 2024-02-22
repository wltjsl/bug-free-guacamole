import UserService from "../services/user.service.js";

class UserController {
  signUp = async (req, res, next) => {
    try {
      const { email, password, passwordCheck, userName } = req.body;
      const newUser = await UserService.signUp(email, password, passwordCheck, userName);
      return res.status(201).json({ newUser, message: "회원가입이 완료되었습니다." });
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ message: "이메일이 입력되지 않았습니다." });
      }
      if (!password) {
        return res.status(400).json({ message: "비밀번호가 입력되지 않았습니다." });
      }

      const token = await UserService.signIn(email, password);
      res.cookie("authorization", `Bearer ${token}`);
      return res.status(200).json({ message: "로그인 성공", token });
    } catch (error) {
      next(error);
    }
  };

  getUser = async (req, res, next) => {
    try {
      const userId = res.locals.user.userId;
      const user = await UserService.getUser(userId);
      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
