import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css']
})
export class VotesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onVoteClicked() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will use your voice and you can only use it once!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I will vote!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Success!',
          'Your voice has been heard!',
          'success'
        )
      }
    });
  }

}
