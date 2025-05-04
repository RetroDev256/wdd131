// Modifying the DOM

const first_p = document.querySelector("p");
first_p.style.backgroundColor = "#f2c556";

const first_em = document.querySelector("em");
first_em.textContent = "USS Voyager Starship";

const starship_img = document.createElement("img");
starship_img.src = "https://bit.ly/3RfG4sY";
const starship = document.getElementById("starship");
starship.appendChild(starship_img);