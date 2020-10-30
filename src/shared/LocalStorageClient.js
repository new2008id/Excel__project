import {storage} from '@core/utils'

// function будет формировать по определённому шаблону название
function storageName(param) { 
    return 'excel:' + param
}

export class LocalStorageClient { // class, который будет позволять взаимодействовать с StateProcerssor
    constructor(name) {
        this.name = storageName(name)
    }

    save(state) {
        storage(this.name, state)
        return Promise.resolve()
    }

    get() {
        return new Promise(resolve => {
            const state = storage(this.name)

            setTimeout(() => {
                resolve(state)
            }, 2500)
        })
    }
}