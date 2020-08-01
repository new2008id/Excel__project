import {ExcelComponent} from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize } from './table.functions'

export class Table extends ExcelComponent {
    static className = 'excel__table' // статическое поле 
    // используем именно статическое поле, чтобы иметь доступ без инстанса к классу
    // позволит сделать полезную работу
    // Будет идти корневым классом для блока

    constructor($root) {
        super($root, {
            listeners: ['mousedown'] 
        }) 
    }

    toHTML() {
        return createTable(20)
    }

    // onClick() {
    //     console.log('click');
    // }

    onMousedown(event) {
        // console.log('mousedown', event.target.getAttribute('data-resize')); универсальный способ получения атрибутов, которые вообще есть
        // console.log(event.target.dataset); // удобная конструкция для data-атрибутов
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }

    // onMousemove() { // данное событие описывает движение мыши
    //     console.log('mousemove');
    // } // семантически описывает, что вообще должено происходить

    // onMouseup() { // поднимает мышку
    //     console.log('mouseup');
    // }
}

// 24 msScripting
// 415 msRendering

// 290 msScripting
// 3961 msRendering