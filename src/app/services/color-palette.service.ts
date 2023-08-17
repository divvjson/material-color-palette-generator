import { Injectable } from '@angular/core';
import { ColorPalette } from '../interfaces/color-palette.interface';

@Injectable({ providedIn: 'root' })
export class ColorPaletteService {

  // Generate a Material Design color palette based on a given hex color.
  public generatePalette(hex: string): ColorPalette {
    return {
      c50: this.tint(hex, 0.9),
      c100: this.tint(hex, 0.7),
      c200: this.tint(hex, 0.5),
      c300: this.tint(hex, 0.333),
      c400: this.tint(hex, 0.166),
      c500: hex,
      c600: this.shade(hex, 0.1),
      c700: this.shade(hex, 0.2),
      c800: this.shade(hex, 0.3),
      c900: this.shade(hex, 0.4),
      ca100: this.tint(hex, 0.5),
      ca200: this.tint(hex, 0.3),
      ca400: hex,
      ca700: this.shade(hex, 0.15),
    };
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
}