function nameFile(address) {
    var file = address.substring(address.lastIndexOf("/") + 1)
    return file
}

function titleMark() {
    titles = document.querySelector(".menu").querySelectorAll("a")
    section = document.location.pathname
    
    for (var title of titles) {
        if (section.substring(1,7) == nameFile(title.href).substring(6,0)) {
            title.setAttribute("id", "current-page")
        }
    }
}

titleMark()