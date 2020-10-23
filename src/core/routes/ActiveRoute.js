// * class будет отвечать за взаимодействия с активным routes
// * здесь будет функционал позволяющий организовать программную навигацию
export class ActiveRoute {
    static get path() {
        // будет возвращать текущий путь, который введён в URL
        return window.location.hash.slice(1)
    }

    static get param() {
        return ActiveRoute.path.split('/')[1]
    }

    static navigate(path) {
        window.location.hash = path
    }

}