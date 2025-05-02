import { createContext, useState, useContext, useEffect } from 'react'
import api ,{ createUsuario , validarMailToken, login, olvidoPass, resetPass} from '../api/authApi'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useProfile } from './ProfileContext'

export const AuthContext = createContext()

const url = 'http://127.0.0.1:3500'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [totalCards, setTotalCards] = useState(0)
    const { setCurrentProfile } = useProfile()

    //para paginado
    const cardsPerPage = 18
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCards, setCurrentCards] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    //busca la carta por id en el array de cartas del state
    const getCardById = (id) => {
        const card = cards.find((card) => card.id === id)
        return card
    }

    //POST
    const createUser = async (user) => {
            const {data , error} = await createUsuario( user)
             console.log('error=>',data.message)
    }

    const validarToken = async (token) => {
        const { data, error} = await validarMailToken(token)
         console.log('error=>',data.message)
    }

/// envia un mail con un token
    const olvidoPassword = async (email) => {
        console.log(email)
        const { data, error} = await olvidoPass(email)
         console.log('error en olvido=>',data.message)
    }

///envia la nueva contrraseña
    const resetPassword = async (id, password) => {          
        const { data, error} = await resetPass(id, password)
         console.log('error en reset=>',data.message)
    }

    const loginUser = async (credentials) => {
        const {data} = await login(credentials)
          
        try {
             const decoded= jwtDecode(data.token)
             setUser(decoded)  
             localStorage.setItem('token',data.token)          
             localStorage.setItem('user', JSON.stringify(decoded))          
         } catch (error) {
            console.log(error)
         }
    }


    const logoutUser =  () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')    
        localStorage.removeItem('currentProfile')        
        setUser(null)
        setCurrentProfile(null)
    }

    // PUT 
    const updateCard = async (id, updatedData) => {
        const { data } = await axios.put(`${url}/${id}`, updatedData)
        setCards((prev) =>
            prev.map((item) => (item.id == id ? data : item))
        )
    }

    //DELETE
    const deleteCard = async (id) => {
        await axios.delete(`${url}/${id}`)
        setCards((prev) => prev.filter((item) => item.id != id))
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
            // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } catch (err) {
            console.error('Error parsing saved user:', err);
          }
        }
      }, []);

    return (
        <AuthContext.Provider value={{ user, createUser, validarToken , loginUser, logoutUser, olvidoPassword, resetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)



