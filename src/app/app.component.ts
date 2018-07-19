import { Component } from '@angular/core';
import { Chart} from 'chart.js';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chart: any;
  title = 'Fattie Mae';
  loanAmount: number;
  interestRate: number;
  numYears: number;

  n: number;
  rate: number;
  total_months: number;
  total_principal: number;
  monthly_payment: number;

  paymentsArray = [];
  interestArray = [];
  principalArray = [];


  constructor() {}

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

  calculateAmorization() {
    document.getElementById('house').style.visibility='hide';
    this.ngOnInit();
    var user_loan_amount = parseFloat((<HTMLInputElement>document.getElementById("userLoanAmount")).value);
    var user_interest_rate = parseFloat((<HTMLInputElement>document.getElementById("userInterest")).value);
    var user_months = parseFloat((<HTMLInputElement>document.getElementById("userYears")).value) * 12;
    var years = parseFloat((<HTMLInputElement>document.getElementById("userYears")).value);

    var month_counter = 1;

    while(month_counter <= user_months) {
      this.paymentsArray.push(month_counter);
      month_counter++;
    }

    month_counter = 0;

    var ir;
    var pl;
    var remaining_balance = user_loan_amount;
    var c = user_interest_rate / 1200.0;
    var l = user_loan_amount;
    var p = l * ((c * Math.pow((1 + c), user_months)) / (Math.pow((1 + c), user_months) - 1))

    while(remaining_balance >= 0) {
      ir = remaining_balance * c;
      console.log("interest: " + ir);
      this.interestArray.push(ir);
      pl = p - ir;
      console.log("principal: " + pl);
      this.principalArray.push(pl);
      remaining_balance = remaining_balance - pl;
      console.log("remaining: " + remaining_balance);
    }

    this.ngOnInit();
    
    return 0;
  }


  ngOnInit() {
    this.chart = new Chart('canvas', {
    type: 'line',
    data: {
        labels: this.paymentsArray,
        datasets: [{
            label: 'Interest Amount',
            data: this.interestArray,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
          label: 'Principal Amount',
          data: this.principalArray,
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }
      ]
        
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

  }
   
}

