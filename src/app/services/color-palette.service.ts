import { Injectable, computed, signal } from '@angular/core';
import tinycolor from "tinycolor2";
import { Color } from '../interfaces/color.interface';
import { ColorPalette } from '../interfaces/color-palette.interface';

@Injectable({ providedIn: 'root' })
export class ColorPaletteService {
  public currentHexColor = signal('#3F51B5');

  public currentColorPalette = computed(() => {
    const hex = this.currentHexColor();

    const colors: Color[] = [
      { hex: tinycolor(hex).lighten(37.7).saturate(10.4).spin(-13).toHexString(), name: '50' },
      { hex: tinycolor(hex).lighten(31.8).saturate(10.4).spin(-9.5).toHexString(), name: '100' },
      { hex: tinycolor(hex).lighten(18.7).desaturate(17).spin(-3.9).toHexString(), name: '200' },
      { hex: tinycolor(hex).lighten(9.1).desaturate(20.9).spin(-4).toHexString(), name: '300' },
      { hex: tinycolor(hex).lighten(4.1).desaturate(6.6).spin(-3).toHexString(), name: '400' },
      { hex: hex, name: '500' },
      { hex: tinycolor(hex).darken(3.1).desaturate(12.4).spin(-2.7).toHexString(), name: '600' },
      { hex: tinycolor(hex).darken(7.8).desaturate(24.5).spin(-4).toHexString(), name: '700' },
      { hex: tinycolor(hex).darken(11.7).desaturate(23.2).spin(-4).toHexString(), name: '800' },
      { hex: tinycolor(hex).darken(17).desaturate(16.1).spin(-4).toHexString(), name: '900' },
      { hex: tinycolor(hex).lighten(16.7).saturate(10.4).spin(0.6).toHexString(), name: 'A100' },
      { hex: tinycolor(hex).lighten(7.7).saturate(10.4).spin(-4).toHexString(), name: 'A200' },
      { hex: tinycolor(hex).darken(3.9).saturate(10.4).spin(-15.5).toHexString(), name: 'A400' },
      { hex: tinycolor(hex).darken(16.6).saturate(10.4).spin(-4).toHexString(), name: 'A700' }
    ];

    for (const color of colors) {
      color.contrast = this.getContrastColor(color.hex);
    }

    const colorPalette: ColorPalette = {
      name: hex,
      colors: colors,
    };

    return colorPalette;
  });

  public generateColorPalette(name: string, hex: string) {
    // Ensure hex starts with a hashtag
    if (hex.charAt(0) !== '#') {
      hex = '#' + hex;
    }

    const colors: Color[] = [
      { hex: tinycolor(hex).lighten(37.7).saturate(10.4).spin(-13).toHexString(), name: '50' },
      { hex: tinycolor(hex).lighten(31.8).saturate(10.4).spin(-9.5).toHexString(), name: '100' },
      { hex: tinycolor(hex).lighten(18.7).desaturate(17).spin(-3.9).toHexString(), name: '200' },
      { hex: tinycolor(hex).lighten(9.1).desaturate(20.9).spin(-4).toHexString(), name: '300' },
      { hex: tinycolor(hex).lighten(4.1).desaturate(6.6).spin(-3).toHexString(), name: '400' },
      { hex: hex, name: '500' },
      { hex: tinycolor(hex).darken(3.1).desaturate(12.4).spin(-2.7).toHexString(), name: '600' },
      { hex: tinycolor(hex).darken(7.8).desaturate(24.5).spin(-4).toHexString(), name: '700' },
      { hex: tinycolor(hex).darken(11.7).desaturate(23.2).spin(-4).toHexString(), name: '800' },
      { hex: tinycolor(hex).darken(17).desaturate(16.1).spin(-4).toHexString(), name: '900' },
      { hex: tinycolor(hex).lighten(16.7).saturate(10.4).spin(0.6).toHexString(), name: 'A100' },
      { hex: tinycolor(hex).lighten(7.7).saturate(10.4).spin(-4).toHexString(), name: 'A200' },
      { hex: tinycolor(hex).darken(3.9).saturate(10.4).spin(-15.5).toHexString(), name: 'A400' },
      { hex: tinycolor(hex).darken(16.6).saturate(10.4).spin(-4).toHexString(), name: 'A700' }
    ];

    for (const color of colors) {
      color.contrast = this.getContrastColor(color.hex);
    }

    const colorPalette: ColorPalette = {
      name: name,
      colors: colors,
    };

    return colorPalette;
  }

  private getContrastColor(hex: string): '#000' | '#FFF' {
    const [r, g, b] = this.hexToRgb(hex);

    // Normalize the RGB values.
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    // Compute luminance.
    const luminance = 0.299 * normalizedR + 0.587 * normalizedG + 0.114 * normalizedB;

    // Decide on the text color.
    return luminance > 0.5 ? '#000' : '#FFF';
  }

  private hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
      : [0, 0, 0];
  }

  public isValidHexColor(hex: string) {
    // Ensure hex starts with a hashtag
    if (hex.charAt(0) !== '#') {
      hex = '#' + hex;
    }

    const hex3 = /^#([A-Fa-f0-9]{3})$/;
    const hex4 = /^#([A-Fa-f0-9]{4})$/;
    const hex6 = /^#([A-Fa-f0-9]{6})$/;
    const hex8 = /^#([A-Fa-f0-9]{8})$/;

    return hex3.test(hex) || hex4.test(hex) || hex6.test(hex) || hex8.test(hex);
  }
}