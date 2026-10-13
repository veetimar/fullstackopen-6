import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext'
import App from './App'

const queryclient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryclient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)