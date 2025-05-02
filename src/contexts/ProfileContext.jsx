import { createContext, useState, useContext, useEffect } from 'react'
import api ,{ borrarPerfil, crearPerfil, editarPerfil, obtenerPerfiles} from '../api/profileApi'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const ProfileContext = createContext()


export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([])
    const [currentProfile, setCurrentProfile] = useState(null)
    const [profileInEdition, setProfileInEdition] = useState(null)
    

    //POST
    const createProfile = async (profileData) => {
            const {data , error} = await crearPerfil( profileData)
             console.log('error=>',data.message)
    }


    const editProfile = async (id, profileData) => {
        const {data , error} = await editarPerfil(id, profileData)
         console.log('error=>',data.message)
         getProfiles(data.user)
}
    
    const getProfiles = async (userId) => {
        
        const {data , error} = await obtenerPerfiles( userId)
        setProfiles(data)
         console.log('error=>',data.error)
}

    const deleteProfile = async (id) => {
        
        const {data , error} = await borrarPerfil( id)
        setProfiles(profiles.filter(item=>item._id!==id))        
        console.log('error=>',data.error)
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
        
        
            try {
              const profile = localStorage.getItem('currentProfile');
            const parsed = JSON.parse(profile);
            setCurrentProfile(parsed);
            
          } catch (err) {
            console.error('Se produjo un error:', err);
          }
        
      }, []);

    return (
        <ProfileContext.Provider value={{profiles, currentProfile, setCurrentProfile, setProfiles, createProfile, getProfiles, deleteProfile, editProfile, profileInEdition, setProfileInEdition}}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfile = () => useContext(ProfileContext)



