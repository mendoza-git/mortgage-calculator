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
  yearlyInterestArray= [];
  yearlyPrincipalArray= [];


  constructor() {}

  num_payments(){
    if(isNaN(this.numYears)){

      return "0";
    }
    else{
      return ""+this.numYears*12;
    }
  }

  calculate_principal(){
    if(isNaN(this.loanAmount) || isNaN(this.interestRate) || isNaN(this.numYears)){
      return "0";
    }else{
      this.n = this.numYears * 12;
      this.rate = this.interestRate / 1200.0;
      this.total_months = this.numYears * 12;

      this.total_principal = (Math.round(( this.loanAmount * ( this.rate * Math.pow((1 + this.rate), this.n))) / (Math.pow((1+this.rate), this.n) - 1)) * this.total_months);
      return this.total_principal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  }

  calculate_monthly_payments() {
    if(isNaN(this.loanAmount) || isNaN(this.interestRate) || isNaN(this.numYears)){
      return "0";
    }
    else{
      this.monthly_payment = (Math.round(( this.loanAmount * ( this.rate * Math.pow((1 + this.rate), this.n))) / (Math.pow((1+this.rate), this.n) - 1)));
      return this.monthly_payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  }

  calculateAmorization() {
    document.getElementById('house').style.visibility='hide';
    this.ngOnInit();
    var user_loan_amount = parseFloat((<HTMLInputElement>document.getElementById("userLoanAmount")).value);
    var user_interest_rate = parseFloat((<HTMLInputElement>document.getElementById("userInterest")).value);
    var user_months = parseFloat((<HTMLInputElement>document.getElementById("userYears")).value) * 12;
    var years = parseFloat((<HTMLInputElement>document.getElementById("userYears")).value);

    var month_counter = 1;
//    var year_counter = 1;
/*
    while(year_counter <= years) {
      this.paymentsArray.push(year_counter);
      year_counter++;
    }
*/
    while(month_counter <= user_months) {
      if(month_counter % 12 == 0){
          this.paymentsArray.push(month_counter/12);
      }

      month_counter++;
    }


    month_counter = 0;
  //  year_counter = 0;

    var ir;
    var pl;
    var remaining_balance = user_loan_amount;
    var c = user_interest_rate / 1200.0;
    var l = user_loan_amount;
    var p = l * ((c * Math.pow((1 + c), user_months)) / (Math.pow((1 + c), user_months) - 1))
    month_counter = user_months;

    while(month_counter > 0) {
      ir = remaining_balance * c;
      console.log("interest: " + ir);

      pl = p - ir;
      if(month_counter % 12 == 0){
        console.log("principal: " + pl.to);
        this.principalArray.push(pl);
        this.interestArray.push(ir);
      }
      remaining_balance = remaining_balance - pl;
      month_counter--;
      //console.log("remaining: " + remaining_balance);
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
            fill: false,
            backgroundColor: [
                'rgba(75, 192, 192, 1)'
              /*
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                */
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)'
              /*
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                */
            ],
            borderWidth: 2,
            responsiveAnimationDuration: 500
        },{
          label: 'Principal Amount',
          data: this.principalArray,
          fill: false,
          backgroundColor: [
            'rgba(255,99,132,1)'
          ],
          borderColor: [
            'rgba(255,99,132,1)'
            /*
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
              */
          ],
          borderWidth: 2,
          responsiveAnimationDuration: 500
      }
      ]

    },
    options: {
      title: {
      fontSize: 20,
        display: true,
        text: 'Payment Breakdown'
      },
      scales: {
         yAxes: [{
           scaleLabel: {
             display: true,
             labelString: 'Amount in Dollars'
           },
           ticks: {
             beginAtZero:true,
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '$' + value;
                }
            },
            type: 'linear'

         }],
         xAxes: [{
           scaleLabel: {
             display: true,
             labelString: 'Years'
           },
           beginAtZero:true,
           ticks: {
    //         max: 10,
    //         min:0,

            // stepSize:1,
          //   autoSkip:true,
          //   maxTicksLimit: 10
           },
           time: {
              // unit: 'month'
           },
           //type: 'time',
          // distribution: 'series'
      //     type:'linear'

         }]
       }
    }
});

  }

}
