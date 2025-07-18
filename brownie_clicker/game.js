const worker_templates = [
    {
        name: "Spatula",
        image: "images/spatula.svg",
        description: "Silicone spatula - it not only speeds up mixing brownie batter, but it doubles as a projectile!",
        per: 1,
        base: 15,
    },
    {
        name: "Baking Pan",
        image: "images/pan.svg",
        description: "Standard 9x11 non-stick baking pan. Perfect for increased brownie production.",
        per: 7,
        base: 50,
    },
    {
        name: "Miss Mixer",
        image: "images/mixer.svg",
        description: "Fastest brownie batter mixer on the market. It consumes 2.3 Megawatts of electricity.",
        per: 50,
        base: 750,
    },
    {
        name: "Chef Sinon",
        image: "images/sinon.webp",
        description: "While a master of his craft, Sinon may spend more time eating the brownies than baking them!",
        per: 250,
        base: 10_000,
    },
    {
        name: "Brownie Box",
        image: "images/b_box.svg",
        description: "A box to hold brownies. It's deeper than it looks. Fred fell in - we still haven't found him.",
        per: 1250,
        base: 150_000,
    },
];

const news_items = [
    { text: "You have a sudden craving for brownies.", min: 0 },
    { text: "You feel like making brownies.", min: 2 },
    { text: "A batch of brownies got burnt. Unfortunate.", min: 5 },
    { text: "Your roommate eats all the brownies.", min: 20 },
    { text: "Your mother enjoys your brownies.", min: 50 },
    { text: "Your brownies are popular at school.", min: 100 },
    { text: "You lace your brownies with dihydrogen monoxide.", min: 250 },
    { text: "Your counters are too full for more brownies!", min: 500 },
    { text: "You start cooking brownies in your microwave.", min: 1_000 },
    { text: "A local café wants to sell your brownies.", min: 2_500 },
    { text: "Local bakery stops baking brownies and starts buying from you!", min: 5_000 },
    { text: "Your floor is covered in chocolate and flour.", min: 10_000 },
    { text: "The health inspector pays a surprise visit. Everything is up to code!", min: 20_000 },
    { text: "Your brownies are featured on a popular food blog.", min: 50_000 },
    { text: "You've rented a commercial kitchen to keep up with demand.", min: 100_000 },
    { text: "A national supermarket chain inquires about a partnership.", min: 250_000 },
    { text: "Your town is unofficially known as 'Brownieville'.", min: 1_000_000 },
    { text: "There are rumors of a giant brownie statue being erected.", min: 5_000_000 },
];

// Game elements
const news = document.getElementById("news");
const brownie = document.getElementById("brownie");
const brownie_count = document.getElementById("brownie_count");
const per_second = document.getElementById("per_second");
const right_side = document.getElementById("right_side");

// Create a worker - return handles to fields that must change over time.
function createWorker(template) {
    const interface = document.createElement("div");
    interface.className = "worker_interface";
    interface.innerHTML = `
        <img class="worker_img" src="${template.image}" alt="" />
        <div class="worker_details">
            <div class="worker_name">${template.name}</div>
            <div class="worker_count"></div>
            <div class="worker_rate"></div>
            <div class="worker_total"></div>
            <div class="worker_cost"></div>
        </div>
        <div class="worker_buy">Buy</div>
        <div class="worker_sell">Sell</div>
    `;

    right_side.appendChild(interface);
    const dom = workerDOM(interface);
    dom.image.title = template.description;
    const data = workerData(template);
    const worker = workerStruct(dom, data);
    workerRender(worker);
    return worker;
}

// Generate a structure representing the DOM of a worker interface
function workerDOM(interface) {
    return {
        root: interface,
        image: interface.querySelector(".worker_img"),
        count: interface.querySelector(".worker_count"),
        rate: interface.querySelector(".worker_rate"),
        total: interface.querySelector(".worker_total"),
        cost: interface.querySelector(".worker_cost"),
        buy: interface.querySelector(".worker_buy"),
        sell: interface.querySelector(".worker_sell"),
    };
}

