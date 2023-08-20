import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { DrawerService } from './services/drawer.service';
import { BreakpointService } from './services/breakpoint.service';
import { MatIconModule } from '@angular/material/icon';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { MatDividerModule } from '@angular/material/divider';
import { ColorPaletteListComponent } from './components/color-palette-list/color-palette-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ColorPaletteListComponent,
    ColorPickerComponent,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatDrawer) public drawer!: MatDrawer;

  private drawerService = inject(DrawerService);
  public breakpointService = inject(BreakpointService);

  ngAfterViewInit() {
    this.drawerService.drawer = this.drawer;
  }

  public toggleDrawer() {
    this.drawerService.drawer?.toggle();
  }
}
