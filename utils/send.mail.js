import { MAILER_EMAIL } from "../configurations/env.js";
import transporter from "../configurations/nodemailer.js";
import { getReminderTemplate } from "./template.mail.js"


export const sendReminderEmail = async (to, label, subscription) => {

    if (!subscription) throw new Error("Subscription data not found");

    const { title, subject, html } = getReminderTemplate(label, subscription);

    const mailOptions = {
        from: MAILER_EMAIL,
        to: to,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error, 'Error sending email');
        console.log("Email sent: " + info.response);
    })

}