// Generate a structure representing the data of a worker interface
// This does not reside in the same structure as the DOM as we want
// to serialize and deserialize it.
function workerData(template) {
    return {
        image: template.image,
        per: BigInt(template.per),
        base: BigInt(template.base),
        count: BigInt(0),
        total: BigInt(0),
    };
}

// Generate a structure containing both the data and DOM of a worker interface
function workerStruct(dom, data) {
    return { dom: dom, data: data };
}

// Creates a brownie particle at the specified location - the brownie particle
// is a visual cue that one (or more) brownies were created. They undergo a 3s
// CSS animation using the fade_out keyframes.
function genParticle(client_x, client_y, image) {
    const particle = document.createElement("img");
    particle.src = image;
    particle.className = "particle";

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

// The per-worker base bps is 1.2 ^ index

// Update worker info display and stuff
function workerRender(worker) {
    const cost = workerCost(worker);
    const rate = worker.data.count * worker.data.per;
    worker.dom.count.innerText = `Count: ${worker.data.count}`;
    worker.dom.rate.innerText = `BPS: ${rate}`;
    worker.dom.cost.innerText = `Cost: ${cost}`;
    worker.dom.total.innerText = `Total: ${worker.data.total}`;

    // The worker will be hidden can get or has at least one
    if (game_count >= worker.data.base || worker.data.count > 0) {
        worker.dom.root.classList.remove("hidden");
    }

    // The buy button is gray when the user cannot purchase one
    const cannot_buy = game_count < cost;
    worker.dom.buy.classList.toggle("gray", cannot_buy);

    // The sell button is gray when the user does not have at least one
    const cannot_sell = worker.data.count == BigInt(0);
    worker.dom.sell.classList.toggle("gray", cannot_sell);
}

// Price of a worker given the worker base cost and count
function workerCost(worker) {
    // The cost of a worker is base * 1.3 ^ count
    const cost_pow_mul = BigInt(13) ** worker.data.count;
    const cost_pow_div = BigInt(10) ** worker.data.count;
    return (worker.data.base * cost_pow_mul) / cost_pow_div;
}

// Handles purchasing a single instance of a worker
function workerBuy(event, worker) {
    const cost = workerCost(worker);
    if (game_count < cost) return;
    game_count -= cost;
    game_rate += worker.data.per;
    worker.data.count += BigInt(1);
    worker_list.forEach(workerRender);
    genParticle(event.clientX, event.clientY, worker.data.image);
    statsRender();
}

// Handles selling a single instance of a worker
function workerSell(worker) {
    if (worker.data.count == 0) return;
    worker.data.count -= BigInt(1);
    game_rate -= worker.data.per;
    game_count += workerCost(worker);
    worker_list.forEach(workerRender);
    statsRender();
}

// Initialize event handlers for a worker
function initializeWorker(worker) {
    worker.dom.root.classList.add("hidden");
    worker.dom.buy.addEventListener("click", (e) => workerBuy(e, worker));
    worker.dom.sell.addEventListener("click", () => workerSell(worker));
    workerRender(worker);
}

// Click event handler for the brownie - animation and effect
function brownieClick(event) {
    game_count += BigInt(1);
    worker_list.forEach(workerRender);
    genParticle(event.clientX, event.clientY, "images/brownie.webp");
    statsRender();
}

// Update the display of brownie production statistics
function statsRender() {
    brownie_count.innerText = `Brownies: ${game_count}`;
    per_second.innerText = `BPS: ${game_rate}`;
}

// Updates the display and generation of brownies
function gameTick() {
    game_count += game_rate;
    worker_list.forEach(workerTick);
    statsRender();
}

// Handles brownie production for each worker
function workerTick(worker) {
    worker.data.total += worker.data.per * worker.data.count;
    workerRender(worker);
}

// Serializing & compressing & saving game state to a string
async function saveToString() {
    // Concise identifiers are used to shrink save text size
    const data = worker_list.map((w) => {
        return { c: w.data.count, t: w.data.total };
    });
    const time = Math.floor(Date.now() / 1000);
    const game = { c: game_count, t: time, r: game_rate, d: data };

    // JSON does not support BigInt - we need to stringify it ourselves
    const game_json = JSON.stringify(game, (_, val) => {
        if (typeof val != "bigint") return val;
        return val.toString() + "n";
    });

    // Compress the JSON for smaller save texts
    const c_stream = new CompressionStream("gzip");
    const writer = c_stream.writable.getWriter();
    writer.write(new TextEncoder().encode(game_json));
    writer.close();
    const c_response = new Response(c_stream.readable);
    const compressed = await c_response.arrayBuffer();

    // Encode compressed data as base64
    const binary_string = bufferToString(compressed);
    return btoa(binary_string);
}

// Deserializing & decompressing & loading game state from a string
async function loadFromString(game_string) {
    // This can't use a textEncoder, given that it likely isn't valid unicode
    const binary_string = atob(game_string);
    const compressed = Uint8Array.from(binary_string, (c) => c.charCodeAt(0));

    // Decompress the save text to JSON
    const d_stream = new DecompressionStream("gzip");
    const writer = d_stream.writable.getWriter();
    writer.write(compressed);
    writer.close();
    const d_response = new Response(d_stream.readable);
    const decompressed = await d_response.arrayBuffer();

    // Parse custom JSON - manually deserialize BigInt
    const game_json = bufferToString(decompressed);
    return JSON.parse(game_json, (_, val) => {
        if (typeof val != "string") return val;
        if (val[val.length - 1] != "n") return val;
        return BigInt(val.slice(0, -1));
    });
}

// Required by load & save - ArrayBuffers are a bit clunky
function bufferToString(buffer) {
    let string = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i += 1) {
        string += String.fromCharCode(bytes[i]);
    }
    return string;
}

