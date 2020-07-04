const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', () => {
        recipeTitle = card.querySelector('.card__title p').innerHTML
        window.location.href = `/recipe?title=${recipeTitle}`
    })
}