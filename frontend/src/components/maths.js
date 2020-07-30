export const haversineDistance = (question, answer) => {
  const lat1 = parseFloat(question.lat);
  const long1 = parseFloat(question.lng);
  const lat2 = parseFloat(answer.lat);
  const long2 = parseFloat(answer.lng);
  const distance = (num1, num2) => (Math.PI / 180) * Math.abs(num1 - num2);
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const EARTH_RADIUS_KM = 6371;

  const yDistance = distance(lat2, lat1);
  const xDistance = distance(long2, long1);

  const latRad1 = toRadian(lat1);
  const latRad2 = toRadian(lat2);

  const a =
    Math.pow(Math.sin(yDistance / 2), 2) +
    Math.pow(Math.sin(xDistance / 2), 2) *
      Math.cos(latRad1) *
      Math.cos(latRad2);

  const c = 2 * Math.asin(Math.sqrt(a));

  const finalDistance = EARTH_RADIUS_KM * c;

  if (!finalDistance) return 0;

  return finalDistance;
};

export const randomizeOrder = (array) => {
  let i = array.length;
  let randomIndex;
  let temp;
  while (--i > 0) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    temp = array[randomIndex];
    array[randomIndex] = array[i];
    array[i] = temp;
  }
  return array;
};

export const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const roundNumber = (number) => {
  return Math.round(number);
};

export const malus = (pastPoints, distance) => {
  const dist = roundNumber(distance);
  return pastPoints - dist;
};
