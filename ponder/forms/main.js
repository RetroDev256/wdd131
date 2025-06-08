const payment_input = document.getElementById("payment");
const credit_input = document.getElementById("credit_input");
const paypal_input = document.getElementById("paypal_input");

payment_input.addEventListener("change", () => {
    if (payment_input.value === "credit") {
        credit_input.classList.remove("hide");
        paypal_input.classList.add("hide");
    } else {
        credit_input.classList.add("hide");
        paypal_input.classList.remove("hide");
    }
});
