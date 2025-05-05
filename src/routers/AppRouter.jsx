import { Routes, Route, useLocation } from 'react-router'
import PrivateRoute from './PrivateRoute'
import ProfileRoute from './ProfileRoute'
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
                <Route path="/" element={ <Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={< Register/>} />
                <Route path="/validar/:token" element={< Validar/>} />
                <Route path="/olvidopassword" element={< OlvidoPassword/>} />
                <Route path="/resetpassword/:token" element={< ResetPassword/>} />
                <Route path="/cambiarpassword/" element={< ChangePassword/>} />

                <Route path="/profiles/" element={<PrivateRoute>< Profiles/></PrivateRoute>} />
                <Route path="/movies/" element={<PrivateRoute><ProfileRoute>< MoviesList/></ProfileRoute></PrivateRoute>} />
                <Route path="/movies/milista" element={<PrivateRoute><ProfileRoute>< MyList/></ProfileRoute></PrivateRoute>} />
                <Route path="/movies/:id" element={<PrivateRoute>< MovieDetail/></PrivateRoute>} />
                <Route path="/movies/agregar" element={<PrivateRoute>< AddMovie/></PrivateRoute>} />
                <Route path="/movies/editar/:id" element={<PrivateRoute>< EditMovie/></PrivateRoute>} />
                <Route path="*" element={<Home />} />
            </Routes>

            
        </>
    )
}
export default AppRouter