import { Component } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.css'
})
export class DataViewerComponent {
  data: any;

  constructor(private dataService: DataService) {
  }

  fetchData() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  ngOnInit() {
    this.fetchData();
  }
}
