import RootRoutes from './layouts/rootRoutes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <RootRoutes />
    </BrowserRouter>
  )
}

export default App
