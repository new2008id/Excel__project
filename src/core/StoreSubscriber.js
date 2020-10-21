import {isEqual} from '@core/utils'

export class StoreSubscriber {
    constructor (store) {
        this.store = store // публичная переменная, инстанс данного класса
        this.sub = null // будет являться подпиской
        this.prevState = {} // для хранения предыдущего состояния
    }

    // здесь будут 2 метода
    // subscribeComponents - будет принимать список компонентов, которые нужно подписать
    // unsubscribeFromStore - метод позволяющий отписываться от всех в store
    subscribeComponents(components) {
        this.prevState = this.store.getState() // ещё до того момента, когда получили изменения

        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach(component => {
                        if (component.isWatching(key)) {
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)

                        }
                    })
                }
            })

            this.prevState = this.store.getState()
        })
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe()
    }
}