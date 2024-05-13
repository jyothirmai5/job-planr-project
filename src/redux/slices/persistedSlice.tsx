import { createSlice } from '@reduxjs/toolkit'

export const INITIAL_PERSISTED_STATE = {
    tasks: []
}

export const persistedSlice = createSlice({
    name: 'persistedSlice',
    initialState: INITIAL_PERSISTED_STATE,
    reducers: {
        resetState: () => INITIAL_PERSISTED_STATE,
        addTask: (state: any, action) => {
            state.tasks.push(action.payload.task);
        },
        editTask: (state: any, action) => {
            const { id, task } = action.payload;
            const taskIndex = state.tasks.findIndex((t: any) => t.id === task.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...task };
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    addTask,
    editTask,
    resetState
} = persistedSlice.actions

export default persistedSlice.reducer
