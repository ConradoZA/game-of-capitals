import { randomizeOrder } from "./maths";

import * as africa from "../data/africa.json";
import * as asia from "../data/asia.json";
import * as europe from "../data/europe.json";
import * as northAmerica from "../data/north-america.json";
import * as oceania from "../data/oceania.json";
import * as southAmerica from "../data/south-america.json";

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

export const endGame = (points, maxI, i) => {
  if (points <= 0 || maxI === i) return true;
  return false;
};

export const geoLocations = (continent) => {
  let center;
  let bounds;
  switch (parseInt(continent)) {
    case 1:
      center = [3.988994, 17.382889];
      bounds = [
        [37.897891, -26.806338],
        [-36.847107, 59.821057],
      ];
      break;
    case 2:
      center = [35.289383, 87.331111];
      bounds = [
        [57.3108, 25.4498],
        [-13.6132, 149.3178],
      ];
      break;
    case 3:
      center = [58.02956979905358, 10.56937075425759];
      bounds = [
        [71.304858, -25.074016],
        [33.3561, 88.819],
      ];
      break;
    case 4:
      // continent = northAmerica.default;
      break;
    case 5:
      center = [-26.606025, 134.506006];
      bounds = [
        [10.251037, 110.88713],
        [-51.2125, 179.21],
      ];
      break;
    case 6:
      // continent = southAmerica.default;
      break;
    default:
      break;
  }
  return { center, bounds };
};
