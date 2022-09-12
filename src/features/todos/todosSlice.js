import { client } from '../../api/client'
import { createSelector, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { statusFilters } from '../filters/filtersSlice'

const initialState = {
  loadingStatus: 'idle',
  entities: [],
}

const selectTodos = (state) => state.todos.entities

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId)
}

export const filterTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters
    const showAllTodos = status === statusFilters.All
    if (showAllTodos && colors.length === 0) {
      return todos
    }

    const showAllCompletedTodos = status === statusFilters.Completed

    return todos.filter((todo) => {
      const statusMatches =
        showAllTodos || todo.completed === showAllCompletedTodos
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

export const getTodoIds = createSelector(filterTodos, (filteredTodos) =>
  filteredTodos.map((todo) => todo.id)
)

// Thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos')
  return response.todos
})

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async (text) => {
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    return response.todo
  }
)

const todosReducer = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleStatusTodo(state, action) {
      const todo = state.entities.find((todo) => todo.id === action.payload)
      todo.completed = !todo.completed
    },

    changeSelectedColor: {
      reducer(state, action) {
        const { todoId, color } = action.payload
        const todo = state.entities.find((todo) => todo.id === todoId)
        todo.color = color
      },

      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        }
      },
    },

    deleteTodo(state, action) {
      state.entities = state.entities.filter(
        (todo) => todo.id !== action.payload
      )
    },

    markAllTodosCompleted(state) {
      state.entities.forEach((todo) => (todo.completed = true))
    },

    clearAllCompletedTodos(state) {
      state.entities = state.entities.filter((todo) => !todo.completed)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loadingStatus = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.entities = action.payload
        state.loadingStatus = 'idle'
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        state.entities.push(action.payload)
      })
  },
})

export default todosReducer.reducer

export const {
  toggleStatusTodo,
  changeSelectedColor,
  deleteTodo,
  markAllTodosCompleted,
  clearAllCompletedTodos,
} = todosReducer.actions
