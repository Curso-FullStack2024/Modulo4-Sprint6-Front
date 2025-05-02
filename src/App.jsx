import { AuthProvider } from './contexts/AuthContext'
import { ProfileProvider } from './contexts/ProfileContext'
import Header from './components/Header'

import AppRouter from './routers/AppRouter'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer position='top-center' />
        <ProfileProvider>
      <AuthProvider>
          <Header />
          <AppRouter />
      </AuthProvider>
        </ ProfileProvider>
    </>
  )
}

export default App
