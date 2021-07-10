let footer_date = document.getElementById("footer_date")
footer_date.innerHTML += new Date().getFullYear()

// Light Dark Mode
let mode_toggler = document.getElementById("light_dark")
let curr_mode = "dark"
let active_color = "#30E3CA"
let body = document.body

let style_sheet = document.styleSheets

mode_toggler.addEventListener("click", () => {
    body.classList.toggle("light")
    body.classList.toggle("dark")

    curr_mode = curr_mode === "dark" ? "light" : "dark"


    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("btn_white")
        buttons[i].classList.toggle("btn_black")
    }
})

let buttons = document.querySelectorAll(".btn")