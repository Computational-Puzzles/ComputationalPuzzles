import sgMail from '@sendgrid/mail';
import toast from 'react-hot-toast';

export const sendEmail = async (
  receiverEmail: string,
  subject: string,
  content: string,
  mailSendSuccessToast?: string
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const sender = process.env.SENDGRID_SENDER;
  const msg = {
    to: receiverEmail,
    from: sender, // Change to your verified sender
    subject,
    html: content
  };

  try {
    await sgMail.send(msg);
    toast.success(mailSendSuccessToast || 'Email sent successfully');
  } catch (err) {
    toast.error(err.message);
  }
};

// TODO: Find a way to test this function
