import { Component, OnInit } from '@angular/core';
import { Mortgage } from '../mortgage';

@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.css']
})
export class MortgageComponent implements OnInit {

  mortgage: Mortgage = {
    loanAmount: 150000,
    interestRate: 4.25,
    numYears: 30
  }

  n = this.mortgage.numYears * 12;
  rate = this.mortgage.interestRate / 1200;
  total_months = this.mortgage.numYears * 12;

  monthly_payment = (Math.round(( this.mortgage.loanAmount * ( this.rate * Math.pow((1 + this.rate), this.n))) / (Math.pow((1+this.rate), this.n) - 1)));
  total_principal = (Math.round(( this.mortgage.loanAmount * ( this.rate * Math.pow((1 + this.rate), this.n))) / (Math.pow((1+this.rate), this.n) - 1)) * this.total_months);


  constructor() { }

  ngOnInit() {
  }

}
