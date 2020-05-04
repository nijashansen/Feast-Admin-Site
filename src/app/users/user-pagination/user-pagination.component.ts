import {Component, OnInit, Output} from '@angular/core';
import {AuthUser} from '../shared/user';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-user-pagination',
  templateUrl: './user-pagination.component.html',
  styleUrls: ['./user-pagination.component.css']
})
export class UserPaginationComponent implements OnInit {

  @Output() users: Observable<AuthUser[]>;
  users$: Observable<AuthUser[]>;

  newArray: AuthUser[] = [];
  lastUser: AuthUser;

  constructor(private fs: AngularFirestore, private auth: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  nextPage() {

  }

  prevPage() {

  }


}
