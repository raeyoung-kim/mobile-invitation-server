# Mobile Invitation

[모바일 청첩장](https://www.mobileinvitation.site)


![](https://mobile-invitation.s3.ap-northeast-2.amazonaws.com/image/main_lg.png)

## introduction
원하는 샘플 선택 후 신랑, 신부의 간단한 소개 및 정보 입력, 갤러리 사진(웨딩 사진 전시) 등 정보를 바탕으로 셀프로 간편하게 모바일 초대장을 제작 공유하고 방명록에 축하 메시지를 남길 수 있습니다.

## Features
- MongoDB Atlas를 이용한 데이터 저장(샘플 제작, 샘플 삭제, 방명록 작성, 수정, 삭제 등) 기능 제공
- AWS S3를 이용한 이미지 관리 (갤러리)
- 카카오 맵 및 카카오 공유 (주소 등록 및 공유)

## Tech Stack
### client
- React
- Next
- Typescript
- Recoil
- Eslint
- Vercel
### server
- Node
- Express
- Typescript
- MongoDB
- Mongoose
- Eslint
- AWS (이미지 관리)
  - S3 
- AWS (배포)
  - CodePipeline
  - Elastic Beanstalk

## Install
Local 환경에서 실행하기 위해서는 몇 가지 사전 준비가 필요합니다.
- 카카오 개발자 계정
- MongDB Atlas
- AWS S3 버킷 (/image/* 퍼블릭 설정)
- AWS IAM S3 정책 (DeleteObject, PutObject 권한) ACCESS_KEY, SECRET_KEY

### Client
```
git clone https://github.com/raeyoung-kim/mobile-invitation-client.git
```
Root 디렉토리에 `.env.local` 파일을 생성하고 사전에 준비한 Kakao App key와 server url을 입력합니다.
```
NEXT_PUBLIC_KAKAOMAP_APPKEY=<YOUR_KAKAO_APPKEY>
NEXT_PUBLIC_KAKAO_REST_API_KEY=<YOUR_KAKAO_REST_API_KEY>
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=<YOUR_KAKAO_JAVASCRIPT_KEY>
NEXT_PUBLIC_KAKAO_REDIRECT_URI=<YOUR_KAKAO_REDIRECT_URI>
NEXT_PUBLIC_SERVER=http://localhost:8080
```

```
npm install
npm run dev
```

### Server
```
git clone https://github.com/raeyoung-kim/mobile-invitation-server.git
```
Root 디렉토리에 `.env` 파일을 생성하고, 사전에 준비한 MongoDB Connection key 를 입력합니다.

```
MONGODB_CONNECT=<YOUR MongoDB Connection key>
KAKAO_REST_API_KEY=<YOUR_KAKAO_REST_API_KEY>
KAKAO_REDIRECT_URI=<YOUR_KAKAO_REDIRECT_URI>
KAKAO_CLIENT_SECRET=<YOUR_KAKAO_CLIENT_SECRET>
AWS_ACCESS_KEY=<YOUR_AWS_IAM_S3_ACCESS_KEY> (DeleteObject, PutObject 권한)
AWS_SECRET_KEY=<YOUR_AWS_IAM_S3_SECRET_KEY>
AWS_REGION=<AWS_S3_REGION>
``` 

## Consulting Bot Use
`Install` 단계를 진행하거나, 배포된 https://www.mobileinvitation.site 에 접속하여 kakao 계정으로 로그인을 합니다.

## Deploy
### Client
- Vercel을 이용한 client 배포

### Server
- AWS CodePipeline을 이용한 server 배포


## Project Process
- figma를 이용한 디자인 및 frame 작업
- git을 이용한 version 관리
