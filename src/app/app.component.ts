import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  genders = ['male', 'female'];
  signupForm: FormGroup = new FormGroup({});
  constructor() {}
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        'username': new FormControl('Pavan Nagadiya', Validators.required),
        'email': new FormControl('nagadiyap@gmail.com', [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
    })
  }
  onSubmit() {
    //check if form is valid
    if (!this.signupForm.valid) {
      //show a toast message
      
      return;
    }
    console.log(this.signupForm);
  }
}
