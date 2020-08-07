import { randomizeOrder } from "./maths";

import * as africa from "../JSON/africa.json";
import * as asia from "../JSON/asia.json";
import * as europe from "../JSON/europe.json";
import * as northAmerica from "../JSON/north-america.json";
import * as oceania from "../JSON/oceania.json";
import * as southAmerica from "../JSON/south-america.json";

export const selectGame = (continent) => {
  switch (parseInt(continent)) {
    case 1:
      continent = africa.default;
      break;
    case 2:
      continent = asia.default;
      break;
    case 3:
      continent = europe.default;
      break;
    case 4:
      continent = northAmerica.default;
      break;
    case 5:
      continent = oceania.default;
      break;
    case 6:
      continent = southAmerica.default;
      break;
    default:
      break;
  }
  return randomizeOrder(continent);
};

export const endGameConditions = (points, maxI, i) => {
  if (points <= 0 || maxI === i) return true;
  return false;
};

export const geoLocations = (continent) => {
  let center;
  let bounds;
  switch (parseInt(continent)) {
    case 1:
      // Africa
      center = [3.988994, 17.382889];
      bounds = [
        [37.897891, -26.806338],
        [-36.847107, 59.821057],
      ];
      break;
    case 2:
      // Asia
      center = [35.289383, 87.331111];
      bounds = [
        [57.3108, 25.4498],
        [-13.6132, 149.3178],
      ];
      break;
    case 3:
      // Europe
      center = [53.7376, 27.4439];
      bounds = [
        [870.9143, -24.9726],
        [33.3561, 54.1243],
      ];
      break;
    case 4:
      // northAmerica
      center = [39.4503, -98.6979];
      bounds = [
        [80.1035, -167.9051],
        [6.1356, -24.5855],
      ];
      break;
    case 5:
      // Oceania
      center = [-26.606025, 134.506006];
      bounds = [
        [10.251037, 110.88713],
        [-51.2125, 179.21],
      ];
      break;
    case 6:
      //southAmerica
      center = [-15.6177, -56.1071];
      bounds = [
        [17.4837, -82.4958],
        [-57.23501, -13.2507],
      ];
      break;
    default:
      break;
  }
  return { center, bounds };
};
