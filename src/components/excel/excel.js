import {$} from '@core/dom'
import { Emitter } from '@core/Emitter'
import { StoreSubscriber } from '@core/StoreSubscriber'
import {updateDate} from '../../redux/actions'
import {preventDefault} from '@core/utils'

export class Excel {
    constructor(options) {
        this.components = options.components || []
        this.store = options.store // хранится объект storе и он един для всего приложения
        this.emitter = new Emitter()
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() { // Данный метод будет возвращать корневую node впоследствии самого Excel
        const $root = $.create('div', 'excel')
        // const $root = document.createElement('div')  // DOM-node 
        // $root.classList.add('excel')

        const componentOptions = {
            emitter: this.emitter,
            store: this.store
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

    init() { // что-то будем складывать в шаблон
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this.store.dispatch(updateDate())
        // подписываюсь
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init()) // для каждого нового или текущего компонента вызываем метод init, после append
    }

    destroy() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
        document.removeEventListener('contextmenu', preventDefault)

    }
}