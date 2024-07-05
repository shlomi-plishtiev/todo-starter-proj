import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_USER = 'SET_USER'
export const TOGGLE_TODO = 'SET_USER'
export const UPDATE_BALANCE = 'UPDATE_BALANCE'

const initialState = {
    count: 101,
    todos: [],
    isLoading: false,
    loggedInUser: userService.getLoggedinUser(),
};

function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return {
                ...state,
                todos: action.todos
            };
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.todoId)
            };
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo._id === cmd.todo._id ? cmd.todo : todo
                ),
            };
        case UPDATE_BALANCE:
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    balance: state.loggedInUser.balance + action.amount
                }
            };
        default:
            return state;
    }
}


export const store = createStore(appReducer)
// window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })