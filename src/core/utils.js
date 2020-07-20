// этот концепт называется Pure Functions
// то есть эти функции не взаимодействуют с глобальными переменными
// они реагируют только на входящие параметры и возвращают определённый результат

export function capitalize(string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.charAt(0).toUpperCase() + string.slice(1) // метод позволяющий получить символ по индексу


}