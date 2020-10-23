// будет Интерфейсом

export class Page {
    constructor(params) {
        this.params = params // в дальнейшем потребуется для какого-либо Excel
    }

    getRoot() { // возвращает корневой элемент, который можно за append в nody
        throw new Error('Method "getRoot" should be implemented')
    }

    // хук, чтобы понимать когда страница за render и её шаблон готов к инициализации
    // для добавления различных событий
    afterRender() { 
        
    }

    destroy() {
        
    }
}