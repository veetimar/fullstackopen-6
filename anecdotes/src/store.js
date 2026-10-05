import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const sortAnecdotes = anecdotes => (
  anecdotes.toSorted((a, b) => b.votes - a.votes)
)

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    incrementVotes: async id => {
      const anecdotes = get().anecdotes
      let newAnecdote = anecdotes.find(a => a.id === id)
      newAnecdote = { ...newAnecdote, votes: newAnecdote.votes + 1}
      const returnedAnecdote = await anecdoteService.replace(id, newAnecdote)
      set(state => ({ anecdotes: sortAnecdotes(state.anecdotes.filter(a => a.id !== id).concat(returnedAnecdote)) }))
    },
    add: async str => {
      const newAnecdote = await anecdoteService.create(str)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: str => set(() => ({
      filter: str
    })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: sortAnecdotes(anecdotes) }))
    },
    deleteAnecdote: async id => {
      await anecdoteService.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== id)}))
    }
  },
}))

const useNotificationStore = create((set) => ({
  content: '',
  actions: {
    setNotification: value => set({content: value})
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(a => a.content.includes(filter))
}
export const UseAnecdoteActions = () => useAnecdoteStore(state => state.actions)

export const useNotification = () => {
  return useNotificationStore(state => state.content)
}
export const useNotificationActions = () => {
  return useNotificationStore(state => state.actions)
}
