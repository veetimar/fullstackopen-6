import { beforeEach, vi, it, expect, describe } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    replace: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: ''})
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('state is initialized with the anecdotes returned by the backend', async () => {
    const mockAnecdotes = [{ id: 1, content: 'test', votes: 1 }, { id: 2, content: 'test-2', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result: actions } = renderHook(() => useAnecdoteActions())
    await act(async () => await actions.current.initialize())

    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual(mockAnecdotes)
  })

  describe('with anecdotes', () => {
    beforeEach(() => {
      const anecdotes = [
        { id: 1, content: 'test', votes: 1 },
        { id: 2, content: 'test-2', votes: 2 },
        { id: 3, content: 'test-3', votes: 0 }
      ]
      useAnecdoteStore.setState({ anecdotes })
    })

    it('voting increases the number of votes for an anecdote', async () => {
      anecdoteService.replace.mockResolvedValue({ id: 2, content: 'test-2', votes: 3 })
      const { result: actions } = renderHook(() => useAnecdoteActions())
      await act(async () => await actions.current.incrementVotes(2))

      const { result: anecdotes } = renderHook(() => useAnecdotes())
      expect(anecdotes.current[0]).toEqual({ id: 2, content: 'test-2', votes: 3 })
    })
  })
})

describe('useAnecdotes', () => {
  beforeEach(() => {
    const anecdotes = [
      { id: 1, content: 'test', votes: 1 },
      { id: 2, content: 'test-2', votes: 2 },
      { id: 3, content: 'test-3', votes: 0 }
    ]
    useAnecdoteStore.setState({ anecdotes })
  })

  it('returns anecdotes sorted in the correct order', async () => {
    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual([{id: 2, content: 'test-2', votes: 2}, { id: 1, content: 'test', votes: 1}, {id: 3, content: 'test-3', votes: 0}])
  })

  it('filters anecdotes correctly', async () => {
    const filter = 'test-'
    const { result: actions } = renderHook(() => useAnecdoteActions())
    await act(async () => await actions.current.setFilter(filter))

    const { result: anecdotes } = renderHook(() => useAnecdotes())
    expect(anecdotes.current).toEqual([{id: 2, content: 'test-2', votes: 2}, {id: 3, content: 'test-3', votes: 0}])
  })
})
