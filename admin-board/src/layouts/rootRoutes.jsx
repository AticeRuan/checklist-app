import { Routes, Route, useLocation } from 'react-router-dom'
import RootLayout from './rootLayout'
import Home from '../pages/home'
import AllLists from '../pages/allLists'
import Archive from '../pages/archive'
import CreateNew from '../pages/createNew'
import Drafts from '../pages/drafts'
import Settings from '../pages/settings'
import User from '../pages/user'
import Update from '../pages/update'

const RootRoutes = () => {
  const location = useLocation()
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/all-lists" element={<AllLists />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/create-new" element={<CreateNew />} />
        <Route path="/drafts" element={<Drafts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user" element={<User />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/drafts/:id" element={<Update />} />
      </Route>
    </Routes>
  )
}

export default RootRoutes
