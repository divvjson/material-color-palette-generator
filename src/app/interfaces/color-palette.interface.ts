export interface Color {
  hex: string;
  contrast: '#000' | '#FFF';
}

export interface ColorPalette {
  c50: Color;
  c100: Color;
  c200: Color;
  c300: Color;
  c400: Color;
  c500: Color;
  c600: Color;
  c700: Color;
  c800: Color;
  c900: Color;
}
