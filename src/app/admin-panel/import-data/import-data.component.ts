import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataDownloaderService } from 'src/app/data-downloader.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  done = false;
  file: File;

  constructor(public router: Router, private dataService: DataDownloaderService) { }

  ngOnInit(): void {
    this.checkIfAdmin();

  }

  validate() {
    this.checkIfAdmin();

    let name = this.nameInput.nativeElement.value;
    //let file: File = this.fileInput.nativeElement.files;

    this.dataService.importTable(name, this.file).subscribe((data: any) => {
      this.done = true;
      console.log(data);
    },
      error => {
        this.done = true;
        console.log(error);
      });
  }

  handleFileInput(files: FileList) {
    this.file = files.item(0);
  }

  checkIfAdmin() {
    let sessionUser = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (sessionUser == null || sessionUser.role != 'admin') {
      this.router.navigate(['/shop']);
    }
  }

}