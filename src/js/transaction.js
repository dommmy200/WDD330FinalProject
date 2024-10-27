import { renderCard } from "./hotelCard";
export function transactionForm() {
    document.addEventListener("DOMContentLoaded", (e) => {
        e.preventDefault();
        const transaction = document.getElementById('transaction')
        const cardRendered = renderCard();
        transaction.innerHTML = cardRendered;

        document.getElementById('submit').addEventListener('submit', () => {

        });
    });
  }