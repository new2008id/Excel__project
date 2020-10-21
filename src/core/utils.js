// этот концепт называется Pure Functions
// то есть эти функции не взаимодействуют с глобальными переменными
// они реагируют только на входящие параметры и возвращают определённый результат

export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1) // метод позволяющий получить символ по индексу


}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index)
}

export function storage(key, data = null) { // будет помогать взаимодействовать с Local Storage
    // делаю как getter and setter одновременно
    if (!data) { // если нет данных, то парсим то, что есть в Local Storage
        return JSON.parse(localStorage.getItem(key))
    }
    localStorage.setItem(key, JSON.stringify(data))
}   

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }
    return a === b
}

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles) // получаем ключи объекта
        .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
        .join(';')
}

export function debounce(fn, wait) { // функция для оптимизации кода
    let timeout
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            // eslint-disable-next-line
            fn.apply(this, args)
        }
        clearTimeout(timeout) // будем чистить timeout и будем заново его запускать

        timeout = setTimeout(later, wait)
    }
}