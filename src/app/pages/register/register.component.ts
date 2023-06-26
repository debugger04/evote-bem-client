import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    commiteeId: new FormControl('', Validators.required),
    nrp: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    org: new FormControl('commitee', Validators.required),
  });

  constructor(private readonly userService: UserService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    const formValue = this.registerForm.value;
    let requestBody = {};
    if (formValue.org === 'commitee') {
      requestBody = {
        data: {
          commiteeID: formValue.nrp,
          email: formValue.email,
          password: formValue.password,
          org: formValue.org,
        }
      }
    } else {
      requestBody = {
        data: {
          voterID: formValue.nrp,
          email: formValue.email,
          password: formValue.password,
          org: formValue.org,
        }
      }
    }
    
    this.userService.register(requestBody).subscribe({
      next: (res: any) => {
        if (res.success) {
          Swal.fire(
            'Sign Up Succesful!',
            'Lets try to login with your new account',
            'success'
          );
          this.router.navigateByUrl('/login');
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
