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
    name: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    org: new FormControl('commitee', Validators.required),
  });

  constructor(private readonly userService: UserService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  onRegister() {
    const requestBody = {
      data: this.registerForm.value
    }
    console.log('token', sessionStorage.getItem('token'));
    
    // this.userService.register(requestBody).subscribe({
    //   next: (res: any) => {
    //     if (res.success) {
    //       Swal.fire(
    //         'Sign Up Succesful!',
    //         'Lets try to login with your new account',
    //         'success'
    //       );
    //       this.router.navigateByUrl('/login');
    //     }
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     Swal.fire(
    //       'Sign Up Failed!',
    //       `${err.message}`,
    //       'error'
    //     );
    //   }
    // });
  }

}
