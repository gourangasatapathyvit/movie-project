const btn = document.querySelector("button.sidebar-open")
const menu = document.querySelector(".menu-resposive")
const buttonOpen = document.querySelector(".btn-open")
const buttonClose = document.querySelector(".btn-close")

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden")
    formSearch.classList.toggle("hidden", true)
    buttonOpen.classList.toggle("hidden"),
        buttonClose.classList.toggle("hidden")
})

const buttonMenu = document.querySelector("button.search-menu")
const formSearch = document.querySelector(".search-form")

buttonMenu.addEventListener("click", () => {
    formSearch.classList.toggle("hidden")
})
