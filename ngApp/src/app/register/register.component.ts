import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = { email: ' ', password: ' ', role: ' ', points: 0 };
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        (res: any) => {
          console.log(res)
          localStorage.setItem('token', res.token)
          localStorage.setItem('role', res.role)
          localStorage.setItem('points', res.points)

          // if (localStorage.getItem('role') === 'Beneficiary') {
          //   res.points = res.points + 1
          // }
          this._router.navigate(['/special'])
        },
        err => console.log(err)
      )
  }
}
