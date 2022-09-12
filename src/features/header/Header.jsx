import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveNewTodo } from '../todos/todosSlice'

const Header = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handlerChange = (e) => setText(e.target.value)

  const handlerKeyDown = async (e) => {
    const trimmedText = e.target.value.trim()

    if (e.key === 'Enter' && trimmedText) {
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      setText('')
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let loader = isLoading ? <div className="loader" /> : null

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        disabled={isLoading}
        onChange={handlerChange}
        onKeyDown={handlerKeyDown}
      />
      {loader}
    </header>
  )
}

export default Header
