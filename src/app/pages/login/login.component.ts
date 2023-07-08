import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MailService } from 'src/app/service/mail.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    org: new FormControl(this.checkUserOrg(), Validators.required)
  });

  constructor(private readonly userService:UserService, private router:Router, private readonly mailService:MailService) { }

  ngOnInit(): void {}

  checkUserOrg(): string {
    const href: string = this.router.url;
    if (href.includes('admin')) {
      return 'adminops';
    } else if (href.includes('committee')) {
      return 'committee';
    }
    return 'voter';
  }

  onForgotPassword() {
    this.mailService.sendMail({}).subscribe({
      next: (res: any) => {
        console.log('Success send');
      },
      error: (err: any) => {
        console.log('Fail send');
      }
    });
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
        this.onErrorHandling();
      }
    });
  }

  onErrorHandling() {
    const href: string = this.router.url;
    if (href.includes('admin')) {
      const requestBody = {
        data : {
          name: 'admin',
          userID: uuid(),
          email: 'admin@evote.com',
          password: 'adminpw',
          org: 'adminops',
        }
      }
      this.userService.register(requestBody).subscribe({
        next: (res: any) => {
          Swal.fire(
            'Hi Admin!',
            'We realize that this is your first time logging in, please try to login again after the page is reloaded',
            'question'
          );
          window.location.reload();
          return;
        },
        error: (err: any) => {
          Swal.fire(
            'Something\'s not right',
            'Incorrect Username or Password',
            'error'
          );
        }
      });
    }
    Swal.fire(
      'Sign In Failed!',
      'Incorrect Username or Password',
      'error'
    );
  }
}
