import { createSlice } from '@reduxjs/toolkit'
import { TaskListModel } from '../../interfaces';

export const INITIAL_PERSISTED_STATE = {
    tasks: []
}

export const persistedSlice = createSlice({
    name: 'persistedSlice',
    initialState: INITIAL_PERSISTED_STATE,
    reducers: {
        // temporary code to clear persisted state
        resetState: () => INITIAL_PERSISTED_STATE,
        // Adding a task in redux localstorage
        addTask: (state: any, action) => {
            state.tasks.push(action.payload.task);
        },
        // Editing a task in redux localstorage
        editTask: (state: any, action) => {
            const { task } = action.payload;
            const taskIndex = state.tasks.findIndex((t: TaskListModel) => t.id === task.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...task };
            }
        },
        // Deleting a task in redux localstorage
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
