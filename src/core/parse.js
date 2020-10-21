export function parse(value = '') {
    if (value.startsWith('=')) { // ** проверяем, что строка начинается с '='
        try {
            return eval(value.slice(1)) // ** функция eval в нативном JS
        } catch (e) {
            return value
            // console.warn('Skipping parse error', e.message)
        }

    }
    return value
}