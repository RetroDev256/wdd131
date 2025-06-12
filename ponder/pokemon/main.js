const pokemon_name = document.getElementById("name");
const pokemon_ability = document.getElementById("ability");
const pokemon_image = document.getElementById("ditto");

let image_1;
let image_2;

let shiny = false;
pokemon_image.addEventListener("click", () => {
    shiny = !shiny;
    pokemon_image.src = shiny ? image_2 : image_1;
});

async function getDittoJson() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/staravia");
    return await response.json();
}

async function main() {
    const info = await getDittoJson();

    image_1 = info.sprites.front_default;
    image_2 = info.sprites.other.home.front_shiny;

    pokemon_name.textContent = info.name;
    pokemon_ability.textContent = info.abilities[0].ability.name;
    pokemon_image.src = image_1;
}

main();