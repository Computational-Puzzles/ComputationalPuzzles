import Axios from "./axios";
import type { signUpData } from "../pages/api/auth/signup";

/**
 * This will send an axios request to the server to sign up a user
 */
export const signUp = (data: signUpData) => {
    return Axios.post("/api/auth/signup", data);
}
