import { fetchMockarooData, apiUrl, setLocalStorage, getLocalStorage } from "./utils.mjs";
const allCities = "allCities";

export async function getAvailableCities() {
    document.getElementById('to-search').addEventListener('DOMContentLoaded'), async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                }
            });
            const hotel = await response.json();
            if (!response.ok) {
                throw new Error("Faulty Response");
            }
            if (!Array.isArray(hotel) || hotel.length === 0) {
                throw new Error("No data!");
            }
            const citiesArray = hotel.map((hotel, index) => {
                return `${index}: ${hotel.city}`;
            }).join('');
            setLocalStorage(allCities, citiesArray);
        } catch (error) {
            console.error("Error Fetching Data: ", error);
        }
    };
}

export function citiesOptions() {
    const citiesArray = getLocalStorage("allCities");
    const citySelected = document.getElementById("city");
    citySelected.innerHTML = `${citiesArray.map((city) => {
        const ct = city.split(":").trim();
        const index = ct[0];
        const cit = ct[1].toUpperCase();
        const citi = ct[1];
        return `<option value="${citi}">${index} => ${cit}</option>`;
    }).join()}`;
}
fetchMockarooData();
