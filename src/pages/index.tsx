import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Button from '../components/Globals/Button';

const func1 = () => {
    alert("Howdy")
}

const func2 = () => {
    alert("Howdy 2")
}

const func3 = () => {
    alert("Howdy 3")
}

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <h1>Logged in</h1>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return (
    <>
      <div>
        <Button type={'primary'} content={'Test Button'} arrowDirection={'right'} onClick={func1}/>
        <Button
          type={'secondary'}
          content={'Test Button 2'}
          arrowDirection={'down'}
          onClick={func2}
        />
        <Button type={'outline'} content={'Test Button 2'} arrowDirection={'right'} onClick={func3}/>
      </div>
      <h1>Not logged in</h1>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
};

export default Home;
