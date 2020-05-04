import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngxs/store';
import {CreateUser} from '../shared/user.action';
import {roles} from "../../../environments/environment";
import {AuthUser} from "../shared/user";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  createForm: FormGroup;

  roles: string[];

  constructor(private store: Store, private fb: FormBuilder) {

    this.roles = [];

    this.roles.push(roles.standard, roles.admin);
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: '',
      email: '',
      password: '',
      role: ''
    });
  }

  signUpWithEmailPassword() {
    const email = this.createForm.value.email;
    const password = this.createForm.value.password;

    const info = {
      name: this.createForm.value.name,
      role: this.createForm.value.role
    } as AuthUser;

    this.store.dispatch(new CreateUser(email, password, info));
  }
}
