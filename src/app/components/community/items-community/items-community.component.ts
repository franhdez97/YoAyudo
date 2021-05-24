import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-community',
  templateUrl: './items-community.component.html',
  styleUrls: ['./items-community.component.sass']
})
export class ItemsCommunityComponent implements OnInit {

  @Input() item: number = -1;

  constructor() { }

  ngOnInit(): void {
  }

}
