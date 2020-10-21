//createStory - функция-конструктор, возвращает объект Store

export function createStore(rootReducer, initialState = {}) { // реализую сам Redux
    let state = rootReducer({...initialState}, {type: '__INIT__'}) // состояние для текущего приложения
    // передаю системный type INIT
    let listeners = [] // содержит слушателей для store

    return {
        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(l = l !== fn) 
                    // будет вызываться функция тогда, когда нужно отписаться
                }
            }
        },
        dispatch(action) { // action по Redux должен 
            state = rootReducer(state, action) // переопределил state и загнал в listener
            listeners.forEach(listener => listener(state))
        },
        getState() {
            return JSON.parse(JSON.stringify(state))
        } 
    }
}