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
    org: new FormControl(this.checkUserOrg(), Validators.required)
  });

  constructor(private readonly userService:UserService, private router:Router) { }

  ngOnInit(): void {}

  checkUserOrg(): string {
    const href: string = this.router.url;
    if (href.includes('admin')) {
      return 'admin';
    } else if (href.includes('committee')) {
      return 'committee';
    }
    return 'voter';
  }

  onForgotPassword() {
    console.log('onForgotPassword clicked');
  }

  onLogin() {
    const requestBody = {
      data: this.loginForm.value
    }
    this.userService.login(requestBody).subscribe({
      next: (res: any) => {
        const result = JSON.parse(res)
        if (result.jwt) {
          sessionStorage.setItem('token', result.jwt);
          sessionStorage.setItem('role', result.org);
          sessionStorage.setItem('username', result.username);
          this.router.navigateByUrl('');
        }
      },
      error: (err: any) => {
        const resultErr = JSON.parse(err);
        Swal.fire(
          'Sign In Failed!',
          'Incorrect Username or Password',
          'error'
        );
      }
    });
  }

}
