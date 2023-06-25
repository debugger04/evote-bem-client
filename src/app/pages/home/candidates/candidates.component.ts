import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  candidate = {
    name : "",
    nrp : "",
    faculty : "",
    major : "",
    year : "",
    vision : "",
    jargon : "",
    photo : ""
  }
  
  dummy: string ="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAG1BMVEXMzMyWlpaxsbGcnJyqqqqjo6PFxcW3t7e+vr5Fs8QwAAABKUlEQVR4nO3Wy66DIBQFUHmo/f8vvgpN1aa1mih3stbAnMmOB0Sg6wAAAAAAAAAAAAAAAAAAAAAAAPgXMYUUazl+LC9M3akPs1yaK2V8Ky9M3WmcXzw18Oi6Ye4shzBsygtTtxrTPK1lGqfGPpQXpu43lJf3oe+ez1VZhbnH8jiTaq4vyyGVNZ9D2pTVNIZxfBvI71Rrsf62dU3EOvev8imHnOvPfSbV1jTTZQ53Wxrm/Wg4m2rqMXU0/G4ph80HOZhqKZVdtPu12qcvMJ5PNRRfDe7vPymsGzyaamdYVszuiTCGvl8+ydFUQ3H5hXfP6DRvv+lsqqEUqmd7X25N4e1APJZqat3S+kobN/fYekHMHwfyPQUAAAAAAAAAAAAAAAAAAAAAAHz1B37EBWsRO03hAAAAAElFTkSuQmCC";

  candidateForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required]),
    nrp: new FormControl('', [Validators.required]),
    faculty: new FormControl('', [Validators.required]),
    major: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    vision: new FormControl('', [Validators.required]),
    jargon: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required])
  });


  constructor() { }

  ngOnInit(): void {
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.candidate.photo = reader.result as string;

        reader.readAsDataURL(file);
    }
  }

  onSubmitClicked() {
    Swal.fire({
      title: 'Add camdodate?',
      text: "You will add new candidate and this cannot be reverted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Success!',
          'Candidate added!',
          'success'
        )
      }
    })
  }
}
