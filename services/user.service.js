import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    updateUser,
    increaseBalance,
    updateUserPrefs,
    getEmptyCredentials
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname };
    user.createdAt = user.updatedAt = Date.now();
    user.prefs = {
        color: 'black',
        bgColor: 'white'
    };

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser);
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

const user = {
    _id: "KAtTl",
    username: "muki",
    password: "muki1",
    fullname: "Muki Ja",
    createdAt: 1711490430252,
    updatedAt: 1711490430999,
    balance: 10000,
    activities: [{ txt: 'Added a Todo', at: 1523873242735 }],
    prefs: {
        color: 'black',
        bgColor: 'white'
    }
};



function increaseBalance(amount) {
    const loggedInUser = getLoggedinUser();
    if (loggedInUser) {
        loggedInUser.balance += amount;
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(loggedInUser));
    }
}

function updateUserPrefs(userId, newPrefs) {
    return storageService.get(STORAGE_KEY, userId)
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found.`);

            user.prefs = { ...user.prefs, ...newPrefs };
            user.updatedAt = Date.now();

            return storageService.put(STORAGE_KEY, user);
        });
}
function updateUser(userId, updatedUserData) {
    return storageService.get(STORAGE_KEY, userId)
        .then(user => {
            if (!user) throw new Error(`User with id ${userId} not found.`);

            // Update user data with new values
            user.fullname = updatedUserData.fullname;
            user.prefs = updatedUserData.prefs;
            user.updatedAt = Date.now();

            // Save updated user data
            return storageService.put(STORAGE_KEY, user);
        });
}