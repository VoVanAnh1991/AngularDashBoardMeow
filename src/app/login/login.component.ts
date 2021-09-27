import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  adminCode: string;
  validCode: boolean = true;
  thirdTime: boolean = false;


  constructor( public authService: AuthService ) { 
    authService.getAdminCode().subscribe( (value) => {
      this.adminCode = value.payload.data().adminCodes;
      if (this.adminCode.length == 0 )
        this.validCode = true;
      else
        for ( let i = 1; i <= 3; i++) {
          let code = window.prompt('Input Admin Code:');

          if (this.adminCode.includes(code)) {
            break;   
          } else {
            if (code) {
              (this.validCode = false && alert('Wrong admin code!'))
              i == 3 ? this.thirdTime = true : this.thirdTime = false;
            }
            else break;

          }
        }
    });
  }

  ngOnInit(): void {  
  }
}
