import {$} from '../dom'
import {ActiveRoute} from './ActiveRoute'
import { Loader } from '../../components/Loader'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not provided in Router')
        }

        //объявил Dom-ноду чтобы у неё были необходимые методы
        this.$placeholder = $(selector)
        this.routes = routes

        this.loader = new Loader()

        this.page = null

        this.changePageHandler = this.changePageHandler.bind(this) 
        // ** привязываю метод к текущему контексту
      
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler) // добавили прослушку событий
        this.changePageHandler()
    }

    async changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }
        this.$placeholder.clear().append(this.loader)
        
        const Page = ActiveRoute.path.includes('excel') 
            ? this.routes.excel 
            : this.routes.dashboard

        this.page = new Page(ActiveRoute.param)

        const root = await this.page.getRoot() // получаем root и ждём пока он завершится

        this.$placeholder.clear().append(root)

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}