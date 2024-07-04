import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_USER = 'SET_USER'

const initialState = {
    count: 101,
    todos: [],
    isLoading: false,
    loggedInUser: userService.getLoggedinUser()
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }

        default: return state
    }
}


export const store = createStore(appReducer)
window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })