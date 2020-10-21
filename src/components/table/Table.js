import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import * as actions from '@/redux/actions' 
import { defaultStyles } from '../../constants'
import { parse } from '@core/parse'

// импортирую вообще все, как переменную actions, чтобы они имели объединения


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
        return createTable(20, this.store.getState())
    }
    
    // хранит информацию о выбранных ячейках
    prepare() { // нужен для реализации в компопненте дополнительного функционала
        this.selection = new TableSelection()
    }

    init() {
        super.init() // метод super был вызван, чтобы не вызвать другие базовые состовляющие метода init

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('formula:input', value => {
            this.selection.current
                .attr('data-value', value)
                .text(parse(value))
                // .text(parse(value))
            this.updateTextInStore(value)
        })

        this.$on('formula:done', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })

        // this.$subscribe(state => { // подписываюсь на обновление
        //     console.log('TableState', state)
        // })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell) 
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        console.log('Styles to dispatch', styles);
        this.$dispatch(actions.changeStyles(styles))
        // можно считать её текущие стили

    }

    // onClick() {
    //     console.log('click');
    // }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message);
        }
        
    }

    onMousedown(event) {
        // console.log('mousedown', event.target.getAttribute('data-resize')); универсальный способ получения атрибутов, которые вообще есть
        // console.log(event.target.dataset); // удобная конструкция для data-атрибутов
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {

            const $target = $(event.target)
            if (event.shiftKey) {
                // group
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                // сформировал новый массив по дата-атрибуту по выделенным значениям
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target))
        this.updateTextInStore($(event.target).text())
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