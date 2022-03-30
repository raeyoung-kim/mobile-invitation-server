import axios from 'axios';
import express, { Request, Response, NextFunction } from 'express';
import qs from 'qs';
import User from '../models/User';

const router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;

    const { data } = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      qs.stringify({
        grant_type: 'refresh_token',
        client_id: process.env.KAKAO_REST_API_KEY,
        refresh_token: token,
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
    res.json({
      id: user.id,
      name: user.properties.nickname,
      image: user.kakao_account.profile.profile_image_url,
      token: data.refresh_token,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
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

      const findUser = await User.findOne({ id: user.id });

      if (findUser) {
        await User.findOneAndUpdate(
          { id: user.id },
          { image: user.properties.profile_image },
          { new: true, upsert: true }
        );
      } else {
        await User.create({
          id: user.id,
          name: user.properties.nickname,
          email: user.kakao_account.email,
          image: user.kakao_account.profile.profile_image_url,
        });
      }

      res.json({
        id: user.id,
        name: user.properties.nickname,
        image: user.kakao_account.profile.profile_image_url,
        token: data.refresh_token,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default router;
