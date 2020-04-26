import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html'})
export class GraficoDonaComponent implements OnInit {

  @Input() leyenda = 'Leyenda';
  @Input('chartLabels') doughnutChartLabels = [];
  @Input('chartData') doughnutChartData = [];
  @Input('chartType') doughnutChartType = '';

  constructor() { }

  ngOnInit(): void {
  }

}
