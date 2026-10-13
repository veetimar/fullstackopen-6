import { useState } from 'react'
import { useAnecdotes } from './hooks/useAnecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './components/NotificationContext'

const App = () => {
  const { anecdotes, isPending, isError, vote } = useAnecdotes()
  const [notification, setNotification] = useState('')

  const handleVote = (anecdote) => {
    vote(anecdote)
    setNotification(`anecdote '${anecdote.content}' voted`)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  if (isPending) {
    return <div>loading anecdotes</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </NotificationContext.Provider>
  )
}

export default App