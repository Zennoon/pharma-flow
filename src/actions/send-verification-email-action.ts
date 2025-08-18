"use server";

import { render } from "@react-email/components";
import VerificationEmail from "@/components/emails/verification-email";
import transporter from "@/lib/nodemailer";

export async function sendVerificationEmailAction({
  to,
  meta,
}: {
  to: string;
  meta: {
    username: string;
    link: string;
  };
}) {
    const verificationEmail = await render(VerificationEmail({ username: meta.username, url: meta.link }));
    const emailOptions = {
        from: process.env.NODEMAILER_USER,
        to,
        subject: "Verify your email address",
        html: verificationEmail
    };

    try {
        await transporter.sendMail(emailOptions);
        return { success: true };
    } catch (err) {
      console.log(err);
        console.error("sendVerificationEmailAction", err);
        return { success: false }
    }
}
