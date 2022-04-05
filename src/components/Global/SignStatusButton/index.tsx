import React from 'react';
import {Button} from "../index";

const SignStatusButton = ({status}) => {
    return status !== 'authenticated' && (
        <Button style={'flat'} content={'Sign In'} link={'/auth/signup'}/>
    );
};

export default SignStatusButton;