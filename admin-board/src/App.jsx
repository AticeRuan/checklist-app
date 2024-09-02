import RootRoutes from './layouts/rootRoutes'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
