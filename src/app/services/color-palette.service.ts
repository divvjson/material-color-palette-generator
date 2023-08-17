import { Injectable } from '@angular/core';
import { Color, ColorPalette } from '../interfaces/color-palette.interface';

@Injectable({ providedIn: 'root' })
export class ColorPaletteService {

  // Generate a Material Design color palette based on a given hex color.
  public generatePalette(hex: string): ColorPalette {
    // Ensure hex starts with a hashtag
    if (hex.charAt(0) !== '#') {
      hex = '#' + hex;
    }

    return {
      c50: this.generateColor(this.tint(hex, 0.9)),
      c100: this.generateColor(this.tint(hex, 0.7)),
      c200: this.generateColor(this.tint(hex, 0.5)),
      c300: this.generateColor(this.tint(hex, 0.333)),
      c400: this.generateColor(this.tint(hex, 0.166)),
      c500: this.generateColor(hex),
      c600: this.generateColor(this.shade(hex, 0.1)),
      c700: this.generateColor(this.shade(hex, 0.2)),
      c800: this.generateColor(this.shade(hex, 0.3)),
      c900: this.generateColor(this.shade(hex, 0.4)),
    };
  }

  private generateColor(hex: string) {
    const color: Color = {
      hex: hex,
      contrast: this.getContrastColor(hex),
    };

    return color;
  }

  // Create a tint of a color (lighter version).
  private tint(color: string, amount: number): string {
    const [r, g, b] = this.hexToRgb(color);
    return this.rgbToHex(
      Math.round((1 - amount) * r + 255 * amount),
      Math.round((1 - amount) * g + 255 * amount),
      Math.round((1 - amount) * b + 255 * amount)
    );
  }

  // Create a shade of a color (darker version).
  private shade(color: string, amount: number): string {
    const [r, g, b] = this.hexToRgb(color);
    return this.rgbToHex(
      Math.round((1 - amount) * r),
      Math.round((1 - amount) * g),
      Math.round((1 - amount) * b)
    );
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

  private rgbToHex(r: number, g: number, b: number): string {
    return (
      '#' +
      (1 << 24 | r << 16 | g << 8 | b)
        .toString(16)
        .slice(1)
    );
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