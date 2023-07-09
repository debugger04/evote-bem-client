import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  role: string = '';

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.role = this.userService.getRole();
  }

  onLogout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
      }
    });
  }
}
