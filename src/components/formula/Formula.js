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
            subscribe: ['currentText'],
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
            this.$formula.text($cell.data.value)
        })

        // this.$on('table:input', $cell => {
        //     this.$formula.text($cell.text())
        // })

        // this.$subscribe(state => { // подписываюсь на обновление
        //     console.log('Formula update', state.currentText);
        //     this.$formula.text(state.currentText)
        // })

        
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(event) {
        const text = $(event.target).text()
        this.$emit('formula:input', text) // nameComponent:nameListeners
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