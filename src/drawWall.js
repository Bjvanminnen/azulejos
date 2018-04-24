export default function drawWall(wallCanvas, tile, settings) {
  const { tileSize, tilesWide, tilesHigh, zoom, showGridlines } = settings;
  const ctx = wallCanvas.getContext('2d');

  ctx.clearRect(0, 0, tileSize * tilesWide, tileSize * tilesHigh);

  const imageData = ctx.createImageData(tileSize, tileSize);
  for (let x = 0; x < tileSize; x++) {
    for (let y = 0; y < tileSize; y++) {
      const baseIndex = x * 4 + y * tileSize * 4;
      const rgb = tile.pixels[x][y];
      imageData.data[baseIndex + 0] = rgb.r;
      imageData.data[baseIndex + 1] = rgb.g;
      imageData.data[baseIndex + 2] = rgb.b;
      imageData.data[baseIndex + 3] = 0xff;
    }
  }

  // const imageData2 = reflect(ctx, imageData, false, true)
  const tileMap = [
    [imageData, reflect(ctx, imageData, false, true)],
    [reflect(ctx, imageData, true, false), reflect(ctx, imageData, true, true)],
  ];

  for (let x = 0; x < tilesWide; x++) {
    for (let y = 0; y < tilesHigh; y++) {
      const img = tileMap[x % 2][y % 2];
      // const img = y % 2 === 0 ? imageData : imageData2;
      ctx.putImageData(img, x * tileSize, y * tileSize);
    }
  }
  
  if (showGridlines) {
    ctx.strokeStyle = 'lightgray';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < tilesWide; x++) {
      for (let y = 0; y < tilesHigh; y++) {
        ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, tileSize * tilesWide, tileSize * tilesHigh);
  resize(wallCanvas, zoom);
}

function resize(canvas, pct) {
  const tempCanvas = document.createElement('canvas');
  const tctx=tempCanvas.getContext("2d");
  var cw=canvas.width;
  var ch=canvas.height;
  tempCanvas.width=cw;
  tempCanvas.height=ch;
  tctx.drawImage(canvas,0,0);
  // canvas.width*=pct;
  // canvas.height*=pct;
  var ctx=canvas.getContext('2d');
  ctx.drawImage(tempCanvas,0,0,cw,ch,0,0,cw*pct,ch*pct);
}

function reflect(ctx, base, reflectX, reflectY) {
  const imageData = ctx.createImageData(base.width, base.height);
  for (let x = 0; x < base.width; x++) {
    for (let y = 0; y < base.height; y++) {
      const srcIndex = (reflectX ? (base.width - x - 1) : x) * 4 +
        (reflectY ? (base.height - y - 1) : y) * base.height * 4;
      const destIndex = x * 4 + y * base.height * 4;
      imageData.data[destIndex + 0] = base.data[srcIndex + 0];
      imageData.data[destIndex + 1] = base.data[srcIndex + 1];
      imageData.data[destIndex + 2] = base.data[srcIndex + 2];
      imageData.data[destIndex + 3] = base.data[srcIndex + 3];
    }
  }
  return imageData;
}
