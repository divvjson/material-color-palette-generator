import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorChromeModule } from 'ngx-color/chrome';
import { MatButtonModule } from '@angular/material/button';
import { HSLA, HSVA, RGBA } from 'ngx-color';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [
    ColorChromeModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  public colorPaletteService = inject(ColorPaletteService);

  public handleColorChanged(color: string | RGBA | HSLA | HSVA) {
    if (typeof(color) !== 'string') return;
    const hex = color.toUpperCase();
    this.colorPaletteService.currentHexColor.set(hex);
  }

  public save() {
    this.colorPaletteService.savedHexColors.mutate((value) => value.push(this.colorPaletteService.currentHexColor()));
  }

  public canSave() {
    return !this.colorPaletteService.savedHexColors().includes(this.colorPaletteService.currentHexColor());
  }
}
