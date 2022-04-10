import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

export const sendEmail = async (
  receiverEmail: string,
  subject: string,
  content: string
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const sender = process.env.SENDGRID_SENDER;

  try {
    const msg = {
      to: receiverEmail,
      from: sender, // Change to your verified sender
      subject,
      html: content
    };
    await sgMail.send(msg);
  } catch (err) {
    console.error(err);
  }
};

const sendEmailHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).json({ error: 'Not implemented' });
};

export default sendEmailHandler;
