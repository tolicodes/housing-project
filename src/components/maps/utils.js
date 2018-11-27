import turf from 'turf';
import sanFernandoValley from './sanFernandoValley';
import santaMonicaMountains from './santaMonicaMountains';
import theWestside from './theWestside';
import theVerdugos from './theVerdugos';

export const MAPS = {
  'San Fernando Valley': sanFernandoValley,
  'Santa Monica Mountains': santaMonicaMountains,
  Westside: theWestside,
  Verdugos: theVerdugos,
};

export const CENTERS = {
  'San Fernando Valley': [34.228206858549996, -118.4674801745],
  'Santa Monica Mountains': [34.08857698855, -118.75480809449999],
  Westside: [34.04733700695, -118.4783734895],
  Verdugos: [34.2052679991, -118.201619],
};

export const LA_CENTER = [34.228206809, -118.4674801745];

export const getCenter = (city, neighborhood) => {
  const [lng, lat] = turf.center(MAPS[city].features.find(({ properties: { name } }) => name === neighborhood)).geometry.coordinates;

  return [lat, lng];
};
