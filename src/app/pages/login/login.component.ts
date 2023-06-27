import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    userID: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    org: new FormControl('committee', Validators.required)
  });

  constructor(private readonly userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    const requestBody = {
      data: this.loginForm.value
    }
    this.userService.login(requestBody).subscribe({
      next: (res: any) => {
        const result = JSON.parse(res)
        if (result.jwt) {
          sessionStorage.setItem('token', res.jwt);
          this.router.navigateByUrl('');
        }
      },
      error: (err: any) => {
        Swal.fire(
          'Sign In Failed!',
          `${err.message}`,
          'error'
        );
      }
    });
  }

}
