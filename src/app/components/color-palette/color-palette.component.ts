import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPaletteService } from 'src/app/services/color-palette.service';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent {
  public colorPaletteService = inject(ColorPaletteService);
}
