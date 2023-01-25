// https://docs.google.com/spreadsheets/d/1G1xN6bCLPB4cRckpqe-tI9hXcovig-1DmiGY_--Bqz0/edit#gid=0

let searchinput = document.getElementById('search-input')
let tableView = document.getElementById('table-view')
let listView = document.getElementById('list-view')
let searchRecomendContainer = document.getElementById('search-recomend-container')

let cardBox = document.querySelector('.card-box-container')
let autoCommBox = document.querySelector('.autocom-box')
let listBox = document.querySelector('.list-box-container')
listBox.classList.add('remove-display')


window.addEventListener('click', function (e) {

    if (!document.getElementById('search-input').contains(e.target)) {
        autoCommBox.classList.add('remove-display')
        autoCommBox.classList.remove('enable-display')
    }
    else {
        autoCommBox.classList.add("enable-display")
        autoCommBox.classList.remove('remove-display')
    }
})

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


searchinput.onkeyup = (e) => {

    fetch(`test/${e.target.value}`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => {
            searchRecomendContainer.replaceChildren()
            if (res.length > 0) {

                for (const eachData of res) {
                    let listCard = document.createElement('li')
                    let listAnchorLink = document.createElement('a')

                    listCard.classList.add('list-items')
                    listCard.style.cursor = "pointer"
                    listAnchorLink.style.textDecoration = 'none'


                    listAnchorLink.setAttribute('href', `more-info/${eachData._id}`)
                    listAnchorLink.textContent = eachData.title
                    listCard.appendChild(listAnchorLink)
                    searchRecomendContainer.appendChild(listCard)
                }
            }
            else {
                let listCard = document.createElement('li')
                listCard.classList.add('list-items')
                listCard.style.cursor = "pointer"
                listCard.textContent = 'nothing found'
                searchRecomendContainer.appendChild(listCard)
            }
        })
}