import { AuthProvider } from './contexts/AuthContext'
import { ProfileProvider } from './contexts/ProfileContext'
import Header from './components/Header'

import AppRouter from './routers/AppRouter'
import { ToastContainer } from 'react-toastify'
import { MovieProvider } from './contexts/MovieContext'

function App() {

  return (
    <>
      <ToastContainer position='top-center' />
      <ProfileProvider>
        <AuthProvider>
          <MovieProvider>
            <Header />
            <AppRouter />
          </MovieProvider>
        </AuthProvider>
      </ ProfileProvider>
    </>
  )
}

export default App
