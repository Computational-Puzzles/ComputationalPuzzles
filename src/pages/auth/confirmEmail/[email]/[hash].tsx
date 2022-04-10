import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { decodeConfirmationHash } from '../../../../utils';

const ConfirmEmail = () => {
  const router = useRouter();
  const { email, hash } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof email !== 'string' || typeof hash !== 'string' || !router) {
      return;
    }

    const checkCallbackHash = async () => {
      if (!(await decodeConfirmationHash(email, hash))) {
        router.push('/403');
      } else {
        setIsLoading(false);
      }
    };
    checkCallbackHash();
  }, [email, hash, router]);

  if (typeof email !== 'string' || typeof hash !== 'string') {
    return <p>Redirecting...</p>;
  }

  if (!isLoading) {
    return <h1>Your email has been confirmed!</h1>;
  }

  return <p>Loading...</p>;
};

export default ConfirmEmail;
