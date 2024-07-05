
const { useState, useEffect } = React
const { useParams } = ReactRouterDOM
const { useSelector } = ReactRedux
import { userService } from '../services/user.service.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export function UserDetails() {
    const loggedInUser = useSelector(state => state.loggedInUser);
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [fullname, setFullname] = useState('');
    const [prefs, setPrefs] = useState({ color: '#000000', bgColor: '#ffffff' });

    useEffect(() => {
        userService.getById(userId)
            .then(user => {
                setUser(user);
                setFullname(user.fullname);
                setPrefs(user.prefs || { color: '#000000', bgColor: '#ffffff' });
            })
            .catch(err => {
                console.error('Error fetching user details:', err);
            });
    }, [userId]);

    useEffect(() => {
        if (user) {
            document.documentElement.style.setProperty('--user-text-color', prefs.color);
            document.documentElement.style.setProperty('--user-bg-color', prefs.bgColor);
        }
    }, [prefs]);

    const handleFullnameChange = (e) => {
        setFullname(e.target.value);
    };

    const handleChangePrefs = (key, value) => {
        setPrefs(prevPrefs => ({
            ...prevPrefs,
            [key]: value
        }));
    };

    const handleSave = () => {
        const updatedUser = {
            ...user,
            fullname: fullname,
            prefs: prefs
        };

        userService.updateUser(userId, updatedUser)
            .then(updatedUser => {
                setUser(updatedUser);
                showSuccessMsg('User details updated successfully');
            })
            .catch(err => {
                showErrorMsg('Failed to update user details');
                console.error('Error updating user details:', err);
            });
    };

    if (!user) return <div>Loading...</div>;

    const isOwnProfile = loggedInUser && loggedInUser._id === user._id;

    return (
        <div className="user-details" style={{ color: prefs.color, backgroundColor: prefs.bgColor }}>
            <h2>User Details</h2>
            <p>Username: {user.username}</p>
            <label>
                Fullname:
                <input type="text" value={fullname} onChange={handleFullnameChange} />
            </label>
            {isOwnProfile && (
                <div>
                    <h3>Preferences</h3>
                    <label>
                        Text Color:
                        <input type="color" value={prefs.color} onChange={(e) => handleChangePrefs('color', e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Background Color:
                        <input type="color" value={prefs.bgColor} onChange={(e) => handleChangePrefs('bgColor', e.target.value)} />
                    </label>
                </div>
            )}
            {isOwnProfile && (
                <button onClick={handleSave}>Save</button>
            )}
        </div>
    );
}