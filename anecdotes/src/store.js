import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const sortAnecdotes = anecdotes => (
  anecdotes.toSorted((a, b) => b.votes - a.votes)
)

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    incrementVotes: id => set(state => ({
      anecdotes: sortAnecdotes(state.anecdotes.map(a => a.id !== id ? a : { ...a, votes: a.votes + 1 }))
    })),
    addAnecdote: str => set(state => ({
      anecdotes: state.anecdotes.concat(asObject(str))
    })),
    setFilter: str => set(() => ({
      filter: str
    })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(a => a.content.includes(filter))
}
export const UseAnecdoteActions = () => useAnecdoteStore(state => state.actions)
