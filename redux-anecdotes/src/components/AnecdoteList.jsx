import { useDispatch, useSelector } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )}
  })

  const vote = ({ id, content }) => {
    dispatch(incrementVotesOf(id))
    dispatch(setMessage(`you voted \'${content}\'`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

  return(
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList