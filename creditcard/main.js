const form = document.getElementById("card_entry");
const error_msg = document.getElementById("error_msg");
form.addEventListener("submit", submitHandler);

function isCardNumberValid(number) {
    return number === "1234123412341234";
}

function submitHandler(event) {
    event.preventDefault();
    let message = "";
    console.log(this.card_number.value);

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    if (isNaN(this.card_number.value)) {
        message += "Card number is not a number.\n";
    }
    
    if (!isCardNumberValid(this.card_number.value)) {
        message += "Card number is not a valid card number.\n";
    }

    if (this.card_year.value < year - 2000) {
        message += "Card has expired.\n";
    } else if (this.card_year.value == year - 2000) {
        if (this.card_month < month) {
            message += "Card has expired.\n";
        }
    }

    if (message !== "") {
        error_msg.classList.remove("hidden");
        error_msg.textContent = message;
        return false;
    }

    error_msg.classList.add("hidden");
    return true;
}