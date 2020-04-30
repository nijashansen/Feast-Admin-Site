import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngxs/store";
import {CreateUser} from "../shared/user.action";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  createForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: '',
      email: '',
      password: ''
    });
  }

  signUpWithEmailPassword() {
    const email = this.createForm.value.email
    const password = this.createForm.value.password
    const name = this.createForm.value.name

    this.store.dispatch(new CreateUser(email, password, name))
  }
}
