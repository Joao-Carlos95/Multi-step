import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Multi-step';
  tailwindcss = true;
  tailwindcss2 = false;

  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;

  formStep1!: FormGroup;

  submited = false
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formStep1 = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone:['', Validators.required]
    })
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formStep1.controls;
  }

  eventDiv() {
    this.tailwindcss = !this.tailwindcss;
  }

  resetSteps() {
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
  }

  nextStep() {
    console.log(this.formStep1.valid);
    this.submited = true
    if (this.step1) {
      if(this.formStep1.valid){
        this.resetSteps();
        this.step2 = true;
      }
    } else if (this.step2) {
      this.resetSteps();
      this.step3 = true;
    } else if (this.step3) {
      this.resetSteps();
      this.step4 = true;
    }
  }

  goBack() {
    if (this.step4) {
      this.resetSteps();
      this.step3 = true;
    } else if (this.step3) {
      this.resetSteps();
      this.step2 = true;
    } else if (this.step2) {
      this.resetSteps();
      this.step1 = true;
    }
  }
}
