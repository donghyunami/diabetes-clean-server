import express from "express";
import User from "../models/user.js";

const router = express.Router();

// @routes     POST api/v1/auth/login
// @desc       유저 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("유저가 존재하지 않습니다.");
    }

    // password 체크
    user.checkPassword(password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).json("비밀번호가 일치하지 않습니다.");
      } else {
        // 토큰 생성하기
        const token = user.generateToken();

        res
          .cookie("access_token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일, (1000 * 60 * 60 * 24) = 1일
            httpOnly: true,
          })
          .status(200)
          .json("로그인 완료");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// @routes     POST api/v1/auth/checkemail
// @desc       이메일 중복 확인
router.post('/checkemail', async (req, res) => {
  const { email } = req.body;
  // 가입된 유저인지 확인
  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(409).json({ msg: '이미 존재하는 이메일입니다.' });
  } else {
    return res.status(200).json({ msg: '사용 가능한 이메일입니다.' });
  }
});

// @routes     GET api/v1/auth/logout
// @desc       유저 로그아웃
router.get('/logout', async (req, res) => {
  res.clearCookie('access_token').json({ msg: '로그아웃 성공' });
});

export default router;
