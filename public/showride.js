const buttons = document.querySelectorAll(".detail__title p")

for (let button of buttons) {

   button.addEventListener('click', () => {

      const content = button.parentNode.parentNode.querySelector(".detail__content")

      content.classList.toggle("close-active")

      if (content.classList.contains("close-active")) {
         button.innerHTML = "MOSTRAR"
      } else {
         button.innerHTML = "ESCONDER"
      }

   })
}

