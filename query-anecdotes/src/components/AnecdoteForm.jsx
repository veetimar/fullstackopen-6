import { useContext } from 'react'
import { useAnecdotes } from '../hooks/useAnecdotes'
import NotificationContext from './NotificationContext'

const AnecdoteForm = () => {
  const { add } = useAnecdotes()
  const { setNotification } = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    add(content)
    setNotification(`anecdote '${content}' created`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm