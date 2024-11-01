import AWS from 'aws-sdk';

// Define the type for the file parameter
interface FileUpload {
  name: string;
  data: Buffer; // Assuming file data is a buffer
  mimetype: string;
}

// Check if the environment variables are defined and throw errors if missing
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
});

export const uploadFile = (file: FileUpload) => {
  if (!process.env.S3_BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME is not defined in environment variables");
  }

  const params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.name,
    Body: file.data,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  // Return the promise from S3 upload
  return s3.upload(params).promise();
};

