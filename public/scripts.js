// global variables
let rmButtons, addIngredientButton, addStepButton, titles
const showHideButtons = document.querySelectorAll(".detail_title p")
const recipeCards = document.querySelectorAll('.recipeCard')
const chefCards = document.querySelectorAll(".chefCard")
const links = document.querySelector(".links")
const pagination = document.querySelector(".pagination")


// call necessary functions when open page
cardClick()
populateButtons()
showHide()
if (links) titleMark()
if (pagination) createPagination()


// === ADMIN PAGE FUNCTIONS ===

// populates buttons and include eventlistener
function populateButtons() {
    addIngredientButton = document.querySelector(".add-ingredient")
    addStepButton = document.querySelector(".add-step")
    rmButtons = document.getElementsByClassName("rm-item")
    
    if (addIngredientButton || addStepButton) {
        addIngredientButton.addEventListener("click", addIngredient)
        addStepButton.addEventListener("click", addStep)
    }
    

    if(rmButtons) {
        for (var x=0; x<rmButtons.length; x++) {
            rmButtons[x].addEventListener("click", rmItem)
        }
    }
    
}

// function that adds ingredient field
function addIngredient() {

    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);
    
    if (newField.children[0].value == "") {
        return alert("Preencha o ingrediente anterior.");
    } 
    
    newField.children[0].value = "";
    ingredients.appendChild(newField);
    populateButtons()
}

// function that adds preparation field
function addStep() {
    
    const steps = document.querySelector("#preparation");
    const fieldContainer = document.querySelectorAll(".step");

    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);

    if (newField.children[0].value == "") return alert("Preencha o passo anterior.");

    newField.children[0].value = "";
    steps.appendChild(newField);
    populateButtons()
}

// function that removes fields
function rmItem(e) {
    e.preventDefault();

    var item = this.parentNode;

    if (item.parentNode.children.length > 1) {
        item.parentNode.removeChild(item);
    } else {
        alert("Não é possível remover o único item")
    }

}




// === USER PAGE FUNCTIONS ===

// interaction on the click of recipe card
function cardClick() {
    for (let card of recipeCards) {
        card.addEventListener("click", () => {
            const recipeId = card.querySelector(".recipe_id").innerHTML
            window.location.href = `/recipe/${recipeId}`
        })
    }

    for (let card of chefCards) {
        
        card.addEventListener("click", () => {
            const chefName = card.querySelector(".chef_name p").innerHTML
            window.location.href = `/recipes/search?filter=${chefName}`
        })
    }
}

// function that highlights the header title
function titleMark() {
    const titles = links.querySelectorAll("a")
    const currentPage = location.pathname
    const shortCurrentPage = location.pathname.slice(0, -(nameFile(currentPage).lastName.length +1))

    for (title of titles) {
        const href = title.href
        const host = href.substring(href.indexOf(location.host) + location.host.length)
        
        if(currentPage.includes(host) || shortCurrentPage == host.substring(0,7) || shortCurrentPage.includes(host.substring(0,11)) ) {
            title.setAttribute("id", "current-page")
        }
    }
}

// function of show/hide buttons
function showHide() {
    for (let button of showHideButtons) {

        button.addEventListener('click', () => {
     
           const content = button.parentNode.parentNode.querySelector(".detail_content")
     
           content.classList.toggle("close-active")
     
           if (content.classList.contains("close-active")) {
              button.innerHTML = "MOSTRAR"
           } else {
              button.innerHTML = "ESCONDER"
           }
     
        })
     }
}

// pagination function
function paginate(selectedPage, totalPages) {
    
    let pages = [],
    oldPage
    
    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        
        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            
            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(currentPage - 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
    }

    return pages
}

function createPagination() {
    const filter = document.querySelector("input[name='filter']").value
    const page = document.querySelector("input[name='page']").value
    const total = document.querySelector("input[name='total']").value
    const pages = paginate(page, total)

    let elements = ""

    for (let page of pages) {
        if(String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?filter=${filter}&page=${page}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}





// === ANOTHER FUNCTIONS ===

// utilitary function to extract file name of an address
function nameFile(address) {
    var hostLessAddress = address.substring(address.indexOf(location.host) + location.host.length)
    var lastName = address.substring(address.lastIndexOf("/") + 1)
    return {
        lastName,
        hostLessAddress
    }
}