import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'

export class Table extends ExcelComponent {
    static className = 'excel__table' // статическое поле 
    // используем именно статическое поле, чтобы иметь доступ без инстанса к классу
    // позволит сделать полезную работу
    // Будет идти корневым классом для блока

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(20)
    }

    prepare() { // нужен для реализации в компопненте дополнительного функционала
        this.selection = new TableSelection()
    }

    init() {
        super.init() // метод super был вызван, чтобы не вызвать другие базовые состовляющие метода init

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell) 
    }

    // onClick() {
    //     console.log('click');
    // }

    onMousedown(event) {
        // console.log('mousedown', event.target.getAttribute('data-resize')); универсальный способ получения атрибутов, которые вообще есть
        // console.log(event.target.dataset); // удобная конструкция для data-атрибутов
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        } else if (isCell(event)) {

            const $target = $(event.target)
            if (event.shiftKey) {
                // group
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                // сформировал новый массив по дата-атрибуту по выделенным значениям
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }

    }

    onKeydown(event) { // какие кнопки будут обрабатываться здесь
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = event // использую диструктуризацию

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault() // отменили поведение по умолчанию
            const id = this.selection.current.id(true)

            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
   
    // input: 0, 3
    // output: [0, 1, 2, 3]

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