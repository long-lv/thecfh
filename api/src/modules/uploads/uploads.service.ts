import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UploadsService {
	private readonly s3 = new S3({
		endpoint: process.env.CLOUDFLARE_ENDPOINT,
		accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
		region: process.env.CLOUDFLARE_REGION,
		signatureVersion: 'v4',
	});

	async uploadFile(file: Express.Multer.File) {
		try {
			const key = `${uuid()}-${file.originalname}`;

			const params = {
				Bucket: process.env.CLOUDFLARE_BUCKET || '',
				Key: key,
				Body: file.buffer,
				ContentType: file.mimetype,
				ACL: 'public-read',
			};
			const result = await this.s3.upload(params).promise();
			const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_URL}/${key}`;
			return {
				url: publicUrl,
				key: result.Key,
			};
		} catch (error) {
			console.log(error, 'upload error');
			throw new InternalServerErrorException(error);
		}
	}

	async multiUploadFiles(files: Express.Multer.File[]) {
		const uploaded = await Promise.all(files.map((f) => this.uploadFile(f)));

		return uploaded.map((up: { url: string; key: string }) => up.url);
	}
}
