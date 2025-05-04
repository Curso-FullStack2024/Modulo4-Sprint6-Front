import { Routes, Route, useLocation } from 'react-router'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Validar from '../pages/Validar'
import OlvidoPassword from '../pages/OlvidoPassword'
import ResetPassword from '../pages/ResetPassword'
import Profiles from '../pages/Profiles'
import MoviesList from '../pages/MoviesList'
import MovieDetail from '../pages/MovieDetail'
import ChangePassword from '../pages/ChangePassword'
import MyList from '../pages/MyList'
import AddMovie from '../pages/addMovie'
import EditMovie from '../pages/editMovie'


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
                <Route path="/cambiarpassword/" element={< ChangePassword/>} />

                <Route path="/profiles/" element={< Profiles/>} />
                <Route path="/movies/" element={< MoviesList/>} />
                <Route path="/movies/milista" element={< MyList/>} />
                <Route path="/movies/:id" element={< MovieDetail/>} />
                <Route path="/movies/agregar" element={< AddMovie/>} />
                <Route path="/movies/editar/:id" element={< EditMovie/>} />
                <Route path="*" element={<Home />} />
            </Routes>

            
        </>
    )
}
export default AppRouter