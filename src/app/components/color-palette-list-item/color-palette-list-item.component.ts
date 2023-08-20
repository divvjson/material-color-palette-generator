import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-color-palette-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './color-palette-list-item.component.html',
  styleUrls: ['./color-palette-list-item.component.scss']
})
export class ColorPaletteListItemComponent {
  @Input({ required: true }) public hexColor = '';
  public colorPaletteService = inject(ColorPaletteService);

  public delete(event: Event) {
    event.stopPropagation();
    this.colorPaletteService.savedHexColors.update((value) => value.filter(hexColor => hexColor !== this.hexColor));
  }
}
