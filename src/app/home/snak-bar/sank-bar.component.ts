import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";


export const fail = 'fail';
export const success = 'success';

@Component({
  selector: 'app-snak-bar',
  templateUrl: './sank-bar.component.html',
  styleUrls: ['./sank-bar.component.css']
})
export class SankBarComponent implements OnInit {

  styleClass: string;
  reason: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.styleClass = this.data.styel;
    this.reason = this.data.reason;
    console.log(data.styel);
  }

  ngOnInit(): void {

  }

}
