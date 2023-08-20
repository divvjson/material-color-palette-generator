import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { ColorPaletteListItemComponent } from '../color-palette-list-item/color-palette-list-item.component';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-color-palette-list',
  standalone: true,
  imports: [
    ColorPaletteListItemComponent,
    CommonModule,
    MatRippleModule,
  ],
  templateUrl: './color-palette-list.component.html',
  styleUrls: ['./color-palette-list.component.scss']
})
export class ColorPaletteListComponent {
  public colorPaletteService = inject(ColorPaletteService);

  public load(hexColor: string) {
    this.colorPaletteService.currentHexColor.set(hexColor);
  }
}
