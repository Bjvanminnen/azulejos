import React from 'react'
import { SketchPicker } from 'react-color'

const presetColors = [
  '#000000',
  '#ffffff',
  // '#0047ab', // blue
  '#2F4291', // blue
  '#E8C702', // yellow
  // '#E3CC4A', // yellow
  '#587C4C', // green
  '#B13A37', //red
  '#1393C1', // cyan
];

const firstColor = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/
  .exec(presetColors[2])
  .slice(1).map(x => parseInt(x, 16));

export default class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: firstColor[0],
      g: firstColor[1],
      b: firstColor[2],
      a: 1,
    },
  };

  componentDidMount() {
    this.props.onUpdateColor(this.state.color);
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.props.onUpdateColor(color.rgb);
  };

  render() {
    const styles = {
      color: {
        width: 20,
        height: 20,
        borderRadius: 2,
        background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
      },
      swatch: {
        padding: 5,
        background: '#fff',
        borderRadius: 1,
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: 2,
      },
      cover: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    };

    return (
      <div style={this.props.style}>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        {this.state.displayColorPicker &&
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker
              color={this.state.color}
              onChange={this.handleChange}
              presetColors={presetColors}
            />
          </div>
        }
      </div>
    )
  }
}
