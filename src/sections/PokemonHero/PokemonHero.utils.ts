import {type PokemonStats} from '../../data/index.js';
import {
  imgPixelAttack,
  imgPixelDefense,
  imgPixelHp,
  imgPixelSpAttack,
  imgPixelSpDefense,
  imgPixelSpeed,
} from '../../assets/index.js';

type StatAssets = Record<keyof PokemonStats, string>;

const statAssetPath: StatAssets = {
  HP: imgPixelHp,
  Attack: imgPixelAttack,
  Defense: imgPixelDefense,
  Speed: imgPixelSpeed,
  'Sp. Attack': imgPixelSpAttack,
  'Sp. Defense': imgPixelSpDefense,
};

export function getStatImage(stat = '') {
  // Alternative: Object.prototype.hasOwnProperty.call(statAssetPath, stat)
  if (stat in statAssetPath) {
    return statAssetPath[stat as keyof PokemonStats];
  } else {
    // TODO: Should have fallback asset.
    return '';
  }
}
