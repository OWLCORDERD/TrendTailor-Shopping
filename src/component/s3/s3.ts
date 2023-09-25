import S3 from "aws-sdk/clients/s3";
import axios from "axios";

const s3 = new S3({
  region: "ap-northeast-2",
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const bucketName = "wishuploadbucket";

export default async function aws(file: File) {
  try {
    const fileParams = {
      Bucket: bucketName,
      Key: file.name,
      Expires: 600,
      ContentType: file.type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    await axios.put(url, file, {
      headers: {
        "Content-Type": String(file.type),
      },
    });

    const s3ImgRoute = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${file.name}`;

    return String(s3ImgRoute);
  } catch (err) {
    return err;
  }
}
