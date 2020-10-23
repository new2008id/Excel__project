import { defaultStyles, defaultTitle } from '../constants'
import {clone} from '@core/utils'

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, // {'0:1' : 'fdajkl;j'} объект, который хранит значения текущих ячеек
    stylesState: {}, // {'1': {}}
    currentText: '', // поле отвечает за введённый текст в ячейке (Formula или ячейка)
    currentStyles: defaultStyles,
    openedDate: new Date().toJSON() 
 }
// если в starage есть excel-state, то состояние экспортируется, как начальное, 
// а иначе export object defaultState

const normalize = state => ({
    ...state, 
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}