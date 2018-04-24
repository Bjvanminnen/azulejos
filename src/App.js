import React, { Component } from 'react';
import drawTile from './drawTile';
import drawWall from './drawWall';
import Tile from './Tile';
import rgb from './rgb';
import ColorPicker from './ColorPicker';

const wallZoom = 2;
const tileSize = 15;
const tilesWide = 24;
const tilesHigh = 16;

class App extends Component {
constructor(props) {
    super(props);

    this.tile = new Tile(tileSize);
    this.state = {
      tileZoom: 10,
    };
    this.color = rgb(0, 0, 0);
  }

  componentDidMount() {
    this.drawCanvases();
  }

  drawCanvases() {
    const { tileZoom } = this.state;

    drawTile(this.tileCanvas, this.tile, { zoom: tileZoom, tileSize });
    drawWall(this.wallCanvas, this.tile, { tileSize, tilesWide, tilesHigh, zoom: wallZoom});
  }

  clickTile = event => {
    const { tileZoom } = this.state;

    const rect = event.target.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tileZoom);
    const y = Math.floor((event.clientY - rect.top) / tileZoom);
    this.tile.setPixel(x, y, this.color);
    this.drawCanvases();
  }

  clickZoomUp = () => {
    this.setState({tileZoom: this.state.tileZoom + 1}, this.drawCanvases);
  }

  clickZoomDown = () => {
    this.setState({tileZoom: this.state.tileZoom - 1}, this.drawCanvases);
  }

  onUpdateColor = rgb => this.color = rgb

  render() {
    const { tileZoom } = this.state;

    return (
      <div>
        <div style={{margin: 10, display: 'flex'}}>
          <div style={{flexDirection: 'column', display: 'flex',}}>
            <button style={{marginRight: 5, marginBottom: 5}} onClick={this.clickZoomUp}>+</button>
            <button style={{marginRight: 5, marginBottom: 5}} onClick={this.clickZoomDown}>-</button>
          </div>
          <canvas
            ref={e => this.tileCanvas = e}
            width={tileSize * tileZoom}
            height={tileSize * tileZoom}
            style={{
              display: 'block',
            }}
            onClick={this.clickTile}
          />
        <ColorPicker style={{marginLeft: 5}} onUpdateColor={this.onUpdateColor}/>
        </div>
        <canvas
          ref={e => this.wallCanvas = e}
          width={tileSize * tilesWide * wallZoom}
          height={tileSize * tilesHigh * wallZoom}
          style={{
            display: 'block',
            margin: 10,
          }}
        />
      </div>
    );
  }
}

export default App;
