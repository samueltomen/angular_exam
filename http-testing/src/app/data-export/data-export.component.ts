import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../data.service";

@Component({
  selector: 'app-data-exporter',
  template: `
    <button (click)="fetchData()">Charger les données</button>
    <ul>
      <li *ngFor="let user of users">{{ user.firstName }} {{ user.lastName }}</li>
    </ul>
    <button (click)="downloadJson()">Télécharger JSON</button>
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
