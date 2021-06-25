import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-display-items',
  templateUrl: './display-items.component.html',
  styleUrls: ['./display-items.component.css']
})
export class DisplayItemsComponent implements OnInit {

  itemData = [{
    _id: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    }
  }];

  // id : String = "";

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.getItems()
      .subscribe(
        res => this.itemData = res,
        err => console.log(err)
      )
  }

  // claim() {
  //   //this._auth.updatePoints
  // }

  // // checkPoints() {
  // //   if (localStorage.getItem('points') === '1') {

  // //   }

  // //   }

  claim(id: any, i: any) {
    console.log(id)
    let points = localStorage.getItem('points')!;
    let currentPoints = parseInt(points)
    if (currentPoints > 0) {
      this._auth.claimItem(id)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        )
      this.itemData.splice(i, 1);
      localStorage.removeItem('points');
    }
  }


}



