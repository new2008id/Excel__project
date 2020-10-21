export class TableSelection {
    static className = 'selected' 

    constructor() {
        this.group = [] // здесь будет пустой массив, где будут храниться выбранные ячейки
        this.current = null
    }

    select($el) { // передаём элемент из DOM-дерева
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el) // и передаём его в push 
        this.current = $el
    }

    
    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group = []
        
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }


    selectGroup($group = []) {
        this.clear()

        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}