// Pure function

import { 
    CHANGE_TEXT, 
    CHANGE_STYLES, 
    TABLE_RESIZE, 
    APPLY_STYLE, 
    CHANGE_TITLE 
} from './types'

export function rootReducer(state, action) {
    // console.log(action); //определил resize col || row
    let field
    let val
    // console.log('Action: ', action);
    switch (action.type) { // aciton.type указывает поле, которое нужно изменить
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'  
            return {...state, [field]: value(state, field, action)} // id, value(px)
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                currentText: action.data.value, 
                [field]: value(state, field, action)
            }
        case CHANGE_STYLES: 
            // меняем стили, которые прилетют из ячейки
            return {...state, currentStyles: action.data} 
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state, 
                [field]: val, 
                currentStyles: {...state.currentStyles, ...action.data.value} 
            }
        case CHANGE_TITLE:
            return {...state, title: action.data}
        
        default: return state
    } 
    return state
}


function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val

}