import aws from 'aws-sdk';

const { AWS_SECRET_KEY, AWS_ACCESS_KEY, AWS_REGION } = process.env;

export const s3 = new aws.S3({
  secretAccessKey: AWS_SECRET_KEY,
  accessKeyId: AWS_ACCESS_KEY,
  region: AWS_REGION,
});

export const getSignedUrl = ({ key }: { key: string }) => {
  return new Promise((resolve, reject) => {
    s3.createPresignedPost(
      {
        Bucket: 'mobile-invitation',
        Fields: {
          key,
        },
        Conditions: [
          ['content-length-range', 0, 50 * 1000 * 1000],
          ['starts-with', '$Content-Type', 'image/'],
        ],
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data);
      }
    );
  });
};
