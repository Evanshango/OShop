import {randomBytes} from 'crypto'
import {AWSError, Credentials, Endpoint, S3} from 'aws-sdk'
import {AWS_ACCESS_KEY, AWS_SECRET_KEY, BUCKET_NAME, S3_ENDPOINT} from './constants'
import sharp from "sharp";
import {DeleteObjectOutput, DeleteObjectRequest, PutObjectRequest} from "aws-sdk/clients/s3";

const endpoint = new Endpoint(S3_ENDPOINT!)

const s3 = new S3({
    endpoint,
    credentials: new Credentials(AWS_ACCESS_KEY!, AWS_SECRET_KEY!)
})

const folderName = (name: string) => truncate(name.replace(' ', '').toLowerCase(), 10)

const truncate = (name: string, n: number) => name?.length > n ? name.substr(0, n - 1) : name

export class FileHandler {
    static async upload(files: any, name: string) {
        let folder = folderName(name)
        console.log(folder)

        let urls: string[] = []
        const results = await Promise.all(files.map(async (file: any) => {
            const single = file.originalname.split('.')
            const params: PutObjectRequest = {
                Bucket: BUCKET_NAME!,
                Key: `oshop/${folder}/${randomBytes(15).toString('hex')}.${single[single.length - 1]}`,
                ContentType: file.mimetype,
                Body: await sharp(file.buffer).resize(300, 300).toBuffer(),
                ACL: 'public-read'
            }
            return s3.upload(params).promise()
        }))
        results.map((result: any) => urls.push(result.Location))
        return urls
    }

    static async delete(urls: string[], name: string) {
        let folder = folderName(name)

        let results: any = await Promise.all(urls.map((url: string) => {
            const urlParts = url.split('/')
            const params: DeleteObjectRequest = {
                Bucket: BUCKET_NAME!,
                Key: `oshop/${folder}/${urlParts[urlParts.length - 1]}`
            }
            return s3.deleteObject(params, ((err: AWSError, data: DeleteObjectOutput) => {
                results = {err, data}
            })).promise()
        }))
        return results
    }
}