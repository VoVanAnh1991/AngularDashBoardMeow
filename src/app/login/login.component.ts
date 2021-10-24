import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  adminCode: string;
  validCode: boolean = false;
  thirdTime: boolean = false;


  constructor( private authService: AuthService,
                private router: Router,
    ) { 
      this.authService.getAdminCode().subscribe( (value) => {
        this.adminCode = value.data().adminCode;
        if (this.adminCode.length == 0 )
          this.validCode = true;
        else
          for ( let i = 1; i <= 3; i++) {
            let code = prompt('Input Admin Code: ( ' + i + '/3 )' );
  
            if (this.adminCode.includes(code)) {
              this.validCode = true;
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
