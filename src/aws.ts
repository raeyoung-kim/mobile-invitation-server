import aws from 'aws-sdk';

const { AWS_SECRET_KEY, AWS_ACCESS_KEY } = process.env;

export const s3 = new aws.S3({
  secretAccessKey: AWS_SECRET_KEY,
  accessKeyId: AWS_ACCESS_KEY,
});
