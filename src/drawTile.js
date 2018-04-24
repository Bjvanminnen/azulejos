export default function drawTile(tileCanvas, tile, settings) {
  const { zoom, tileSize } = settings;
  const ctx = tileCanvas.getContext('2d');
  ctx.clearRect(0, 0, zoom * tileSize, zoom * tileSize);

  for (let x = 0; x < tileSize; x++) {
    for (let y = 0; y < tileSize; y++) {
      ctx.fillStyle = tile.pixels[x][y];
      ctx.fillRect(x * zoom, y * zoom, zoom, zoom);
    }
  }

  ctx.strokeStyle = 'lightgray';
  ctx.lineWidth = 1;
  for (let x = 0; x < tileSize; x++) {
    for (let y = 0; y < tileSize; y++) {
      ctx.strokeRect(x * zoom, y * zoom, zoom, zoom);
    }
  }

  ctx.strokeStyle = 'black';
  ctx.strokeRect(0, 0, zoom * tileSize, zoom * tileSize);
}
