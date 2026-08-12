import { useState } from 'react'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MyPets from './pages/MyPets'
import PetProfile from './pages/PetProfile'
import Blog from './pages/Blog'
import Article from './pages/Article'
import Admin from './pages/Admin'
import UserProfile from './pages/UserProfile'

export type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'pets'
  | 'pet-profile'
  | 'blog'
  | 'article'
  | 'admin'
  | 'profile'

export interface NavProps {
  navigate: (page: Page, params?: Record<string, unknown>) => void
  params: Record<string, unknown>
}

export default function App() {
  const [page, setPage] = useState<Page>('landing')
  const [params, setParams] = useState<Record<string, unknown>>({})

  const navigate = (newPage: Page, newParams?: Record<string, unknown>) => {
    setPage(newPage)
    setParams(newParams || {})
    window.scrollTo(0, 0)
  }

  const props: NavProps = { navigate, params }

  switch (page) {
    case 'landing':     return <Landing {...props} />
    case 'login':       return <Login {...props} />
    case 'register':    return <Register {...props} />
    case 'dashboard':   return <Dashboard {...props} />
    case 'pets':        return <MyPets {...props} />
    case 'pet-profile': return <PetProfile {...props} />
    case 'blog':        return <Blog {...props} />
    case 'article':     return <Article {...props} />
    case 'admin':       return <Admin {...props} />
    case 'profile':     return <UserProfile {...props} />
    default:            return <Landing {...props} />
  }
}
