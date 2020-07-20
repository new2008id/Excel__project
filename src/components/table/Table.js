import {ExcelComponent} from '@core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
    static className = 'excel__table' // статическое поле 
    // используем именно статическое поле, чтобы иметь доступ без инстанса к классу
    // позволит сделать полезную работу
    // Будет идти корневым классом для блока

    toHTML() {
        return createTable(20)
    }
}