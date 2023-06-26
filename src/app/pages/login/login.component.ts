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
    voterID: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    org: new FormControl('commitee', Validators.required)
  });

  constructor(private readonly userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.userService.register(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.jwt) {
          Swal.fire(
            'Sign Up Succesful!',
            'Lets try to login with your new account',
            'success'
          );
          this.router.navigateByUrl('/login');
          sessionStorage.setItem('token', res.jwt);
          this.router.navigateByUrl('');
        }
      },
      error: (err: any) => {
        Swal.fire(
          'Sign Up Failed!',
          `${err.message}`,
          'error'
        );
      }
    });
  }

}
