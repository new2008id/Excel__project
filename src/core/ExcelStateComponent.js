import {ExcelComponent} from '@core/ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) { 
        // rest для того чтобы все args поступали в таком же формате из ExcelComponent
        super(...args)
    }

    get template() { // getter, что-то буду получать 
        // getter extends ExcelComponent
        return JSON.stringify(this.state, null, 2)

    }

    initState(initialState = {}) { // объект, для того чтобы внедрить начальные состояния 
        this.state = {...initialState}
    }

    setState(newState) { // сюда буду передавать какое-то новое состояние
        this.state = {...this.state, ...newState}
        this.$root.html(this.template)

    }
}