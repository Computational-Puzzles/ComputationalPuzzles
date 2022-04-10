import { Button } from "../../Global";

const EmailConfirmTemplate = ({ userEmail, hash }: { userEmail: string, hash: string }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const redirectURL = `${BASE_URL}/auth/confirmEmail/${userEmail}/${hash}`;

  return <>
    <h1>Confirm your email</h1>
    <a href={redirectURL}>
      <Button content='Confirm' style="primary" type="button" size="lg" onClick={() => { /* Don't do anything */ }} />
    </a>
  </>;
};

export default EmailConfirmTemplate;
