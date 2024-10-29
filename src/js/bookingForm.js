//import { searchHotels } from "./searchForm";
// import { populateHotels } from "./hotelStore";
// import { submitForm } from "./utils";
// import { populateHotels } from "./hotelStore";
// import { submitForm } from "./utils";

export function validateBookingForm() {
  // Check required fields
  if (
    !document.getElementById("checkInDate").value ||
    !document.getElementById("checkOutDate").value
  ) {
    alert("Please fill in all required fields.");
    return false;
  }

  // Check date format
  if (
    !isValidDate(document.getElementById("checkInDate").value) ||
    !isValidDate(document.getElementById("checkOutDate").value)
  ) {
    alert("Invalid date format.");
    return false;
  }

  // Check date range
  if (
    new Date(document.getElementById("checkInDate").value) >=
    new Date(document.getElementById("checkOutDate").value)
  ) {
    alert("Check-in date must be before check-out date.");
    return false;
  }

  // ... other validation checks

  return true;
}
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}
