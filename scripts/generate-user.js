import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

// Function to generate a user
function generateUser() {
  return {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}

// Generate user
const user = generateUser();

// Write the user to a JSON file
const FILE_PATH = "public/data/user.json";
writeFileSync(FILE_PATH, JSON.stringify(user, null, 2));
