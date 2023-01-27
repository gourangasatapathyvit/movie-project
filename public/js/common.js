let searchinput = document.getElementById('search-input')
let searchRecomendContainer = document.getElementById('search-recomend-container')
let autoCommBox = document.querySelector('.autocom-box')

function onSearchKeypress() {

    searchinput.addEventListener('click', (e) => {
        fetchList(e.target.value)
    })

    searchinput.onkeyup = (e) => {
        fetchList(e.target.value)
    }

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

    window.addEventListener('scroll', (e) => {
        document.getElementById("menu-bar").classList.remove("change");
        document.getElementById("nav").classList.remove("change");
        document.getElementById("menu-bg").classList.remove("change-bg");
        document.getElementById("menu-bg").style.position = 'absolute'
        document.getElementById("menu").style.position = 'absolute'
    })

    document.getElementById("menu-bar").addEventListener('click', () => {
        document.getElementById("menu-bar").classList.toggle("change");
        document.getElementById("nav").classList.toggle("change");
        document.getElementById("menu-bg").classList.toggle("change-bg");
        document.getElementById("menu-bg").style.position = 'fixed'
        document.getElementById("menu").style.position = 'fixed'
    
    })

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

export { onSearchKeypress }