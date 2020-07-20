// файл, в котором будет храниться логика связанная с Excel таблицей

const CODES = {
    A: 65, 
    Z: 90
}

function toCell() {
    return `<div class="cell" contenteditable></div>`
}

function toColumn(col) {
    return `
        <div class="column">${col}</div>
    `
}

function createRow(index, content) { // index определяющий номер этой строчки
    return `
        <div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) { // placeholder _ обозначает, то что не используется входящий параметр, но он нужен для доступа к index
    return String.fromCharCode(CODES.A + index) 
}

export function createTable(rowsCount = 15) {
    // CODES.A // magic number или не определенное число
    const colsCount = CODES.Z - CODES.A + 1 
    
    const rows = []

    const cols = new Array(colsCount)
        .fill('') // заполняем пустой строчкой
        .map(toChar) // преобразовываю к символам
        .map(toColumn)// преобразовываю всё к шаблону, передаю функцию, как референс
        .join('') // привожу массив к строке, вызываю метод join, с пустой строкой
        
    rows.push(createRow(null, cols)) // формируем шапку экселя, здесь будут описаны заголовки

    for(let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1, cells))
        
    }


    return rows.join('')
}