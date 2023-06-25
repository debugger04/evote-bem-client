import { Component, OnInit } from '@angular/core';
import { VoteService } from 'src/app/service/vote.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private voteService: VoteService) { }

  ngOnInit(): void {
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
        this.voteService.logout();
      }
    });
  }
}
