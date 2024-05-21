import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecote } from '../requests'
import { useCounterDispatch } from '../CounterContext'

const AnecdoteForm = () => {
  const dispatch = useCounterDispatch()
  const queryClient = useQueryClient
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes']), anecdotes.concat(newAnecdote)
    },
    onError: (error) => {
      // or error.response?.status
      if (error.response.status === 400) {
        console.log("error in newAnecdote", error)
        dispatch({
          type: "showNotification",
          message: "too short anecdote, must have length of 5 or more"
        })
        setTimeout(() => {
          dispatch({ type: "removeNotification" })
        }, 5000)
      }
    }
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({
      type: "showNotification",
      message: `you added anecdote '${content}'`
    })
    setTimeout(() => {
      dispatch({ type: "removeNotification" })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
