import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM
const { useState } = React

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
    const [todoColors, setTodoColors] = useState({})

    function confirmAndRemove(todoId) {
        if (confirm("Are you sure you want to delete this todo?")) {
            onRemoveTodo(todoId);
        }
    }
    const handleColorChange = (todoId, color) => {
        setTodoColors(prevColors => ({
            ...prevColors,
            [todoId]: color
        }))
    }
    return (
        <ul className="todo-list">
        {todos.map(todo =>
            <li key={todo._id} style={{ backgroundColor: todoColors[todo._id] }}>
                <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
                <section>
                    <button onClick={() => confirmAndRemove(todo._id)}>Remove</button>
                    <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                    <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    <label htmlFor={`colorPicker-${todo._id}`}></label>
                    <input
                        type="color"
                        id={`colorPicker-${todo._id}`}
                        name={`colorPicker-${todo._id}`}
                        defaultValue={todoColors[todo._id] || '#ffffff'}
                        onChange={(e) => handleColorChange(todo._id, e.target.value)}
                    />
                </section>
            </li>
        )}
    </ul>
    )
}
