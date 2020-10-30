// ** functions для class DashboardPage
import {storage} from '@core/utils'

function toHTML(key) {
    const model = storage(key) // в этой модели лежат те данные, которые относятся к Excel
    const id = key.split(':')[1]
    return `
        <li class="db__record">
            <a href="#excel/${id}">${model.title}</a>
            <strong>
                ${new Date(model.openedDate).toLocaleDateString()}
                ${new Date(model.openedDate).toLocaleTimeString()}
            </strong>
        </li>
    `
}

// функция будет получать список все ключей, которые содержат созданные таблицы 

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i) // у localStorage получаем соответствующий ключ
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }

    return keys
}

// которая получит все записи в списке

export function createRecordsTable() {
    const keys = getAllKeys()
    if (!keys.length) { // строка будет показана, если keys является пустым
        return `<p>Вы пока не создали ни одной таблицы</p>`
    }

    return `
    <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>
    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
    `
}
