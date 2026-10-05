import { useEffect } from 'react'
import { UseAnecdoteActions } from './store'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  const { initialize } = UseAnecdoteActions()
  useEffect(() => {
    initialize()
  }, [initialize])
  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
