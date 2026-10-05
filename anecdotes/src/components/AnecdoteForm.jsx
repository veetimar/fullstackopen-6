import { UseAnecdoteActions, useNotificationActions } from "../store"

const AnecdoteForm = () => {
  const { add } = UseAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const CreateAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.text.value
    await add(content)
    setNotification(`Created anecdote '${content}'`)
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
          <input data-testid="new" name="text" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
