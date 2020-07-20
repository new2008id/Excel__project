// утилита, позволяющая проще взаимодействовать с dom-деревом (jquery)

class Dom {
    constructor(selector) {
        // #app
        // this.$$listeners = {} // $$ - означает, что это системная переменная
        this.$el = typeof selector === 'string' 
        ? document.querySelector(selector) 
        : selector
    }

    html(html) { 
        // getter -- если нет параметра, то мы получаем какой-либо контент
        // setter -- если есть параметр, ещё должны вернуть инстанс впоследствии
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this // делается для того, чтобы выполнялся chain
        }
        return this.$el.outerHTML.trim() // trim - удаляет лишние пробелы в начале и в конце 
    }

    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        // this.$$listeners[eventType] = callaback // это объект и не должен быть заново инициализирован, просто добавляет к нему ключ
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    // node - Element is JS 
    append(node) { // сюда append какую-то ноду
        console.log(node);
        if (node instanceof Dom) {
            node = node.$el
        }

        // TEMP polyfil
        if (Element.prototype.append) {
            this.$el.append(node) 
            // append и appendChild работают с нативными элементами, поэтому нужно писать node.$el
        } else {
            this.$el.appendChild(node)
        }
        return this

    }
}

// $('div').html('<h1>Test</h1>').clear() // chain js

//  event.target - тип DOM-ноды
export function $(selector) { // при вызове $ будет создаваться уже текущая нода
    return new Dom(selector) // передаётся в класс DOM
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
        el.classList.add(classes)
    }

    return $(el)

}