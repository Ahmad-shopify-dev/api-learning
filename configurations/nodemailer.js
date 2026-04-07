import { createRequire } from "module";
import { EMAIL_PASS, MAILER_EMAIL } from "./env.js";
const require = createRequire(import.meta.url)
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAILER_EMAIL,
        pass: EMAIL_PASS
    }
})

export default transporter;

