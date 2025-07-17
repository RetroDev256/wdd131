// Game variables
let internal_count = BigInt(0);
let internal_rate = BigInt(0);
let worker_list = [];

// Worker initialization list
const worker_init = [{ name: "Cursor", image: "images/cursor.svg", per: 1, cost: 10 }];

// Game elements
const brownie = document.getElementById("brownie");
const brownie_count = document.getElementById("brownie_count");
const per_second = document.getElementById("per_second");
const right_side = document.getElementById("right_side");

// Click event for the cookie - animation and effect
brownie.addEventListener("click", (event) => {
    internal_count += BigInt(1);
    genBrownieParticle(event.clientX, event.clientY);
    updateBrownieStats();
});

// Update the display of the number of brownies
function updateBrownieStats() {
    brownie_count.innerText = `Brownies: ${internal_count}`;
    per_second.innerText = `Rate: ${internal_rate} BPS`;
}

// Updates the display and generation of brownies
function gameTick() {
    worker_list.forEach(workerTick);
    internal_count += internal_rate;
    updateBrownieStats();
}

// Create a worker menu - return handles to fields that must change over time.
function createWorkerMenu(name, image, per, cost) {
    const interface = document.createElement("div");
    interface.className = "worker_interface";
    interface.innerHTML = `
        <img class="worker_img" src="${image}" width="32" />
        <div class="worker_details">
            <div class="worker_name"> ${name} </div>
            <div class="worker_count"> Count: 0 </div>
            <div class="worker_rate"> BPS: 0 </div>
            <div class="worker_total"> Total: 0 </div>
            <div class="worker_cost"> Cost: ${cost} </div>
        </div>
        <div class="worker_buy"> Buy </div>
        <div class="worker_sell"> Sell </div>
    `;

    right_side.appendChild(interface);
    return workerStruct(interface, per, cost);
}

// Generate a structure representing a worker interface
// - all elements and all tracked states.
function workerStruct(interface, per, cost) {
    return {
        root_elem: interface,
        count_elem: interface.querySelector(".worker_count"),
        rate_elem: interface.querySelector(".worker_rate"),
        total_elem: interface.querySelector(".worker_total"),
        cost_elem: interface.querySelector(".worker_cost"),
        buy_elem: interface.querySelector(".worker_buy"),
        sell_elem: interface.querySelector(".worker_sell"),

        per: BigInt(per),
        base: BigInt(cost),
        count: BigInt(0),
        total: BigInt(0),
    };
}

// Creates a brownie particle at the specified location - the brownie particle
// is a visual cue that one (or more) brownies were created. They undergo a 3s
// CSS animation using the fade_out keyframes.
function genBrownieParticle(client_x, client_y) {
    const particle = document.createElement("img");
    particle.src = "images/brownie.webp";
    particle.className = "brownie_particle";

    // Each brownie particle has a random size in the range [64, 80)
    const size = Math.random() * 16 + 64;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Each brownie particle is centered about it's axis
    const centering = size / 2;
    particle.style.left = `${client_x - centering}px`;
    particle.style.top = `${client_y - centering}px`;

    // Each brownie particle has a random orientation
    const rotation = Math.random() * 360;
    particle.style.rotate = `${rotation}deg`;

    // Garbage-collect brownie particles that are no longer visible
    particle.addEventListener("animationend", () => {
        particle.remove();
    });

    // Positioning and animation are handled in CSS
    document.body.appendChild(particle);
}

// Update worker info display - except for the total, handled in workerTick
function updateWorkerDisplay(worker) {
    const cost = workerCost(worker);
    const rate = worker.count * worker.per;
    worker.count_elem.innerText = `Count: ${worker.count}`;
    worker.rate_elem.innerText = `BPS: ${rate}`;
    worker.cost_elem.innerText = `Cost: ${cost}`;
}

// Price of a worker given the base cost and count
function workerCost(worker) {
    // Exponential scaling factor for the price of a worker
    const pow_mul = BigInt(12) ** worker.count;
    const pow_div = BigInt(10) ** worker.count;
    return (worker.base * pow_mul) / pow_div;
}

// Handles brownie production for each worker
function workerTick(worker) {
    worker.total += worker.per * worker.count;
    worker.total_elem.innerText = `Total: ${worker.total}`;
}

// Handles purchasing a single instance of a worker
function workerBuy(worker) {
    const cost = workerCost(worker);
    if (internal_count < cost) return;
    worker.count += BigInt(1);
    internal_rate += worker.per;
    updateWorkerDisplay(worker);
    internal_count -= cost;
    updateBrownieStats();
}

// Handles selling a single instance of a worker
function workerSell(worker) {
    if (worker.count == 0) return;
    worker.count -= BigInt(1);
    internal_rate -= worker.per;
    updateWorkerDisplay(worker);
    const cost = workerCost(worker);
    internal_count += cost;
    updateBrownieStats();
}

// Create all of the worker interfaces & initialize event handlers for each
function initializeWorkers() {
    worker_list = worker_init.map((w) => {
        const worker = createWorkerMenu(w.name, w.image, w.per, w.cost);
        worker.buy_elem.addEventListener("click", () => {
            workerBuy(worker);
        });
        worker.sell_elem.addEventListener("click", () => {
            workerSell(worker);
        });
        return worker;
    });
}

function main() {
    initializeWorkers();
    gameTick();
    setInterval(gameTick, 1_000);
}

main();
