// https://docs.google.com/spreadsheets/d/1G1xN6bCLPB4cRckpqe-tI9hXcovig-1DmiGY_--Bqz0/edit#gid=0

import { onSearchKeypress } from './common.js'


let tableView = document.getElementById('table-view')
let listView = document.getElementById('list-view')

let cardBox = document.querySelector('.card-box-container')
let listBox = document.querySelector('.list-box-container')


window.onload = () => {
    if (localStorage.getItem("viewType") == null || localStorage.getItem("viewType") == undefined) {
        listBox.classList.add('remove-display')
    }
    else if (localStorage.getItem("viewType") == 'tableView') {
        tableViewCaller()
    }
    else {
        listViewCaller()

    }
};


tableView.addEventListener('click', () => {
    tableViewCaller()
})

listView.addEventListener('click', () => {
    listViewCaller()
})

function tableViewCaller() {
    localStorage.setItem("viewType", "tableView");
    listBox.classList.remove('enable-display')
    cardBox.classList.remove('remove-display')
    listBox.classList.add('remove-display')
    cardBox.classList.add("card-box-container")
}

function listViewCaller() {
    localStorage.setItem("viewType", "listView");
    cardBox.classList.remove('card-box-container')
    listBox.classList.remove('remove-display')
    cardBox.classList.add('remove-display')
    listBox.classList.add('enable-display')
}
onSearchKeypress();