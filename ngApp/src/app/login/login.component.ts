import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { email: ' ', password: ' ' };
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        (res: any) => {
          // if (!res.points) {
          //   res.points = 1
          // }
          console.log(res)
          localStorage.setItem('token', res.token)
          localStorage.setItem('role', res.role)
          localStorage.setItem('points', res.points)
          this._router.navigate(['/home'])
        },
        err => console.log(err)
      )
  }

}
