import {Button} from "../index";
import {signIn, signOut} from "next-auth/react";
import React from "react";

const LogStatusButton = ({ status }) => {
    return status === 'authenticated' ? (
        <Button style={'flat'} content={'Logout'} onClick={() => signOut()} />
    ) : (
        <Button style={'flat'} content={'Login'} onClick={() => signIn()} />
    );
};

export default LogStatusButton;
