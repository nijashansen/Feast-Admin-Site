import { Component, OnInit } from '@angular/core';
import {UserService} from "./shared/user.service";
import {Observable} from "rxjs";
import {User} from "firebase";
import {Recipe} from "../recipes/shared/recipe";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
  }



}
