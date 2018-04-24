import React, { Component } from 'react';
import drawTile from './drawTile';
import drawWall from './drawWall';
import Tile from './Tile';
import rgb from './rgb';

const margin = 10;

const tileSize = 20;
const zoom = 10;
const tilesWide = 30;
const tilesHigh = 30;

class App extends Component {
  constructor(props) {
    super(props);

    this.tile = new Tile(tileSize);
  }

  componentDidMount() {
    this.drawCanvases();
  }

  drawCanvases() {
    drawTile(this.tileCanvas, this.tile, { zoom, tileSize });
    drawWall(this.wallCanvas, this.tile, { tileSize, tilesWide, tilesHigh });
  }

  clickTile = event => {
    const rect = event.target.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / zoom);
    const y = Math.floor((event.clientY - rect.top) / zoom);
    this.tile.setPixel(x, y, rgb(0, 0, 0));
    this.drawCanvases();
  }

  render() {
    return (
      <div>
        <canvas
          ref={e => this.tileCanvas = e}
          width={tileSize * zoom}
          height={tileSize * zoom}
          style={{
            display: 'block',
            margin,
          }}
          onClick={this.clickTile}
        />
        <canvas
          ref={e => this.wallCanvas = e}
          width={tileSize * tilesWide}
          height={tileSize * tilesHigh}
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
