import { UseAnecdoteActions } from "../store"

const AnecdoteForm = () => {
  const { addAnecdote } = UseAnecdoteActions()

  const CreateAnecdote = (e) => {
    e.preventDefault()
    addAnecdote(e.target.text.value)
    e.target.reset()
  }

  return (
    <div>
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

export default AnecdoteForm
