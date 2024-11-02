import { apiUrl, setLocalStorage, getLocalStorage } from "./utils.mjs";
const allCities = "allCities";

export async function getAvailableCities() {
    // document.getElementById('search-body').addEventListener('DOMContentLoaded'), async () => {
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
                return `${index+1}: ${hotel.city} `;
            }).join(', ');
            setLocalStorage(allCities, citiesArray);
        } catch (error) {
            console.error("Error Fetching Data: ", error);
        }
    // };
}

export function citiesOptions() {
    const citiesString = getLocalStorage("allCities");
    const citiesArray = citiesString.split(',');
    const citySelected = document.getElementById("city");
    citySelected.innerHTML = `${citiesArray.map((item) => {
        const indexAndCity = item.split(":");
        const indices = indexAndCity[0];
        const cities = indexAndCity[1].trim().toUpperCase();
        const city = indexAndCity[1];
        return `<option value="${city}">${indices} => ${cities}</option>`;
    }).join()}`;
}

