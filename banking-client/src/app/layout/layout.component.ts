import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  activeIndex: number = 1;
  isTargetPage = false;

  constructor() {}

  ngOnInit(): void {
    this.setActiveItem();
  }

  setActiveItem(): void {
    const path = window.location.pathname.split('/').pop() || 'home';
    switch (path) {
      case 'dashboard':
        this.activeIndex = 0;
        break;
      case 'home':
        this.activeIndex = 1;
        break;
      case 'components':
        this.activeIndex = 2;
        break;
      case 'calendar':
        this.activeIndex = 3;
        break;
      case 'charts':
        this.activeIndex = 4;
        break;
      case 'documents':
        this.activeIndex = 5;
        break;
      default:
        this.activeIndex = 1;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setActiveItem();
  }
}
