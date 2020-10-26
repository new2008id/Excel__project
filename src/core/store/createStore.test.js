import {createStore} from './createStore'

const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === 'ADD') {
        return {
            ...state,
            count: state.count + 1
        }
    }
    return state
}

describe('createStore: ', () => {
    let store
    let handler

    beforeEach(() => {
        store = createStore(reducer, initialState)
        handler = jest.fn()
    })

    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).not.toBeUndefined()
    })

    test('should return object as a state', () => {
        expect(store.getState()).toBeInstanceOf(Object) // он должен быть объектом
    })

    test('should return default state', () => {
        expect(store.getState()).toEqual(initialState) // он должен быть объектом
    })

    test('should change state if action exists', () => {
        store.dispatch({type: 'ADD'})
        expect(store.getState().count).toBe(1) // если мы за dispatch ADD, то тогда "1"
    })

    test('should NOT change state if action don\'t exists', () => {
        store.dispatch({type: 'NOT_EXISTING_ACTION'})
        expect(store.getState().count).toBe(0) // НЕ должен изменяться и принимать состояние "0"
    })

    test('should call subscriber function', () => {
        store.subscribe(handler) // условный шпион, который можно тестировать

        store.dispatch({type: 'ADD'})

        expect(handler).toHaveBeenCalled() // проверяем, на то, что метод вызывался
        expect(handler).toHaveBeenCalledWith(store.getState()) // с чем вызывался этот handler
    })

    test('should NOT call sub if unsubscribe', () => {
        const sub = store.subscribe(handler) // получаем подписку

        sub.unsubscribe()
        
        store.dispatch({type: 'ADD'})

        expect(handler).not.toHaveBeenCalled() // проверяем, на то, что метод вызывался
    })

    test('should dispatch in async way', () => { // testing async
        return new Promise(resolve => {
            setTimeout(() => {
                store.dispatch({type: 'ADD'})
            }, 500)

            setTimeout(() => {
                expect(store.getState().count).toBe(1)
                resolve()
            }, 1000)
        })
    })
})