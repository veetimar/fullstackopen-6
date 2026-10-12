import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn: async (newAnecdote) => {
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
      }
      const response = await fetch(`http://localhost:3001/anecdotes/${newAnecdote.id}`, options)
      if (!response.ok) {
        throw new Error('Failed to create anecdote')
      }
      return await response.json()
    },
    onSuccess: (response) => {
      let anecdotes = queryClient.getQueryData(['anecdotes'])
      anecdotes = anecdotes.filter(a => a.id !== response.id)
      anecdotes = anecdotes.concat(response)
      anecdotes.sort((a, b) => b.votes - a.votes)
      queryClient.setQueryData(['anecdotes'], anecdotes)
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      return (await response.json()).toSorted((a, b) => b.votes - a.votes)
    },
    retry: 1
  })

  if (result.isPending) {
    return <div>loading anecdotes</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
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
    </div>
  )
}

export default App