// Loads from a browser cookie, otherwise defaults to the game template
async function loadGame() {
    const game_string = loadGameFromCookie();
    let workers = worker_templates.map(createWorker);

    // Attempt to load from the cookie data if it is present
    if (game_string) {
        const game = await loadFromString(game_string);
        game_count = game.c;
        game_rate = game.r;
        game.d.forEach((data, idx) => {
            workers[idx].data.count = data.c;
            workers[idx].data.total = data.t;
        });

        // Fast-forward the game by the time we slept
        const elapsed = Math.floor(Date.now() / 1000) - game.t;
        game_count += game_rate * BigInt(elapsed);
        workers.forEach((w) => {
            const rate = worker.data.per * worker.data.count;
            w.data.total += rate * BigInt(elapsed);
        });
    }

    // The first worker is visible regardless of price
    workers.forEach(initializeWorker);
    workers[0].dom.root.classList.remove("hidden");
    return workers;
}

// Load a browser cookie if it is present, otherwise return null
// The decodeURIComponent is required because the base64 can end in =
function loadGameFromCookie() {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i += 1) {
        const [key, val] = cookies[i].split("=");
        if (key == "game") return decodeURIComponent(val);
    }
    return null;
}

// Save the game as a browser cookie - expires in a year
async function saveGame() {
    const data = await saveToString();
    document.cookie = `game=${data}; max-age=31556952`;
}

// Updates the news based on how many brownies you have
function displayNews() {
    // Certain news articles will require you to have more brownies
    const allowable = news_items.filter((news) => BigInt(news.min) <= game_count);
    const random_index = Math.floor(Math.random() * allowable.length);
    news.innerText = allowable[random_index].text;
}

// Game state
let game_count;
let game_rate;
let worker_list;

async function main() {
    game_count = BigInt(0);
    game_rate = BigInt(0);
    worker_list = await loadGame();

    brownie.addEventListener("click", brownieClick);
    window.addEventListener("beforeunload", saveGame);
    setInterval(displayNews, 15_000);
    setInterval(saveGame, 60_000);
    setInterval(gameTick, 1_000);
    displayNews();
    statsRender();
}

main();
