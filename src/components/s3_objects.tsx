// Update the import path if the module is located elsewhere
import { s3 } from '../requests/aws'; // Adjust the path as needed

// Get a presigned URL (expires in 1 hour by default)
export async function getPresignedUrl(key: string, expires: number = 3600): Promise<string> {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
    Expires: expires
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', params, (err: Error | null, url?: string) => {
      if (err) reject(err);
      else resolve(url as string);
    });
  });
}

// Get multiple presigned URLs
export async function getMultiplePresignedUrls(keys: string[]): Promise<string[]> {
  return Promise.all(keys.map((key: string) => getPresignedUrl(key)));
}