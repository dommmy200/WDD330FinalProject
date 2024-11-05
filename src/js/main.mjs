import { apiUrl, setLocalStorage, getLocalStorage } from "./utils.mjs";
const allCities = "allCities";

export async function setAvailableCities() {
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

export async function citiesOptions() {
    const citiesString = await getLocalStorage("allCities");
    const citiesArray = citiesString.split(',');
    const citySelected = document.getElementById("city");
    citySelected.innerHTML = `${citiesArray.map((item) => {
        const indexAndCity = item.split(":");
        const indices = indexAndCity[0];
        const cities = indexAndCity[1].toUpperCase();
        const city = indexAndCity[1];
        return `<option value="${city}">${indices} => ${cities}</option>`;
    }).join()}`;
}

export function populateForm() {
    const amenities = document.getElementById('amenities');
    const roomType = document.getElementById('rooms');
    const stars = document.getElementById('rating');

    const amenity = `<input type="checkbox" id="wifi" name="amenities" value="wifi" />
        <label for="wifi">Wi-Fi</label><br />

        <input type="checkbox" id="pool" name="amenities" value="pool" />
        <label for="pool">Pool</label><br />

        <input type="checkbox" id="gym" name="amenities" value="gym" />
        <label for="gym">Gym</label><br />

        <input type="checkbox" id="spa" name="amenities" value="spa" />
        <label for="spa">Spa</label><br />

        <input type="checkbox" id="res" name="amenities" value="res" />
        <label for="res">Restaurant</label><br />

        <input type="checkbox" id="bar" name="amenities" value="bar" />
        <label for="bar">Bar</label><br />

        <input type="checkbox" id="airport" name="amenities" value="airport" />
        <label for="airport">Airport Shuttle</label><br />

        <input type="checkbox" id="pet" name="amenities" value="pet" />
        <label for="pet">Pet Friendly</label><br />

        <input type="checkbox" id="room" name="amenities" value="room" />
        <label for="room">Room Service</label><br />`;

    const room = `<option value="default" selected>Choose an option</option>
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="queen">Queen</option>
        <option value="king">King</option>
        <option value="suite">Suite</option>`;
    const rating = `<option value="1" >1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3" selected>3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>`
    amenities.innerHTML = amenity;
    roomType.innerHTML = room;
    stars.innerHTML = rating; 
}