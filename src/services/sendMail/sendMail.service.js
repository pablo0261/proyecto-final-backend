const nodemailer = require('nodemailer');
const { MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASS ,MAIL_NAME} = process.env;
// Configuracion de servidor SMTP
const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_SECURE,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
});

const sendMailService = async ( to, subject, text) => {
    const mailOptions = {
        from: `"${MAIL_NAME}" <${MAIL_USER}`, // Remitente
        to: to,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: 'Correo electrónico enviado correctamente' };
    } catch (error) {
        throw error
    }
}

module.exports = { sendMailService };