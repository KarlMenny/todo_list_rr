import React from 'react'
import { ReactComponent as TimesSolid } from './times-solid.svg'
import { availableColors, capitalize } from '../filters/colors'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeSelectedColor,
  deleteTodo,
  selectTodoById,
  toggleStatusTodo,
} from './todosSlice'

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const dispatch = useDispatch()

  const { text, completed, color } = todo

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  const handlerToggleStatusTodo = () => {
    dispatch(toggleStatusTodo(id))
  }

  const handlerChangeSelectedColor = (e) => {
    const color = e.target.value
    dispatch(changeSelectedColor(id, color))
  }

  const handlerDeleteTodo = () => {
    dispatch(deleteTodo(id))
  }

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handlerToggleStatusTodo}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handlerChangeSelectedColor}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handlerDeleteTodo}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
