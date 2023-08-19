import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  public xsmall$ = signal(false);
  public small$ = signal(false);
  public medium$ = signal(false);
  public large$ = signal(false);
  public xlarge$ = signal(false);
  public handset$ = signal(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(
        (state: BreakpointState) => {
          if (state.breakpoints[Breakpoints.XSmall]) {
            this.xsmall$.set(true);
          } else {
            this.xsmall$.set(false);
          }

          if (state.breakpoints[Breakpoints.Small]) {
            this.small$.set(true);
          } else {
            this.small$.set(false);
          }

          if (state.breakpoints[Breakpoints.Medium]) {
            this.medium$.set(true);
          } else {
            this.medium$.set(false);
          }

          if (state.breakpoints[Breakpoints.Large]) {
            this.large$.set(true);
          } else {
            this.large$.set(false);
          }

          if (state.breakpoints[Breakpoints.XLarge]) {
            this.xlarge$.set(true);
          } else {
            this.xlarge$.set(false);
          }

          if (state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small]) {
            this.handset$.set(true);
          } else {
            this.handset$.set(false);
          }
        }
      );
  }
}
