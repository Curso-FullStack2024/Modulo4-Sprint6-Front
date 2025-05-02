import { useAuth } from "../contexts/AuthContext"
import { useProfile } from "../contexts/ProfileContext"

const Home = () => {
  const { user} = useAuth()
  const {currentProfile} = useProfile()
  
  return (
    <div>{user?.email}
    <p>{currentProfile?.name}</p>
    </div>
  )
}

export default Home