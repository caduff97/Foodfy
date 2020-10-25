const modal = document.querySelector('.modal')
const cards = document.querySelectorAll('.card')

for (let card of cards) {
    card.addEventListener('click', () => {
        recipeId = card.querySelector('.card__id').innerHTML

        console.log(window.location.href)

        window.location.href = `/recipe/${recipeId}`
    })
}