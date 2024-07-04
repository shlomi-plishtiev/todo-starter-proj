import { todoService } from "../../services/todo.service.js"
import { REMOVE_TODO, SET_IS_LOADING, SET_TODOS, store } from "../../store/store.js"


export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .catch(err => {
            console.eror('todo action-> connot load todos', err)
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
            console.eror('todo action-> connot remove todos', err)
            throw err
        })
}