import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/shared/model/report.model';

@Component({
  selector: 'app-item-community',
  templateUrl: './items-community.component.html',
  styleUrls: ['./items-community.component.sass']
})
export class ItemsCommunityComponent implements OnInit {

  @Input() item: Report = new Report({});

  constructor() { }

  ngOnInit(): void {
  }

}
