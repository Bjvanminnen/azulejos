import React, { Component } from 'react';
import drawTile from './drawTile';
import Tile from './Tile';

const margin = 10;

const tileSize = 20;
const zoom = 8;
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
  }

  clickTile = event => {
    const rect = event.target.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / zoom);
    const y = Math.floor((event.clientY - rect.top) / zoom);
    this.tile.setPixel(x, y, 'black');
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
          ref={e => this.wall = e}
          width={tileSize * tilesWide}
          height={tileSize * tilesHigh}
          style={{
            border: '1px solid black',
            display: 'block',
            margin,
          }}
        />
      </div>
    );
  }
}

export default App;
