import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'
import Button from "../components/Globals/Button";

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <h1>Logged in</h1>
        <button onClick={ () => signOut() }>Logout</button>
      </>
    )
  }
  return (
    <>
        <Button type={'primary'} content={'Test Button'}/>
        <Button type={'secondary'} content={'Test Button 2'} arrowDirection={'right'}/>
        <Button type={'outline'} content={'Test Button 2'}/>
      <h1>Not logged in</h1>
      <button onClick={ () => signIn() }>Login</button>
    </>
  )
}

export default Home;
