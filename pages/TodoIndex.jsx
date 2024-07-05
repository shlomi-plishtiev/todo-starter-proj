import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, toggleTodo } from "../store/actions/todo.actions.js"

const { useSelector } = ReactRedux
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    const [_todos, setTodos] = useState({})
    const todos = useSelector(storeState => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)
    const [filterBy, setFilterBy] = useState(todoService.getFilterFromSearchParams(useSearchParams()[0]))


    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => showSuccessMsg(`Todo removed`))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        toggleTodo(todo)
            .then(savedTodo => {
                showSuccessMsg(`Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todo._id)
            })
    }
    

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {isLoading
                ? <div>loading...</div>
                : <TodoList
                    todos={todos}
                    onRemoveTodo={onRemoveTodo}
                    onToggleTodo={onToggleTodo}
                />}
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}