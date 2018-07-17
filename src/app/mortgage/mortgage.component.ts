import { Component, OnInit } from '@angular/core';
import { Mortgage } from '../mortgage';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.css']
})
export class MortgageComponent implements OnInit {

  /*
  mortgage: Mortgage = {
    loanAmount: 150000,
    interestRate: 4.25,
    numYears: 30,
  };
  */

  loanAmount: number = 150000;
  interestRate: number = 4.25;
  numYears: number = 30;
  n: number;
  rate: number;
  total_months: number;
  
  total_principal: number;
  monthly_payment: number;

  constructor() { }

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
