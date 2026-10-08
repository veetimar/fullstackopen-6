import { beforeEach, vi, it, expect } from 'vitest'
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

it('state is initialized with the anecdotes returned by the backend', async () => {
  const mockAnecdotes = [{ id: 1, content: 'test', votes: 1}, {id: 2, content: 'test-2', votes: 0}]
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

  const { result } = renderHook(() => useAnecdoteActions())
  await act(async () => await result.current.initialize())

  const { result: anecdotes } = renderHook(() => useAnecdotes())
  expect(anecdotes.current).toEqual(mockAnecdotes)
})

it('useAnecdotes returns anecdotes sorted in the correct order', async () => {
  const mockAnecdotes = [{ id: 1, content: 'test', votes: 1}, {id: 2, content: 'test-2', votes: 2}, {id: 3, content: 'test-3', votes: 0}]
  anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

  const { result } = renderHook(() => useAnecdoteActions())
  await act(async () => await result.current.initialize())

  const { result: anecdotes } = renderHook(() => useAnecdotes())
  expect(anecdotes.current).toEqual([{id: 2, content: 'test-2', votes: 2}, { id: 1, content: 'test', votes: 1}, {id: 3, content: 'test-3', votes: 0}])
})
