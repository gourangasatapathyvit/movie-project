let searchinput = document.getElementById('default-search')
let searchRecomendContainer = document.getElementById('search-recomend-container')
let autoCommBox = document.querySelector('.autocom-box')

const btn = document.querySelector("button.sidebar-open")
const menu = document.querySelector(".menu-resposive")
const buttonOpen = document.querySelector(".btn-open")
const buttonClose = document.querySelector(".btn-close")
const formSearch = document.querySelector(".search-form")


const buttonMenu = document.querySelector("button.search-menu")
const inputMethodContainer = document.querySelector(".search-section")
const inputMethod = document.getElementById("default-search")
const navEle = document.getElementById("navEle")

function onSearchKeypress() {

    searchinput.addEventListener('click', (e) => {
        fetchList(e.target.value)
    })

    searchinput.onkeyup = (e) => {
        autoCommBox.classList.remove('remove-display')
        autoCommBox.classList.add("enable-display")
        fetchList(e.target.value)
    }

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden")
        formSearch.classList.toggle("hidden")
        buttonOpen.classList.toggle("hidden")
        buttonClose.classList.toggle("hidden")
    })

    window.addEventListener('click', function (e) {

        if (!document.getElementById('default-search').contains(e.target)) {
            autoCommBox.classList.add('remove-display')
            autoCommBox.classList.remove('enable-display')
        }
        else {
            autoCommBox.classList.add("enable-display")
            autoCommBox.classList.remove('remove-display')
        }
    })

    window.addEventListener('scroll', (e) => {
        autoCommBox.classList.add('remove-display')
        autoCommBox.classList.remove('enable-display')
        btn.classList.remove('hidden')

        inputMethodContainer.classList.add('relative', 'displayController')
        inputMethodContainer.classList.remove('absolute', 'w-full', 'left-0', 'block')
    })

    buttonMenu.addEventListener("click", (e) => {
        btn.classList.add('hidden')
        inputMethodContainer.classList.remove('relative', 'displayController', 'hidden')
        inputMethodContainer.classList.add('absolute', 'w-full', 'left-0', 'block')
        inputMethod.classList.add('relative', 'block', 'w-full')
    })

}

function colorChange() {
    let urlAttributes = window.location.href.substring('7').split('/')[1].toLocaleLowerCase()
    let liLists = navEle.getElementsByTagName("li")

    if (urlAttributes === '') {
        urlAttributes = 'home'
    }

    for (const property of liLists) {
        let title = property.textContent.trim().toLocaleLowerCase().split(' ').join('')

        if (urlAttributes === title) {
            property.classList.add('text-yellow-500')
        }
        else {
            property.classList.remove('text-yellow-500')
        }
    }
}

function fetchList(value) {
    fetch(`${window.parent.location.origin}/test?name=${value}`)
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
                    listAnchorLink.style.display = 'block'
                    listAnchorLink.style.width = '100%'
                    listAnchorLink.style.height = '100%'

                    listAnchorLink.setAttribute('href', `${window.parent.location.origin}/more-info/${eachData._id}`)
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

export { onSearchKeypress, colorChange }