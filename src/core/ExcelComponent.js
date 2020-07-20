import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    // class ExcelComponent наследуется от class DomListener 
    // ExcelComponent здесь будет определяться шаблон будущегоо компонента, функционал

    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
    }
    // Возвращает шаблон копoнента
    toHTML() { // базовый метод, который будет определён для инстанса будущих классов (table, toolbar...)
        return '' // в результате будет выводить шаблон
    }

    init() { // нужен для автоматизации метода initDOMListeners
        this.initDOMListeners()

    }

    destroy() {
        this.removeDOMListeners()
    }
}
