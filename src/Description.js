import React from 'react';

const styles = {
  paragraph: {
    marginBottom: 10
  }
};

const Description = () => (
  <div style={{margin: 10}}>
    <div style={styles.paragraph}>
      <a href="https://en.wikipedia.org/wiki/Azulejo">Azulejos</a> are a type of decorative tile used
        widely in Portugal. This is a simple app that lets you create your own patterns.
    </div>
    <div style={styles.paragraph}>
      Click the pixels in the top grid to draw your tile.
    </div>
    <div style={styles.paragraph}>
      You can change the zoom by pressing the +/- buttons.
    </div>
    <div style={styles.paragraph}>
      You can change the color by clicking the swatch to the right.
    </div>

  </div>
);

export default Description
