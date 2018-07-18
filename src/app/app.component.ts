import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fattie Mae';
  loanAmount: number = 150000;
  interestRate: number = 4.25;
  numYears: number = 30;
  n: number;
  rate: number;
  total_months: number;
    
  total_principal: number;
  monthly_payment: number;

  constructor() { }

  num_payments(){
    this.n = this.numYears * 12;
    return this.n;
  }

  calculate_principal(){
    this.n = this.numYears * 12;
    this.rate = this.interestRate / 1200;
    this.total_months = this.numYears * 12;

    this.total_principal = (Math.round(( this.loanAmount * ( this.rate * Math.pow((1 + this.rate), this.n))) / (Math.pow((1+this.rate), this.n) - 1)) * this.total_months);
    return this.total_principal;
  }

  calculate_monthly_payments() {
    this.monthly_payment = (Math.round(( this.loanAmount * ( this.rate * Math.pow((1 + this.rate), this.n))) / (Math.pow((1+this.rate), this.n) - 1)));
    return this.monthly_payment;

  }

  ngOnInit() {
  }
}

