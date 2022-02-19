import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  user: User | undefined;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(data => {
      if(data) this.user = data;
    })
  }

  signOut(){
    this.auth.signOut();
    this.user = undefined;
  }
}
