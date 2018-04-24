import React from 'react'
import { SketchPicker } from 'react-color'

export default class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: 0,
      g: 0,
      b: 0,
      a: 1,
    },
  };

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
            <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
          </div>
        }
      </div>
    )
  }
}
