import { createContext } from 'react'
import { useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export const NotificationContextProvider = props => {
  const [notification, setNotification] = useState('')

  const notify = notif => {
    setNotification(notif)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {props.children}
    </NotificationContext.Provider>
  )
}