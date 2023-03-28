import Hotel from "../types/hotel";
import hotels from "./hotelsData";

function getRandomHotelInCity(city: string): Hotel | null {
  const hotelsInCity = hotels.filter((hotel) => hotel.city === city);
  if (hotelsInCity.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * hotelsInCity.length);
  return hotelsInCity[randomIndex];
}

export default getRandomHotelInCity;
