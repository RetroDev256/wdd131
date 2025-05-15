const menu = document.getElementById("menu");
const links = document.getElementById("links");

// Toggle visibility of links on clicking menu
menu.addEventListener('click', () => {
    links.classList.toggle('hide_links');
});

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
