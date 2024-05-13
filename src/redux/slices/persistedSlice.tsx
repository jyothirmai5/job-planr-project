import { createSlice } from '@reduxjs/toolkit'
import { TaskListModel } from '../../interfaces';

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
            const { task } = action.payload;
            const taskIndex = state.tasks.findIndex((t: TaskListModel) => t.id === task.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...task };
            }
        },
        deleteTask: (state: any, action) => {
            const { id } = action.payload;
            state.tasks = state.tasks.filter((task: TaskListModel) => task.id !== id);
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    addTask,
    editTask,
    resetState,
    deleteTask
} = persistedSlice.actions

export default persistedSlice.reducer
