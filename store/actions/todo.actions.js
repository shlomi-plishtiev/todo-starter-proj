import { todoService } from "../../services/todo.service.js"
import { REMOVE_TODO, SET_IS_LOADING, SET_TODOS, store } from "../store.js"
import { userService } from "../../services/user.service.js"

export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}


export function toggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone }
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService.save(todoToSave)
        .then(savedTodo => {
            // Increase user balance by 10 when task is completed
            if (savedTodo.isDone) {
                userService.increaseBalance(10)
            }

            store.dispatch({ type: SET_TODOS, todos: [savedTodo] })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot toggle todo', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            loadTodos();
        })
}