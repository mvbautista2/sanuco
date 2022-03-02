import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "valentina1999bautista@gmail.com",
    pass: "Tengohambre",
  },
});

transporter.verify().then(() => {
  console.log("Listo para enviar mensajes");
});
