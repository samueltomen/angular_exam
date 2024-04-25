import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../data.service";

@Component({
  selector: 'app-data-exporter',
  template: `
    <div class="d-flex flex-wrap flex-md-wrap w-50 py-2">
      <span class="p-1" *ngFor="let user of users">{{ user.firstName }} {{ user.lastName }}</span>
    </div>
    <button class="btn btn-primary" (click)="downloadJson()">Télécharger JSON</button>
  `
})
export class DataExporterComponent implements OnInit {
  users: Array<{ firstName: string; lastName: string }> = [];

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.userDataService.fetchUsers().subscribe(users => {
      this.users = users;
    });
  }

  downloadJson() {
    const fileName = "users.json";
    const json = JSON.stringify(this.users);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
}
