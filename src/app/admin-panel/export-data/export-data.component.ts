import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataDownloaderService } from 'src/app/data-downloader.service';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {

  @ViewChild('select') select: ElementRef;
  tableDoesntExist = false;
  tables = []

  constructor(public router: Router, private dataService: DataDownloaderService) { }

  ngOnInit(): void {
    this.checkIfAdmin();
    this.tables = this.dataService.getTables()
  }

  download() {
    this.checkIfAdmin();

    let name = this.select.nativeElement.value;
    this.dataService.exportTable(name).subscribe((data: any) => {

      let blob = new Blob([data], { type: '.csv' });

      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = name + "TableData.csv";
      link.click();
    },
      error => {
        this.tableDoesntExist = true;
      });
  }

  checkIfAdmin() {
    let sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (sessionUser == null || sessionUser.role != 'admin') {
      this.router.navigate(['/shop']);
    }
  }

}
