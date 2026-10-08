import { useAnecdoteActions, useNotificationActions } from "../store"

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const CreateAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    await add(content)
    setNotification(`created anecdote '${content}'`)
    setTimeout(() => {
      setNotification('')
    }, 5000);
    e.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={CreateAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
