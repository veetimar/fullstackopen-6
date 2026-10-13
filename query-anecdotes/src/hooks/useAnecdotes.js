import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotify } from './useNotify'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: async (newAnecdote) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
      }
      const response = await fetch('http://localhost:3001/anecdotes', options)
      if (!response.ok) {
        throw new Error('Failed to create anecdote')
      }
      return await response.json()
    },
    onSuccess: (response) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(response))
      notify(`anecdote '${response.content}' created`)
    },
    onError: () => {
      notify('too short anecdote, must have length 5 or more')
    }
  })

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
      notify(`anecdote '${response.content}' voted`)
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

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    add: content => newAnecdoteMutation.mutate({ content }),
    vote: anecdote => updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
  }
}