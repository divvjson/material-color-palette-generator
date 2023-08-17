import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterOutlet } from '@angular/router';
import { ColorPaletteService } from './services/color-palette.service';
import { CommonModule } from '@angular/common';
import { ColorPalette } from './interfaces/color-palette.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  route = inject(ActivatedRoute);
  colorPaletteService = inject(ColorPaletteService);
  currentColorPalette: ColorPalette | null = null;

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        const color = params['color'];
        if (typeof(color) !== 'string') return;
        if (this.colorPaletteService.isValidHexColor(color) === false) return;
        this.currentColorPalette = this.colorPaletteService.generateColorPalette(color, color);
        console.log(this.currentColorPalette);
      }
    );
  }
}
