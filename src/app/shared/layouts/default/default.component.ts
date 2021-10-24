import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  sidebarOpen = true;
  
  constructor(
    private authService: AuthService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  sidebarToggle () {
    this.sidebarOpen = !this.sidebarOpen;
  };
}
