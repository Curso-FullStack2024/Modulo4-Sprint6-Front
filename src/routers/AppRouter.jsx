import { Routes, Route } from 'react-router'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Validar from '../pages/Validar'
import OlvidoPassword from '../pages/OlvidoPassword'
import ResetPassword from '../pages/ResetPassword'
import Profiles from '../pages/Profiles'

const AppRouter = () => {
    return (
        <>           
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={< Register/>} />
                <Route path="/validar/:token" element={< Validar/>} />
                <Route path="/olvidopassword" element={< OlvidoPassword/>} />
                <Route path="/resetpassword/:token" element={< ResetPassword/>} />

                <Route path="/profiles/" element={< Profiles/>} />

                <Route path="*" element={<Home />} />
            </Routes>
        </>
    )
}
export default AppRouter