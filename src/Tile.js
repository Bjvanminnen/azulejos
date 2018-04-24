import rgb from './rgb';

export default class Tile {
  constructor(tileSize) {
    const pixels = [];
    for (let x = 0; x < tileSize; x++) {
      pixels[x] = [];
      for (let y = 0; y < tileSize; y++) {
        pixels[x][y] = rgb(0xff, 0xff, 0xff);
      }
    }

    this.pixels = pixels;
  }

  setPixel(x, y, color) {
    if (!this.pixels[x] || !this.pixels[x][y]) {
      throw new Error('out of bounds');
    }

    this.pixels[x][y] = color;
  }
}
