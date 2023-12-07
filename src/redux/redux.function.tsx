import { useSelector } from "react-redux";
import { initialState } from "./redux.store";


const ReduxFunction = () => {
    const token = useSelector((state: initialState) => state?.token)
    return token
}


export default ReduxFunction;