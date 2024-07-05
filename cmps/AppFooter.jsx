import { ProgressBar } from './ProgressBar.jsx'; 
const { useSelector } = ReactRedux

export function AppFooter() {
    const todos = useSelector(state => state.todos);

    const calculateProgress = () => {
        if (todos.length === 0) {
            return 0;
        }
        const doneCount = todos.filter(todo => todo.isDone).length;
        return (doneCount / todos.length) * 100;
    };

    const progress = calculateProgress();

    return (
        <footer className="app-footer">
            {/* Progress bar in footer */}
            <div className="progress-bar-container">
                <ProgressBar progress={progress} />
            </div>
        </footer>
    );
}
