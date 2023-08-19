import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
  ],
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent {
  public colorPaletteService = inject(ColorPaletteService);
}
