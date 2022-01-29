import { Component, OnInit } from '@angular/core';
import { Details } from 'src/app/model';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  historyData: Details[] = [];
  
  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.historyService.getHistory().then(data => {
      this.historyData = data;
    })
  }

  onClear(){
    this.historyService.removeHistory();
    this.historyService.getHistory().then(data => {
      if(!data) this.historyData = [];
    })
  }

}
