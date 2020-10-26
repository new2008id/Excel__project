import {Page} from '@core/Page'
import {createStore} from '@core/store/createStore' 
import {rootReducer} from '@/redux/rootReducer'
import {debounce, storage} from '@/core/utils'
import {Excel} from '../components/excel/excel'
import {Header} from '../components/header/header'
import {Toolbar} from '../components/toolbar/Toolbar'
import {Formula} from '../components/formula/Formula'
import {Table} from '../components/table/Table'
import { normalizeInitialState } from '../redux/initialState'

// function будет формировать по определённому шаблону название
function storageName(param) { 
    return 'excel:' + param
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()

        // описываю состояние приложения
        const state = storage(storageName(params))
        const initialState = normalizeInitialState(state)
        const store = createStore(rootReducer, initialState)

        const stateListener = debounce(state => { // работает внезависимости от представления
            storage(storageName(params), state)
        }, 300) 

        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.destroy()
    }
}