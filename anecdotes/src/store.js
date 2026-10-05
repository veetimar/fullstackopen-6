import { create } from 'zustand'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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
  anecdotes: anecdotesAtStart.map(asObject),
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
    }))
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(a => a.content.includes(filter))
}
export const UseAnecdoteActions = () => useAnecdoteStore(state => state.actions)
