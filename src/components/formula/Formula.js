import {ExcelComponent} from '@core/ExcelComponent'
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula' // статическое поле 
    // используем именно статическое поле, чтобы иметь доступ без инстанса к классу
    // позволит сделать полезную работу
    // Будет идти корневым классом для блока

    constructor($root, options) {
        super($root, { // объектом буду передавать, опции для функции
            name: 'Formula', // обязательный параметр, он определяет, где произошла ошибка, что вообще идёт не так
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })

        this.$on('table:input', $cell => {
            this.$formula.text($cell.text())
        })
    }

    onInput(event) {
         
        this.$emit('formula:input', $(event.target).text()) // nameComponent:nameListeners
        // trim удаляет лишние пробелы
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']

        if (keys.includes(event.key)) {
            event.preventDefault()

            this.$emit('formula:done')
        }
    }

}