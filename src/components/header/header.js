import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
    static className = 'excel__header' // статическое поле 
    // используем именно статическое поле, чтобы иметь доступ без инстанса к классу
    // позволит сделать полезную работу
    // Будет идти корневым классом для блока

    toHTML() {
        return `
            <input type="text" class="input" value="Новая таблица" />
            <div>
                <div class="button">
                    <i class="material-icons">delete</i>
                </div>
                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>
            </div> 
        `
    }
}