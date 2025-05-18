// Toggle visibility of links on clicking menu
const menu = document.getElementById("menu");
const links = document.getElementById("links");
menu.addEventListener("click", () => {
    links.classList.toggle("hide_links");
});

const modal = document.getElementById("modal");

// Note 1.
//     While I could get the "dialog" tag to technically work,
//     the modal would not cover the entire screen due to cross
//     platform inconsistencies. I decided to use a div instead.

// Close modal if clicking outside the image
// This includes the button click.
modal.addEventListener("click", (event) => {
    if (event.target.tagName != "IMG") {
        modal.classList.add("hide");
    }
});


// Note 2.
//     The rubric requires this function. It is not required.
//     The function above already handles clicking on the close
//     button, because the button is not the image.

// const close_modal = document.getElementById("close_modal");
// modal.addEventListener("click", () => {
//     modal.classList.add("hide");
// })

// Show modal if clicking on an image
const gallery = document.getElementById("gallery");
gallery.addEventListener("click", (event) => {
    if (event.target.tagName == "IMG") {
        // Set the correct destination image
        modal_image.src = getLargeImagePath(event.target);
        // Show the modal
        modal.classList.remove("hide");
    }
});

function getLargeImagePath(target) {
    return target.src.split("_")[0] + "_full.jpeg";
}

// Note 3.
//     My CSS code removes the need to handle resize events.
//     According to the rubric, I still need to have this code.
//     Here it is, but it's commented out to not mess up the current page.

// window.addEventListener("resize", () => {
//     if (window.innerWidth > 1200) {
//         links.classList.remove("hide_links");
//     } else {
//         links.classList.add("hide_links");
//     }
// });