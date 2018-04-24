import React, { Component } from 'react';
import drawTile from './drawTile';
import drawWall from './drawWall';
import Tile from './Tile';
import rgb from './rgb';

const margin = 10;
const tileZoom = 10;
const wallZoom = 2;
const tileSize = 15;
const tilesWide = 24;
const tilesHigh = 16;

class App extends Component {
  constructor(props) {
    super(props);

    this.tile = new Tile(tileSize);
  }

  componentDidMount() {
    this.drawCanvases();
  }

  drawCanvases() {
    drawTile(this.tileCanvas, this.tile, { zoom: tileZoom, tileSize });
    drawWall(this.wallCanvas, this.tile, { tileSize, tilesWide, tilesHigh, zoom: wallZoom});
  }

  clickTile = event => {
    const rect = event.target.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileZoom);
    const y = Math.floor((event.clientY - rect.top) / tileZoom);
    this.tile.setPixel(x, y, rgb(0, 0, 0));
    this.drawCanvases();
  }

  render() {
    return (
      <div>
        <canvas
          ref={e => this.tileCanvas = e}
          width={tileSize * tileZoom}
          height={tileSize * tileZoom}
          style={{
            display: 'block',
            margin,
          }}
          onClick={this.clickTile}
        />
        <canvas
          ref={e => this.wallCanvas = e}
          width={tileSize * tilesWide * wallZoom}
          height={tileSize * tilesHigh * wallZoom}
          style={{
            display: 'block',
            margin,
          }}
        />
      </div>
    );
  }
}

export default App;
