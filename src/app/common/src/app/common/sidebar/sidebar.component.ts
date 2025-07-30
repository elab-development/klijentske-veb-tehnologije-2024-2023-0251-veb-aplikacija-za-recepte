import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface SidebarItem {
  label: string;
  route: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() isOpen: boolean = true;
  @Input() title: string = '';
  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() toggleSidebar = new EventEmitter<boolean>();

  onItemClick(item: SidebarItem): void {
    if (!item.disabled) {
      this.itemClick.emit(item);
    }
  }

  onToggle(): void {
    this.isOpen = !this.isOpen;
    this.toggleSidebar.emit(this.isOpen);
  }
}
