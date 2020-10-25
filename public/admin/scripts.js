function addIngredient() {

    const ingredients = document.querySelector("#ingredients");
    const fieldContainer = document.querySelectorAll(".ingredient");

    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);
    
    if (newField.children[0].value == "") {
        return alert("Preencha o ingrediente anterior.");
    } 
    
    newField.children[0].value = "";
    ingredients.appendChild(newField);
}

document
    .querySelector(".add-ingredient")
    .addEventListener("click", addIngredient);



function rmItem(e) {
    e.preventDefault();

    var item = this.parentNode;

    if (item.parentNode.children.length > 1) {
        item.parentNode.removeChild(item);
    } else {
        alert("Não é possível remover o único item")
    }

}


var rmButtons = document.getElementsByClassName("rm-item")

for (var x=0; x<rmButtons.length; x++) {
    rmButtons[x].addEventListener("click", rmItem)
}



function addStep() {
    
    const steps = document.querySelector("#steps");
    const fieldContainer = document.querySelectorAll(".step");

    const newField = fieldContainer[fieldContainer.length -1].cloneNode(true);

    if (newField.children[0].value == "") return alert("Preencha o passo anterior.");

    newField.children[0].value = "";
    steps.appendChild(newField);
}

document
    .querySelector(".add-step")
    .addEventListener("click", addStep);