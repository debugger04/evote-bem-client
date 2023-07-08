import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    userID: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    org: new FormControl(this.checkRegisterOrg())
  });

  constructor(private readonly userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  checkRegisterOrg(): string {
    const sess = sessionStorage.getItem('role');
    if (sess === 'adminops') {
      return 'committee';
    }
    return 'voter';
  }

  onRegister() {
    const requestBody = {
      data: this.registerForm.value
    }
    this.userService.register(requestBody).subscribe({
      next: (res: any) => {
        const result = JSON.parse(res);
        if (result.success) {
          Swal.fire(
            'Sign Up Succesful!',
            'Account Successfully Created',
            'success'
          );
          window.location.reload();
        }
      },
      error: (err: any) => {
        const error = JSON.parse(err);
        if (error.status == 409) {
          Swal.fire(
            'Sign Up Failed!',
            'Username already existed',
            'error'
          );
        }
        Swal.fire(
          'Sign Up Failed!',
          `${err.message}`,
          'error'
        );
      }  
    });
  }

}
