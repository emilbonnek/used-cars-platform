import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

const CAR_BRANDS = [
  "Toyota",
  "Honda",
  "Volvo",
  "Citroën",
  "Renault",
  "Peugeot",
  "BMW",
  "SEAT",
  "FIAT",
  "Dacia",
  "Skoda",
  "Volkswagen",
];
const IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/1200px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg";

// Function to generate a single listing
function generateListing() {
  return {
    id: faker.string.uuid(),
    brand: faker.helpers.arrayElement(CAR_BRANDS),
    year: faker.number.int({ min: 2000, max: 2024 }),
    name: faker.vehicle.model(),
    priceDKK: faker.number.int({ min: 10, max: 1_000 }) * 1000, // 10,000 to 1,000,000
    kilometersDriven: faker.number.int({ min: 1, max: 1_000_000 }),
    imageUrl: IMAGE_URL,
  };
}

// Generate listings
const listings = Array.from({ length: 230 }, generateListing);

// Write the listings to a JSON file
const FILE_PATH = "public/data/listings.json";
writeFileSync(FILE_PATH, JSON.stringify(listings, null, 2));
