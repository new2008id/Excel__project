import {$} from '@core/dom'
import { Emitter } from '@core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector) // $el помечаю DOM элементы
        this.components = options.components || []
        this.emitter = new Emitter()
    }

    getRoot() { // Данный метод будет возвращать корневую node впоследствии самого Excel
        const $root = $.create('div', 'excel')
        // const $root = document.createElement('div')  // DOM-node 
        // $root.classList.add('excel')

        const componentOptions = {
            emitter: this.emitter
        }

        this.components = this.components.map(Component => {
            // const $el = document.createElement('div')
            // $el.classList.add(Component.className)
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML()) 
            $root.append($el)
            return component
        })

        return $root
    }

    render() { // что-то будем складывать в шаблон
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init()) // для каждого нового или текущего компонента вызываем метод init, после append
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}