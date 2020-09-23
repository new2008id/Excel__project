// файл, в котором будет храниться логика связанная с Excel таблицей

const CODES = {
    A: 65, 
    Z: 90
}

// function toCell(row, col) { // использую параметр col, чтобы получить индексы ячееек
//     return `<div class="cell" contenteditable data-col="${col}"></div>`
// }

function toCell(row) {
    return function(_, col) {
        return `
            <div 
                class="cell" 
                contenteditable 
                data-col="${col}"
                data-type="cell"
                data-id="${row}:${col}"
            ></div>
        `
    }
}

function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}"> 
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
    // задаю data-col, чтобы присвоить каждой колонке свой индекс
}

function createRow(index, content) { // index определяющий номер этой строчки
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
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

    for(let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCell(row, col)) // изменил метод .map
            .map(toCell(row))
            .join('')
        rows.push(createRow(row + 1, cells))
        
    }


    return rows.join('')
}