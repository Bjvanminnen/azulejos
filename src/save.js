import Tile from './Tile';
import rgb from './rgb';

const EMPTY = '';

function serializeRow(row) {
  const cells = row.map(serializeCell);
  if (cells.some(x => x !== EMPTY)) {
    return cells.join('-');
  }
  return EMPTY;
}

function serializeCell(cell) {
  if (cell.r === 255 && cell.g === 255 && cell.b === 255) {
    return EMPTY;
  }
  return [cell.r, cell.g, cell.b].join(',');
}

function serialize(tile) {
  return tile.pixels.map(serializeRow).join('|');
}

function deserialize(str) {
  const rows = str.split('|');
  const tileSize = rows.length;

  const tile = new Tile(tileSize);

  for (let x = 0; x < tileSize; x++) {
    let row;
    if (rows[x] !== EMPTY) {
      row = rows[x].split('-');
    }
    for (let y = 0; y < tileSize; y++) {
      if (!row || row[y] === EMPTY) {
        tile.pixels[x][y] = rgb(255, 255, 255);
      } else {
        const cell = row[y].split(',').map(x => parseInt(x, 10));
        tile.pixels[x][y] = rgb(cell[0], cell[1], cell[2]);
      }
    }
  }
  return tile;
}

export default function save(tile) {
  const str = serialize(tile);
  const base64 = btoa(str);
  window.location.hash = base64;
}

export function load() {
  if (window.location.hash) {
    return deserialize(atob(window.location.hash.slice(1)));
  }
}
