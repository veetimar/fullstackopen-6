import { useAnecdotes, UseAnecdoteActions, useNotificationActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes } = UseAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const vote = async (id) => {
    await incrementVotes(id)
    const anecdote = anecdotes.find(a => a.id === id)
    setNotification(`You voted '${anecdote.content}'`)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
