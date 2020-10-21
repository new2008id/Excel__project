// здесь будут храниться action-create
// функции, создающие action для Redux
// Action Creator
import {
    CHANGE_TEXT, 
    CHANGE_STYLES, 
    TABLE_RESIZE, 
    APPLY_STYLE, 
    CHANGE_TITLE
} from './types'

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
} 

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

// value, ids, 
export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
} // потому что применяется один стиль

export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data
    }
}