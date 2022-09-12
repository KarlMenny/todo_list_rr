import React from 'react'
import { availableColors, capitalize } from '../filters/colors'
import {
  clearAllCompletedTodos,
  markAllTodosCompleted,
} from '../todos/todosSlice'
import {
  changeFilterColor,
  changeFilterStatus,
  statusFilters,
} from '../filters/filtersSlice'
import { useDispatch, useSelector } from 'react-redux'

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(statusFilters).map((key) => {
    const value = statusFilters[key]
    const handlerClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handlerClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)

    const handlerChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handlerChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

const Footer = () => {
  const { status, colors } = useSelector((state) => state.filters)
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = state.todos.entities.filter(
      (todo) => !todo.completed
    )
    return uncompletedTodos.length
  })

  const dispatch = useDispatch()

  const handlerMarkAllTodosCompleted = () => {
    dispatch(markAllTodosCompleted())
  }

  const handlerClearAllCompletedTodos = () => {
    dispatch(clearAllCompletedTodos())
  }

  const handlerChangeFilterStatus = (status) => {
    dispatch(changeFilterStatus(status))
  }

  const handlerChangeFilterColor = (color, changeType) => {
    dispatch(changeFilterColor({ color, changeType }))
  }

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={handlerMarkAllTodosCompleted}>
          Mark All Completed
        </button>
        <button className="button" onClick={handlerClearAllCompletedTodos}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={handlerChangeFilterStatus} />
      <ColorFilters value={colors} onChange={handlerChangeFilterColor} />
    </footer>
  )
}

export default Footer
