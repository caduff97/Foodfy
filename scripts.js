const modalOverlay = document.querySelector('.modalOverlay')
const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')
const closeModal = modal.querySelector('p')

for (let card of cards) {
    card.addEventListener('click', () => {
        srcImg = card.querySelector('img').getAttribute('src')
        altImg = card.querySelector('img').getAttribute('alt')
        cardTitle = card.querySelector('.card__title p').innerHTML
        cardAuthor = card.querySelector('.card__author p').innerHTML
        modal.querySelector('img').setAttribute('src', srcImg)
        modal.querySelector('img').setAttribute('alt', altImg)
        modal.querySelector('h1').innerHTML = cardTitle
        modal.querySelector('h2').innerHTML = cardAuthor
        modalOverlay.classList.add('active')

    })
}

closeModal.addEventListener('click', () => {
    modalOverlay.classList.remove('active')
    modal.querySelector('img').setAttribute('src', "")
    modal.querySelector('img').setAttribute('alt', "")
    modal.querySelector('h1').innerHTML = ""
    modal.querySelector('h2').innerHTML = ""
})