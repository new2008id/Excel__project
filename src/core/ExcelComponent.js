import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    // class ExcelComponent наследуется от class DomListener 
    // ExcelComponent здесь будет определяться шаблон будущегоо компонента, функционал

    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []  

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
        // пробигаемся каждый элемент массива и вызываем его

    }
}
