import {$} from '../core/dom'

export function Loader() {
    // eslint-disable-next-line no-undef
    return $.create('div', 'loader').html(`
    <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    `)
}