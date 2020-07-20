import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula' // статическое поле 
    // используем именно статическое поле, чтобы иметь доступ без инстанса к классу
    // позволит сделать полезную работу
    // Будет идти корневым классом для блока

    constructor($root) {
        super($root, { // объектом буду передавать, опции для функции
            name: 'Formula', // обязательный параметр, он определяет, где произошла ошибка, что вообще идёт не так
            listeners: ['input', 'click']
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onInput(event) {
        console.log(this.$root);
        
        console.log('Formula: onInput ', event.target.textContent.trim()); 
        // trim удаляет лишние пробелы
    }

    onClick() {
        console.log('mk');
        
    }

}