import {$} from '@core/dom'

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        const sideProp = type === 'col' ? 'bottom' : 'right'
        let value
    
        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })
    
        // console.log(type); // выводит или resize col или resize row
        // заранее получаем cells
    
        document.onmousemove = e => {
            if (type === 'col') {
                const delta = e.pageX - coords.right
                value = coords.width + delta
                $resizer.css({
                    right: -delta + 'px'
                })
                // $parent.css({ width: value + 'px'})
                // cells.forEach(el => el.style.width = value + 'px')
            } else {
                const delta = e.pageY - coords.bottom
                value = coords.height + delta
                $resizer.css({
                    bottom: -delta + 'px'
                })
    
            }
            // делаем запрос к DOM-дереву, что получить все существующие ячейки в таблице
            // console.log(e.pageX); // отвечает за текущее положение курсора, теперь можем высчитать дельту
            // this.$root.findAll(`[data-col="${$parent.data.col}"]`) // получаем псевдо-массив
            // немного оптимизировали процесс, вместо document.querySelectorAll
        }
    
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
    
            if (type === 'col') {
                $parent.css({
                    width: value + 'px'
                })
                $root.findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach(el => el.style.width = value + 'px')
            } else {
                $parent.css({
                    height: value + 'px'
                })
            }

            resolve({
                value,
                type,
                // id: type === 'col' ? $parent.data.col : $parent.data.row
                id: $parent.data[type]
            })
    
            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    })
}