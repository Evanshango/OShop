import {createTransport} from 'nodemailer'
import {ZOHO_PASS, ZOHO_USER} from './constants'
import {BadRequestError} from "../errors/bad-request-error";

export class EmailHandler {
    static async sendEmail(email: string, subject: string, html: string) {
        const transporter = createTransport({
            host: 'smtppro.zoho.com',
            port: 587,
            secure: false,
            auth: {
                user: ZOHO_USER!,
                pass: ZOHO_PASS!
            }
        })

        const mailOptions = {
            from: `Savana Treasures <noreply@savanatreasures.com>`,
            to: email, subject, html
        }
        try {
            await transporter.sendMail(mailOptions)
        } catch (err) {
            throw new BadRequestError('An error occurred while attempting to send an email. Please try again after sometime')
        }
    }
}
