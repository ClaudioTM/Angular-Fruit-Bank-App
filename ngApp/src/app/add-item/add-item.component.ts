import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  addItemData = { name: ' ', description: ' ' };
  //   name: {
  //     type: String
  //   },
  //   description: {
  //     type: String
  //   }
  // }

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  addItem() {
    this._auth.addItem(this.addItemData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

}
