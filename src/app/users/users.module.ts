import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import { UserAddComponent } from './user-add/user-add.component';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [UsersComponent, UserAddComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        MatChipsModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule
    ]
})
export class UsersModule { }
