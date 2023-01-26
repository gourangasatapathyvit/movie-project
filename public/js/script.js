// https://docs.google.com/spreadsheets/d/1G1xN6bCLPB4cRckpqe-tI9hXcovig-1DmiGY_--Bqz0/edit#gid=0

import { onSearchKeypress } from './common.js'


let tableView = document.getElementById('table-view')
let listView = document.getElementById('list-view')

let cardBox = document.querySelector('.card-box-container')
let listBox = document.querySelector('.list-box-container')
listBox.classList.add('remove-display')


tableView.addEventListener('click', () => {
    cardBox.classList.add("card-box-container")
    cardBox.classList.remove('remove-display')
    listBox.classList.add('remove-display')
    listBox.classList.remove('enable-display')
})

listView.addEventListener('click', () => {
    cardBox.classList.add('remove-display')
    cardBox.classList.remove('card-box-container')
    listBox.classList.add('enable-display')
})

onSearchKeypress();

document.getElementById("menu-bar").addEventListener('click', () => {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
    document.getElementById("menu-bg").style.position = 'fixed'
    document.getElementById("menu").style.position = 'fixed'

})