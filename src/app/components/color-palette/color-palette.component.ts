import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPaletteService } from 'src/app/services/color-palette.service';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Color } from 'src/app/interfaces/color.interface';

@Component({
  selector: 'app-color-palette',
  standalone: true,
  imports: [
    CommonModule,
    MatRippleModule,
    MatSnackBarModule,
  ],
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent {
  public colorPaletteService = inject(ColorPaletteService);
  private snackBar = inject(MatSnackBar);

  public async copyToClipboard(color: Color) {
    await navigator.clipboard.writeText(color.hex);
    this.snackBar.open(`${color.hex} copied to clipboard`, undefined, { duration: 2000 });
  }
}
