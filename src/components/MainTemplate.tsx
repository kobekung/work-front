import { Navigate, Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import NavBar from './NavBar'
import { ContextProvider } from '../provider/ContextProvider'

const MainTemplate = () => {
    // const user = useSelector<initialState>((state: initialState) => state.user);
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/" replace />;
    }



    return (
        <ContextProvider>
            <div>
                <NavBar />
                <SideBar element={<Outlet />} />

            </div>
        </ContextProvider>
    )
}

export default MainTemplate