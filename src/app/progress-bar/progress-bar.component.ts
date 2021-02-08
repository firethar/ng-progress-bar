import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  _progressValue: number = 0;
  
  @Input() set progressValue(value: number) {
    this._progressValue = value;
  }
  
  get progressValue(): number {
    return this._progressValue;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
