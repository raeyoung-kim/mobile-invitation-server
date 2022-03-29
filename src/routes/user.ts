import axios from 'axios';
import express from 'express';
import qs from 'qs';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { code } = req.body;

    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      qs.stringify({
        code: code,
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        client_secret: process.env.KAKAO_CLIENT_SECRET,
      }),
      {
        headers: {
          ['Content-type']: 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    const { data: user } = await axios.get(
      `https://kapi.kakao.com/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          ['Content-type']: 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }
    );

    // 데이터 베이스에서 유저 정보 있는지 확인 후 없으면 저장하기

    res.json({
      id: user.id,
      ninkname: user.properties.nickname,
      image: user.properties.thumbnail_image,
    });
  } catch (err) {
    console.error(err);
  }
});

export default router;
