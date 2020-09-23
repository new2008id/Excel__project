export class Emitter {
    constructor() {
        this.listeners = {} // пока нет слушателей, но позже их добавлю
    }

    // реализую методы

    // что-то будет уведомлять слушателей, если они есть
    //table.emit('table.select', {a: 1})
    emit(event, ...args) { 
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // Подписываемся на уведомления, добавляем нового слушателя
    //formula.subscribe('table:select', () => {})
    subscribe(event, fn) { 
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn) // складируем по определённому ключу функции
        return () => { // избегаю утечку памяти
            this.listeners[event] 
                = this.listeners[event].filter(listener => listener !== fn)
        }

    }
}

//Example
// const emitter = new Emitter()

// const unsub = emitter.subscribe('new2008id', data => console.log('Sub: ', data))
// emitter.emit('12312', 42)

// setTimeout(() => {
//     emitter.emit('new2008id', 'After 2 seconds')
// }, 2000)

// setTimeout(() => {
//     unsub()
// }, 3000)

// setTimeout(() => {
//     emitter.emit('new2008id', 'After to 4 seconds')
// }, 4000)