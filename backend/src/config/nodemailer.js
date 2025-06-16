import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});

const sendMailToRegister = (userMail, token) => {
    let mailOptions = {
        from: 'admin@vet.com',
        to: userMail,
        subject: "SmartVET -🐶 😺",
        html: `<p>Hola, haz clic <a href="${process.env.URL_FRONTEND}confirm/${token}">aquí</a> para confirmar tu cuenta.</p>
        <hr>
        <footer>El equipo de SmartVET te da la más cordial bienvenida.</footer>`
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("Error al enviar el correo: ", error);
        } else {
            console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
        }
    })
}

const sendMailToRecoveryPassword = async(userMail, token) => {
    let info = await transporter.sendMail({
        from: 'admin@vet.com',
        to: userMail,
        subject: "Correo para reestablecer tu contraseña",
        html: `
        <h1>SmartVET - 🐶 😺</h1>
        <hr>
        <a href="${process.env.URL_FRONTEND}reset/${token}">Clic para reestablecer tu contraseña</a>
        <hr>
        <footer>El equipo de SmartVET te da la más cordial bienvenida.</footer>`
    });

    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}

export { sendMailToRegister, sendMailToRecoveryPassword }
