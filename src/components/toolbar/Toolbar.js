import { createToolbar } from './toolbar.template'
import {$} from '@core/dom'
import { ExcelStateComponent } from '../../core/ExcelStateComponent'
import { defaultStyles } from '../../constants'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar' // статическое поле 
    // используем именно статическое поле, чтобы иметь доступ без инстанса к классу
    // позволит сделать полезную работу
    // Будет идти корневым классом для блока

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options,
        })
    }

    // продумать начальное состояние prepare()
    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state) // Относительно state будет формироваться шаблон
    }

    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        $target.addClass('active')
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value) // при единичном клике, выбирается всего один стиль
            
            // ** если данные изменились в store мануально это делать уже не нужно
            // const key = Object.keys(value)[0] // забираю 0 элемент
            // this.setState({[key]: value[key]})
        }
    }

    
}