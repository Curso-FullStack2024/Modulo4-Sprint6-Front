import { createContext, useContext, useEffect, useState } from 'react'
import api, { borrarUsuario, cambiarPassword, createUsuario, editarUsuario, login, obtenerRoles, obtenerUsuarios, olvidoPass, resetPass, validarMailToken } from '../api/authApi'

import { jwtDecode } from 'jwt-decode'
import { useProfile } from './ProfileContext'

export const AuthContext = createContext()



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [totalCards, setTotalCards] = useState(0)
  const { setCurrentProfile } = useProfile()

  //para paginado
  // const [currentPage, setCurrentPage] = useState(1);
  // const [currentCards, setCurrentCards] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);

  //busca la carta por id en el array de cartas del state

  const getUsers = async () => {
    const { data, error } = await obtenerUsuarios()
    if (error) {
      console.log('error=>', error)
    } else {
      return (data)
    }
  }

  //POST
  const createUser = async (user) => {
    const { data } = await createUsuario(user)
    console.log('error=>', data.message)
  }

  const validarToken = async (token) => {
    const { data } = await validarMailToken(token)
    console.log('error=>', data.message)
  }

  /// envia un mail con un token
  const olvidoPassword = async (email) => {
    console.log(email)
    const { data } = await olvidoPass(email)
    console.log('error en olvido=>', data.message)
  }

  ///envia la nueva contraseña
  const resetPassword = async (id, password) => {
    const { data } = await resetPass(id, password)
    console.log('error en reset=>', data.message)
  }


  ///cambia la  contraseña
  const changePassword = async (currentPassword, newPassword) => {
    const { data } = await cambiarPassword(user.id, currentPassword, newPassword)
    console.log('error en reset=>', data.message)
  }

  const deleteUser = async (id = user.id) => {
    console.log(user.id)
    const { data } = await borrarUsuario(id)
    logoutUser()
    console.log('error=>', data.message)
  }

  const loginUser = async (credentials) => {
    const { data } = await login(credentials)

    try {
      const decoded = jwtDecode(data.token)
      setUser(decoded)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(decoded))
      api.defaults.headers.common["authorization"] = `Bearer ${data.token}`
    } catch (error) {
      console.log(error)
    }
  }


  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('currentProfile')
    setUser(null)
    setCurrentProfile(null)
  }


  const getRoles = async () => {
    const { data } = await obtenerRoles()
    console.log('error=>', data.error)
    return (data)
  }


  const editUser = async (id, userData) => {
    const { data } = await editarUsuario(id, userData)
    console.log('error=>', data.message)

  }


  // // Cambio de página
  // const paginate = (pageNumber) => {
  //     // Asegurarse de que el número de página esté dentro del rango válido
  //     if (pageNumber >= 1 && pageNumber <= totalPages) {
  //         setCurrentPage(pageNumber);
  //         // Opcional: Desplazarse hacia arriba al cambiar de página
  //         window.scrollTo(0, 0);
  //     }
  // };

  // useEffect(() => {
  //     // Calcular el número total de páginas
  //     setTotalPages(Math.ceil(cards.length / cardsPerPage));
  //     // calcular el total de cartas
  //     setTotalCards(cards.length)

  //     // Actualizar las cartas que se muestran actualmente
  //     const indexOfLastCard = currentPage * cardsPerPage;
  //     const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  //     setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard));
  // }, [cards, cardsPerPage, currentPage]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        api.defaults.headers.common['authorization'] = `Bearer ${token}`;

      } catch (err) {
        console.error('Error parsing saved user:', err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, createUser, validarToken, loginUser, logoutUser, olvidoPassword, resetPassword, deleteUser, changePassword, getUsers, getRoles, editUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)



