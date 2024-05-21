import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "showNotification":
        return action.message
    case "removeNotification":
        return ''
    default:
        return ''
  }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <CounterContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </CounterContext.Provider>
  )
}

export const useCounterValue = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[0]
}

export const useCounterDispatch = () => {
  const counterAndDispatch = useContext(CounterContext)
  return counterAndDispatch[1]
}

export default CounterContext