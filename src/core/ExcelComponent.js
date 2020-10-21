import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    // class ExcelComponent наследуется от class DomListener 
    // ExcelComponent здесь будет определяться шаблон будущегоо компонента, функционал

    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []  
        // this.storeSub = null

        this.prepare()
    }

    // Настраиваем наш компонент до init 
    prepare() {}
    
    // Возвращает шаблон копoнента
    toHTML() { // базовый метод, который будет определён для инстанса будущих классов (table, toolbar...)
        return '' // в результате будет выводить шаблон
    }

    // Уведомляем слушателей про события event
    $emit(event, ...args) { // пример объявления метода из Vue.js
        this.emitter.emit(event, ...args)
    } // написал определённый интерфейс, позволяющий взаимодействовать с emitter

    // Подписываемся на события event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    } // метод подписки; централизованное событие, где мы подписываемся на события

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // сюда приходят только изменения по тем полям, по которым мы подписались
    storeChanged() {

    }

    isWatching(key) {
        // в массиве находятся список строчек, поля, на которых нужно подписаться
        return this.subscribe.includes(key) 
    }

    // $subscribe(fn) { // подписываться на обновления слушателей
    //     this.storeSub = this.store.subscribe(fn)
    // }

    // инициализируем компонент
    // Добавляем DOM слушателя 
    init() { // нужен для автоматизации метода initDOMListeners
        this.initDOMListeners()

    }

    // Удаляем компонент
    // Чистим слушателей
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub()) 
        // this.storeSub.unsubscribe()
        // пробигаемся каждый элемент массива и вызываем его

    }
}
