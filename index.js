import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/send-email", (req, res) => {
  try {
    const { to } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject: "Test Email",
      text: "This is a test email sent using nodemailer",
      html: `<h1>Hello</h1>
      <p>This is a test email sent using nodemailer</p>
      <img src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' alt='Google Logo' />
      <a href='https://www.google.com'>Visit Google</a>`,
      attachments: [{filename: "keyboard-shortcuts-windows.pdf", path: "./keyboard-shortcuts-windows.pdf" }],
    };

    const info = transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully", info });
  } catch (err) {
    console.log(err);
    res.json({ message: "Failed to send email", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
