let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let mode = "draw"

window.addEventListener("load", resize_canvas)
window.addEventListener("resize", resize_canvas)

function resize_canvas() {
    canvas.height = window.innerHeight - 0.32 * (window.innerHeight);
    canvas.width = window.innerWidth - 0.1 * (window.innerWidth);
}

// Actual Mouse Position
function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Drawing
let is_drawing = false

// Brush Settings
let brush_size
let brush_color
let brush_type = "round"

function start_drawing(event) {
    brush_size = document.getElementById("brush_size").value
    brush_color = document.getElementById("brush_color").value
    is_drawing = true
    draw(event)
}

function stop_drawing() {
    is_drawing = false
    ctx.beginPath()
}

function draw(event) {

    if (!is_drawing) return;

    // Mouse Positions
    let mouse_pos = getMousePos(event)

    // Brush Settings
    ctx.lineWidth = brush_size
    ctx.lineCap = brush_type
    ctx.strokeStyle = brush_color

    if (mode === "draw")
        ctx.globalCompositeOperation = "source-over";
    // else Erase 
    else
        ctx.globalCompositeOperation = "destination-out";

    // Move Brush
    ctx.lineTo(mouse_pos.x, mouse_pos.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mouse_pos.x, mouse_pos.y);
}

canvas.addEventListener("mousedown", start_drawing)
    // V even if the cursor left the canvas we still want to detect a mouse up
document.addEventListener("mouseup", stop_drawing)
canvas.addEventListener("mousemove", draw)

// Draw Erase Mode
// Highlight Brush / Eraser
let eraser_text = document.getElementById("eraser_text")
let eraser = document.getElementById("eraser")
eraser.addEventListener("click", () => {
    if (mode === "erase") return;

    mode = "erase"
    brush_text.classList.toggle("active")
    eraser_text.classList.toggle("active")
})

let brush_text = document.getElementById("brush_text")
let pen = document.getElementById("brush")
pen.addEventListener("click", () => {
    if (mode === "draw") return;

    mode = "draw"
    brush_text.classList.toggle("active")
    eraser_text.classList.toggle("active")
})


// Brush Type Toggler
let brush_type_btn = document.getElementById("brush_type")

// Highlight current brush type
let round = document.getElementById("round")
let square = document.getElementById("square")

brush_type_btn.addEventListener("click", () => {
    brush_type = brush_type === "round" ? "square" : "round";
    round.classList.toggle("active")
    square.classList.toggle("active")
})

// Clear Canvas
let clear_btn = document.getElementById("clear")

clear_btn.addEventListener("click", clear_canvas);

function clear_canvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// Download : right click --> save as 
// let download_btn = document.getElementById("download")

// download_btn.addEventListener("click", () => {
//     let img = canvas.toDataURL("image/png")
//     document.write('<img src="' + img + '"/>')
// })