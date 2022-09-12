import { createSlice } from '@reduxjs/toolkit'

export const statusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: statusFilters.All,
  colors: [],
}

const filtersReducer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilterStatus(state, action) {
      state.status = action.payload
    },

    changeFilterColor(state, action) {
      let { color, changeType } = action.payload
      const { colors } = state

      switch (changeType) {
        case 'added': {
          colors.push(color)

          break
        }

        case 'removed': {
          state.colors = colors.filter(
            (existingColor) => existingColor !== color
          )

          break
        }

        default:
          return
      }
    },
  },
})

export default filtersReducer.reducer

export const { changeFilterStatus, changeFilterColor } = filtersReducer.actions
