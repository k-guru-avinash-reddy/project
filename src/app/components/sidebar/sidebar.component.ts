import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  activeRoute: string = '';

  constructor() { }

  ngOnInit() {
  }

  buttons = [
    { title: 'Dashboard', route: 'dashboard' },
    { title: 'LR Form', route: 'lr-form' },
  ];
}
