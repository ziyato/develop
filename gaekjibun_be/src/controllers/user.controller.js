import userService from "../services/user.service";

const userLogin = async (req, res, next) => {
  /**
   * @userData {Object}
   * @property {string} username - 사용자 닉네임
   * @property {string} password - 비밀번호
   */
  let { email, password } = req.body;
  let userData = await userService.signin(email, password);
  if (userData === "404") {
    res.status(404).send("User not found");
    return;
  } else {
    res.send(userData);
    return;
  }
};

const userSignup = async (req, res, next) => {
  /**
   * @userData {Object} - 사용자 데이터
   * @property {string} email - 사용자 아이디
   * @property {string} username - 사용자 닉네임
   * @property {string} password - 비밀번호
   */
  let { email, password, username } = req.body;
  // next(await loginService.signup(email, password, username));
  let result = await userService.signup(email, password, username);
  if (result === "404") {
    res.status(404).send("데이터를 전부 입력해주세요");
    return;
  } else {
    res.send(result);
    return;
  }
};

const userProfile = async (req, res, next) => {
  /**
   * @userData {Object}
   * @property {string} user_id - 사용자 식별자
   */
  const user_id = req.params.userId;
  let userData = await userService.profile(user_id);

  if (userData === "404") {
    res.status(404).send("User not found");
    return;
  } else {
    res.send(userData);
    return;
  }
};

const putUserProfile = async (req, res, next) => {
  /**
   * @userData {Object}
   * @property {string} user_id - 사용자 식별자
   * @property {string} password - 비밀번호
   * @property {number} alert_date - 비밀번호
   */
  const user_id = req.params.userId;
  const { password, alert_date } = req.body;

  let userData = await userService.putUserProfile(
    user_id,
    password == "" ? null : password,
    alert_date
  );

  if (userData === "404") {
    res.status(404).send("User not found");
    return;
  } else {
    res.send(userData);
    return;
  }
};

export default {
  userLogin,
  userSignup,
  userProfile,
  putUserProfile,
};
