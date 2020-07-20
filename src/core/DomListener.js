import { capitalize } from "./utils"

export class DomListener { 
    // сюда будут добавляться изолированные события для различных элементов 
    // которые будут наследоваться от классов
    constructor($root, listeners = []) { // $root - корневой элемент, на который будут вешаться слушатели
        // заношу его в переменную
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() { // для добавления слушателей
        // console.log(this.listeners, this.$root);
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this [method]) {
                const name = this.name || ''
                throw new Error(
                        `Method ${method} is not implemented in ${name} Component`
                    )
            }
            // console.log(listener, this.$root);
            this[method] = this[method].bind(this) // куда мы не передевали method он всегда будет с контекстом this
            // тоже самое, что и addEventListener (метод on)
            this.$root.on(listener, this[method])
            // здесь используется стрелочная callback функция, поэтому нужно ставить this.$root
            // если бы использовалась обычная функция, тогда нужно было бы просто ставить $root
            //this.$root - указывается на каждый корневой компонет из всех компонентов
        })
        
    }

    removeDOMListeners() { // для удаления слушателей
        
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)

            this.$root.off(listener, this[method])
        })
    }

    
}

// input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
} // приватная функция