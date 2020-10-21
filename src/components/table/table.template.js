// файл, в котором будет храниться логика связанная с Excel таблицей
import { defaultStyles } from "../../constants"
import { parse } from "../../core/parse"
import { toInlineStyles } from "../../core/utils"

const CODES = {
    A: 65, 
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) { // будет возвращаться значение ширины
    return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) { // будет возвращаться значение ширины
    return (state[index] || DEFAULT_HEIGHT) + 'px'
}

// function toCell(row, col) { // использую параметр col, чтобы получить индексы ячееек
//     return `<div class="cell" contenteditable data-col="${col}"></div>`
// }

function toCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`
        const width = getWidth(state.colState, col)
        const data = state.dataState[id]
        const styles = toInlineStyles({
            ...defaultStyles, // записываю style default
            ...state.stylesState[id] // записываю стили из Store
        })
        // const styles = toInlineStyles(state.stylesState[id])
        // 'font-weight = bold; text-decoration: underline;'
        return `
            <div 
                class="cell" 
                contenteditable 
                data-col="${col}"
                data-type="cell"
                data-id="${id}"
                data-value="${data || ''}"
                style="${styles}; width: ${width}"
            >${parse(data) || ''}</div> 
        ` // ${data || ''} выведет данные или пустую строчку
    }
}

function toColumn({col, index, width}) { // {col, index, width} - диструктуризация объектов
    return `
        <div 
            class="column" 
            data-type="resizable" 
            data-col="${index}" 
            style="width: ${width}"
            > 
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
    // задаю data-col, чтобы присвоить каждой колонке свой индекс
}

function createRow(index, content, state) { // index определяющий номер этой строчки
    const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
    const height = getHeight(state, index)
    return `
        <div 
            class="row" 
            data-type="resizable" 
            data-row="${index}"
            style="height: ${height}"
        >
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

function withWidthFrom(state) {
    return function(col, index) {
        return {
            col, index, width: getWidth(state.colState, index)
        }

    }
}

export function createTable(rowsCount = 15, state = {}) {
    console.log(state);
    // CODES.A // magic number или не определенное число
    const colsCount = CODES.Z - CODES.A + 1 
    
    const rows = []

    const cols = new Array(colsCount)
        .fill('') // заполняем пустой строчкой
        .map(toChar) // преобразовываю к символам
        .map(withWidthFrom(state))
        .map(toColumn)
        // переписал код на функцию withWidthFrom
        // .map((col, index) => { 
        //     const width = getWidth(state.colState, index)
        //     return toColumn(col, index, width) // width
        //     })    // преобразовываю всё к шаблону, передаю функцию, как референс
        .join('') // привожу массив к строке, вызываю метод join, с пустой строкой
        
    rows.push(createRow(null, cols, {})) // формируем шапку экселя, здесь будут описаны заголовки

    for(let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            // .map((_, col) => toCell(row, col)) // изменил метод .map
            .map(toCell(state, row))
            .join('')
        rows.push(createRow(row + 1, cells, state.rowState))
        
    }


    return rows.join('')
}