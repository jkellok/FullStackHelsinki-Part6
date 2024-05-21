import { useCounterValue } from "../CounterContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const message = useCounterValue()

  if (!message) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
