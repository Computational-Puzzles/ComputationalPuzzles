import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'

const Home = () => {
  const [session, loading] = useSession()
  
  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!session) {
    return (
      <>
        <h1>Not logged in</h1>
        <button onClick={() => signIn()}>Login</button>
      </>
    )
  } else {
    return (
      <>
        <h1>Logged in</h1>
        <button onClick={() => signOut()}>Logout</button>
      </>
    )
  }  
}

export default Home;