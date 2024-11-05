import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  returnToHome() {
    this.router.navigate([`/details/dashboard`]);
  }
  
  logout(): void {
    // Clear any authentication tokens or user data here
    localStorage.removeItem('authToken'); // Example: Remove token from localStorage

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
