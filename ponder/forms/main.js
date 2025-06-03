const payment_input = document.getElementById("payment");
const credit_input = document.getElementById("credit_input");
const paypal_input = document.getElementById("paypal_input");

paypal_input.classList.add("hide");
paypal_input.classList.add("hide");

payment_input.addEventListener("change", () => {
    switch (payment_input.value) {
        case "credit":
            credit_input.classList.remove("hide");
            paypal_input.classList.add("hide");
            break;
        case "paypal":
            credit_input.classList.add("hide");
            paypal_input.classList.remove("hide");
            break;
    }
});
