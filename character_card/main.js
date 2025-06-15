const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: 'https://andejuli.github.io/wdd131/character_card/snortleblat.webp',
    attacked() {
        if (this.health >= 20) {
            this.health -= 20;
        } else {
            alert('Character Died');
        }
    },
    levelUp() {
        this.level += 1;
        this.health += 20;
    }
};

function updateCard() {
    const card_image = document.getElementById("image");
    const card_name = document.getElementById("name");
    const stat_class = document.getElementById("class");
    const stat_level = document.getElementById("level");
    const stat_health = document.getElementById("health");

    card_image.src = character.image;
    card_name.textContent = character.name;
    stat_class.textContent = character.class;
    stat_level.textContent = character.level;
    stat_health.textContent = character.health;
}

updateCard();

const attacked = document.getElementById("attacked");
attacked.addEventListener("click", () => {
    character.attacked();
    updateCard();
});

const levelup = document.getElementById("levelup");
levelup.addEventListener("click", () => {
    character.levelUp();
    updateCard();
});

const log = document.getElementById("log");
