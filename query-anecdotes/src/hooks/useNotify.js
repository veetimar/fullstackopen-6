import { useContext } from 'react'
import NotificationContext from '../components/NotificationContext'

export const useNotify =  () => useContext(NotificationContext)