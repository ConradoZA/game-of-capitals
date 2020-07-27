export const haversineDistance = (question, answer) => {
  const lat1 = +question.lat;
  const long1 = +question.lng;
  const lat2 = answer.lat;
  const long2 = answer.lng;
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
