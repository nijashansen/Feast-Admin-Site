import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [UsersComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        MatListModule
    ]
})
export class UsersModule { }
