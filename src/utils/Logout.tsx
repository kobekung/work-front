import { alertSuccess } from "./Alert";

const Logout = () => {
    localStorage.clear();
    alertSuccess();
    window.location.href = "/";
}

export { Logout };