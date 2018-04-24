export default function rgb(r, g, b) {
  return { r, g, b };
}

export function getColor(rgb) {
  const str = [rgb.r, rgb.g, rgb.b].join(',');
  return 'rgb(' + str + ')';
}
