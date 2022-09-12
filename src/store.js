import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosSlice'
import filtersReducer from './features/filters/filtersSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
})
