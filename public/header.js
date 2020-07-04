function nameFile(address) {
    var file = address.substring(address.lastIndexOf("/") + 1)
    return file
}

function titleMark() {
    titles = document.querySelector(".menu").querySelectorAll("a")
    page = nameFile(document.location.href)

    for (var title of titles) {
        if (page.substring(6,0) == nameFile(title.href).substring(6,0) ) {
            title.setAttribute("id", "current-page")
        } else if (page == "recipe" && nameFile(title.href) == "recipes") {
            title.setAttribute("id", "current-page")
        }
    }
}

titleMark()