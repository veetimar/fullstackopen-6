import { UseAnecdoteActions } from "../store"

const AnecdoteForm = () => {
  const { add } = UseAnecdoteActions()

  const CreateAnecdote = async (e) => {
    e.preventDefault()
    await add(e.target.text.value)
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
