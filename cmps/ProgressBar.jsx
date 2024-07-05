export function ProgressBar({ progress }) {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}>
                    <span className="progress-text">{`${progress.toFixed(2)}%`}</span>
                </div>
            </div>
        </div>
    );
}