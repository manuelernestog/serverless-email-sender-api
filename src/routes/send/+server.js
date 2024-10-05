import { json } from "@sveltejs/kit";
import nodemailer from "nodemailer";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const env = {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  };

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }
  
  const token = authHeader.slice("Bearer ".length).trim();
  console.log(process.env);
  if (token !== env.AUTH_TOKEN) {
    return new Response("Forbidden", { status: 403 });
  }

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return new Response("Bad Request: Invalid JSON", { status: 400 });
  }

  const { from, to, subject, html } = data;
  if (!from || !to || !subject || !html) {
    return new Response("Bad Request: Missing required fields", { status: 400 });
  }

  try {
    await sendEmail(env, from, to, subject, html);
    return json({ message: "Email sent successfully" });
  } catch (e) {
    return new Response(`Internal Server Error: ${e.message}`, { status: 500 });
  }
}

async function sendEmail(env, from, to, subject, html) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.SMTP_USERNAME,
      pass: env.SMTP_PASSWORD,
    },
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
}
