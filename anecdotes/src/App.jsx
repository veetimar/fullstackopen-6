import { UseAnecdoteActions, useAnecdotes } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes, addAnecdote } = UseAnecdoteActions()

  const vote = (id) => {
    incrementVotes(id)
  }

  const CreateAnecdote = (e) => {
    e.preventDefault()
    addAnecdote(e.target.text.value)
    e.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={CreateAnecdote}>
        <div>
          <input data-testid="new" name="text" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
