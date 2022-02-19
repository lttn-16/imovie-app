import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(public auth: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(data => {
      if(data) this.router.navigate(['/']);
    });
  }

}
