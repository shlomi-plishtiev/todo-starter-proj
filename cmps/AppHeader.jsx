const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { ProgressBar  } from './ProgressBar.jsx'


export function AppHeader() {
    const user = useSelector(storeState => storeState.loggedInUser)
    const todos = useSelector(storeState => storeState.todos)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('bye bye')
            })
            .catch((err) => {
                console.log(err)
                showErrorMsg('OOPs try again')
            })
    }
    const calculateProgress = () => {
        if (todos.length === 0) {
            return 0;
        }
        const doneCount = todos.filter(todo => todo.isDone).length;
        return (doneCount / todos.length) * 100;
    }

    const progress = calculateProgress();

    return (
        <header className="app-header full main-layout">
        <section className="header-container">
            <h1>React Todo App</h1>
            {user ? (
                <section>
                    <Link to={`/user-details/${user._id}`} className="user-name">Hello {user.fullname}</Link>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <nav className="app-nav">
                <NavLink to="/" className="app-nav-home">Home</NavLink>
                <NavLink to="/about" className="app-nav-about">About</NavLink>
                <NavLink to="/todo" className="app-nav-todo">Todos</NavLink>
                <NavLink to="/dashboard"className="app-nav-dashboard">Dashboard</NavLink>
            </nav>
            <div className="progress-bar-container">
                    <ProgressBar progress={progress} />
                </div>
        </section>
        <UserMsg />
    </header>
    )
}
