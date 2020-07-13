import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modalRef: BsModalRef;

  public data;
  public keyList: string[];

  public isLoading: boolean;
  public isError: boolean;

  public dataToEdit;

  constructor(private dataService: DataService, private modalService: BsModalService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getData().subscribe(data => {
      this.isLoading = false;
      this.data = data;
      this.buildKeysList(this.data);
    }, () => {
      this.isLoading = false;
      this.isError = true;
    });
  }

  // create key list based on object input
  private buildKeysList(data) {
    this.keyList = Object.keys(data);
  }

  public groupDataByKey(key: string) {
    this.data = this.dataService.groupDataByKey(key);
    this.buildKeysList(this.data);
  }

  // update data in the service
  public updateData() {
    this.dataService.updateData(this.dataToEdit);
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>, data) {
    this.dataToEdit = data;
    this.modalRef = this.modalService.show(template);
  }

}
