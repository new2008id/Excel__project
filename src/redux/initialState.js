import {storage} from '@core/utils'
import { defaultStyles, defaultTitle } from '../constants'

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, // {'0:1' : 'fdajkl;j'} объект, который хранит значения текущих ячеек
    stylesState: {}, // {'1': {}}
    currentText: '', // поле отвечает за введённый текст в ячейке (Formula или ячейка)
    currentStyles: defaultStyles
 }
// если в starage есть excel-state, то состояние экспортируется, как начальное, 
// а иначе export object defaultState

const normalize = state => ({
    ...state, 
    currentStyles: defaultStyles,
    currentText: ''
})

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state')) // if парсим localStorage 
    : defaultState