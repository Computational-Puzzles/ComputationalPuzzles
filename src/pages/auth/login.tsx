import React from "react";
import styles from "../../../styles/login.module.scss";
import Input from "../../components/Global/Input";


const Login: React.FC = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        // check: username & password (need data frm db?)
    }


    return (
        <div className={styles.loginPage}>
            <h1>Computational Puzzles for Kids</h1>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <Input type={'text'}
                       id={'username'}
                       required={true}
                       placeholder={'username'}
                       labelText={'Username'}
                />
                <br/>
                <Input
                    type={'password'}
                    id={'password'}
                    required={true}
                    placeholder={'password'}
                    labelText={'Password'}
                />
                <br/>
                <a href='#'>Forgot Password?</a>
                <a href='#'>Don't have an account?</a>
                <br/>
                <button> Log In</button>
            </form>

        </div>

    )
}

export default Login;