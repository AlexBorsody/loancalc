/*===================FUNCTIONS FOR MORTGAGE LOAN===============*/
function saveLoanValues(){
	localStorage.clear();
	//alert(localStorage.length);
	localStorage.mIncome=$('#monthly-income').val();
	localStorage.dPayment=$('#down-payment').val();
	localStorage.mTerm=$('#mortgage-term').val();
	localStorage.pSlider=$('#input-slider-purchase').val();
	localStorage.rslider=$('#input-slider-rate').val();
	//alert(localStorage.length);
}
function getDefaultValue(){
	//alert('');
	$('#input-slider-purchase').val(200000);
	$('#input-slider-purchase').slider('refresh');
	$('#input-slider-rate').val(5);
	$('#input-slider-rate').slider('refresh');
}

function loadSettings(){
	if(localStorage.mIncome!='' && localStorage.mIncome !='undefined')
	{	$('#total-amt').val(localStorage.mIncome); }
	if(localStorage.dPayment != 'undefined' && localStorage.dPayment != '')
	{	$('#mortgage-payment').val(localStorage.dPayment) }
	if(localStorage.mTerm != '' && localStorage.mTerm != 'undefined')
	{	$('#percent-income').val(localStorage.mTerm) }
	if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
	{	$('#input-slider-purchase').val(localStorage.pSlider);
		$('#input-slider-purchase').slider('refresh'); }
	if(localStorage.rslider != '' && localStorage.rslider != 'undefined')
	{	$('#input-slider-rate').val(localStorage.rslider); 
		$('#input-slider-rate').slider('refresh');	
	}
}
function calculate() {
	// Income
	var mon_inc=parseInt(localStorage.mIncome);
	// Downpayment In %
	var dwn_pay=parseInt(localStorage.dPayment);
	// Mortgage Terme
	var mog_ter=parseInt(localStorage.mTerm);
	// Purchase Price

	var per_val=parseInt(localStorage.pSlider);
	// Mortage Rate
	var mog_rat= 25 //parseFloat(localStorage.rslider);
	
	// Downpayment in $$
	var dwn_pay_amt = ((per_val * dwn_pay) / 100);

	//alert(dwn_pay_amt);

	// Mortgage amount
	var mog_pri = parseFloat(per_val) - parseFloat(dwn_pay_amt);

	// Mortage Rate Final
	var mog_rat_fin = parseFloat(mog_rat/12);
	//  MP=(MA*(MR/12))/((1-(1+(MR/12)))^(-1*MT*12))
	
	alert("Mor Rat Fin: "+mog_rat_fin);
	
	var n_val = mog_pri * mog_rat_fin;
	
	
	var d_l_val = 1 - (parseFloat(1) + parseFloat(mog_rat_fin));
		
	
	var flag_minus = 0;
	if(d_l_val<0) {
		flag_minus = 1;
		d_l_val = -1 * d_l_val;
	}

	alert("Den Val: "+d_l_val);
	
	//eval(mog_pri*(mog_rat/12));
	
	
	var d_r_val = mog_ter * 12;
	
	var d_val = Math.pow(d_l_val,d_r_val);
	
	var final_val = n_val * d_val;
	
	alert(n_val+'---------D val'+d_val);
	
	//eval(1-(1/Math.pow((1+(mog_rat/12)),(1*mog_ter*12))));
	
	//var val_mp=eval(d_l_val/r_val);
	
	
	var frac_of_income =eval((final_val/mon_inc)*100);
	var val_mp = final_val;

	$('#total-amt').html(mog_pri);
	localStorage.modpay=val_mp;
	$('#mortgage-payment').html(Math.round(100*val_mp)/100);
	$('#percent-income').html(Math.round(100*frac_of_income)/100);
	if(eval((frac_of_income*0.25)/100)>0.25){
		$('#qualify').html('No');
	}
	else{
		$('#qualify').html('Yes');
	}
}

function qualifiedLoan(){
}

function fillOutputSlider(){
	if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
	{	$('#output-slider-purchase').val(localStorage.pSlider);
		$('#output-slider-purchase').slider('refresh'); }
	if(localStorage.rslider != '' && localStorage.rslider != 'undefined')
	{	$('#output-slider-rate').val(localStorage.rslider); 
		$('#output-slider-rate').slider('refresh');	
	}
}

function updateSlider(){
	localStorage.pSlider=$('#output-slider-purchase').val();
	calculate();
}

function updateRate(){
	localStorage.rslider=$('#output-slider-rate').val();
	calculate();
}
//   Clculation for mortgage graph 
function fillMortgageGraphSlider(){
	if(localStorage.rslider != '' && localStorage.rslider != 'undefined')
	{	$('#graph-slider-rate').val(localStorage.rslider); 
		$('#graph-slider-rate').slider('refresh');	
	}
}
function calculateMotgageGraph(){
	// Income
	var mon_inc=parseInt(localStorage.mIncome);
	// Downpayment In %
	var dwn_pay=parseInt(localStorage.dPayment);

	// Mortgage Terme Years
	var mog_ter=parseInt(localStorage.mTerm);
	// Purchase Price
	var per_val=parseInt(localStorage.pSlider);
	// Intrest Rate
	var mog_rat=parseFloat(localStorage.rslider);
	
	// Downpayment in $$
	var dwn_pay_amt = ((per_val * dwn_pay) / 100);

	//alert(dwn_pay_amt);

	// Mortgage Price
	var mog_pri = parseFloat(per_val) - parseFloat(dwn_pay_amt);
	var l_val = eval(mog_pri*(mog_rat/12));
	var r_val = eval(1-(1/Math.pow((1+(mog_rat/12)),(1*mog_ter*12))));
	var val_mp=eval(l_val/r_val);
	var frac_of_income =eval((val_mp/mon_inc)*100);

	localStorage.modpay=val_mp;
	return val_mp;
}
/*==============================FUNCTIONS FOR AUTO LOAN===================================*/
function saveAutoLoanValues(){
	localStorage.clear();
	localStorage.dPayment=$('#auto-down-payment').val();
	//localStorage.totalamtfinanced=$('#total-amt-financed').val();
	localStorage.noofmonths=$('#num-months').val();
	localStorage.pSlider=$('#input-auto-slider-purchase').val();
	localStorage.rSlider=$('#input-auto-slider-rate').val();
	//alert(localStorage.length);
}

//function for calculating auto loan
function calculateAutoLoan(){
	//purchase price
    var purchase_val=parseInt(localStorage.pSlider);
	//downpayment in percentage
	var down_pay_val=parseFloat(localStorage.dPayment);
	//downpayment in $
	down_pay_val=parseFloat((purchase_val*down_pay_val)/100);
	// no of months G10
	var no_of_mon=parseInt(localStorage.noofmonths);
    // total amount financed G8
	var total_amt_financed=purchase_val-down_pay_val;
	// interest rate G13
	var int_rate=parseFloat(localStorage.rSlider);
	//=(G8*(G13/12))/(1-(1+(G13/12))^(-1.0*G10)) (formula for monthly payment)
	var l_val= eval(total_amt_financed*(int_rate/12));
	var r_val= eval(1-Math.pow((1+(int_rate/12)),(-1.0*no_of_mon)))
	$('#auto-total-amt').html(total_amt_financed);
	$('#auto-monthly-payment').html(Math.round(100*(l_val/r_val))/100);
}
// calculate total amount financed 
function getTotalAmountFinanced(){
	var red_val=(parseInt(localStorage.pSlider)*parseInt(localStorage.dPayment))/100;
	//alert(red_val);
	return parseInt(localStorage.pSlider)-red_val;		
}
function putSliderValues(){
	if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
	{	$('#output-auto-slider-purchase').val(localStorage.pSlider);
		$('#output-auto-slider-purchase').slider('refresh'); }
	if(localStorage.rSlider != '' && localStorage.rSlider != 'undefined')
	{	$('#output-auto-slider-rate').val(localStorage.rSlider); 
		$('#output-auto-slider-rate').slider('refresh');	
	}	
}
//----Function for calculating graph-------//
function calculateAutoLoanGraph(){
		//alert('');
	//purchase price
    var purchase_val=parseInt(localStorage.pSlider);
	//downpayment in percentage
	var down_pay_val=parseFloat(localStorage.dPayment);
	//downpayment in $
	down_pay_val=parseFloat((purchase_val*down_pay_val)/100);
	// no of months G10
	var no_of_mon=parseInt(localStorage.noofmonths);
    // total amount financed G8
	var total_amt_financed=purchase_val-down_pay_val;
	// interest rate G13
	var int_rate=parseFloat(localStorage.rSlider);
	//=(G8*(G13/12))/(1-(1+(G13/12))^(-1.0*G10)) (formula for monthly payment)
	var l_val= eval(total_amt_financed*(int_rate/12));
	var r_val= eval(1-Math.pow((1+(int_rate/12)),(-1.0*no_of_mon)))
	//$('#auto-total-amt').html(total_amt_financed);
	//$('#auto-monthly-payment').html(Math.round(100*(l_val/r_val))/100);
	return Math.round(100*(l_val/r_val))/100;
}
//-----Putting graph slider values---//
function putGraphSliderValues(){
	if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
	{	$('#graph-auto-slider-purchase').val(localStorage.pSlider);
		$('#graph-auto-slider-purchase').slider('refresh'); }
	if(localStorage.rSlider != '' && localStorage.rSlider != 'undefined')
	{	$('#graph-auto-slider-rate').val(localStorage.rSlider); 
		$('#graph-auto-slider-rate').slider('refresh');	
	}	
}
/*======================FUNCTION FOR STUDENT LOAN==================*/
function saveStudentLoanValues(){
	localStorage.clear();
	localStorage.loanAmount=$('#input-slider-loan-amt').val();
	localStorage.noofMonth=$('#num-year').val();
	localStorage.interestRate=$('#annual-interest-rate').val();
	//alert(localStorage.length);
}
function calculateStudentLoan(){
	//alert(localStorage.loanAmount);
	// Loan Amount
	var loanAmt=parseInt(localStorage.loanAmount);
	// No Of Months
	var no_of_year=parseInt(localStorage.noofMonth);
	// Interest Rate
	var int_rate=parseFloat(localStorage.interestRate);
		
	// Calculation here  
	// Formula ==(K6*(K13/12))/(1-(1+(K13/12))^(-1*K10*12))

	var l_val= eval(loanAmt*(int_rate/12));

	var r_val= eval(1-(1/Math.pow((1+(int_rate/12)),(1*no_of_year*12))));

	var monthly_pay=Math.round(100*(l_val/r_val))/100;
	
	$('#std-monthly-payment').html(monthly_pay);
}
function updateLoanAmount(){
	localStorage.loanAmount=$('#output-slider-loan-amt').val();
	calculateStudentLoan();
}
function updateAnnualRate(){
	localStorage.interestRate=$('#output-annual-interest-rate').val();
	calculateStudentLoan();
}
function fillSliderValues(){
	if(localStorage.loanAmount != '' && localStorage.loanAmount != 'undefined')
	{	$('#output-slider-loan-amt').val(localStorage.loanAmount);
		$('#output-slider-loan-amt').slider('refresh'); }
	if(localStorage.interestRate != '' && localStorage.interestRate != 'undefined')
	{	$('#output-annual-interest-rate').val(localStorage.interestRate); 
		$('#output-annual-interest-rate').slider('refresh');	
	}
}
//Graph for student 
function calculateStudentLoanGraph(){
	//alert(localStorage.loanAmount);
	// Loan Amount
	var loanAmt=parseInt(localStorage.loanAmount);
	// No Of Months
	var no_of_year=parseInt(localStorage.noofMonth);
	// Interest Rate
	var int_rate=parseFloat(localStorage.interestRate);
		
	// Calculation here  
	// Formula ==(K6*(K13/12))/(1-(1+(K13/12))^(-1*K10*12))

	var l_val= eval(loanAmt*(int_rate/12));

	var r_val= eval(1-(1/Math.pow((1+(int_rate/12)),(1*no_of_year*12))));

	var monthly_pay=Math.round(100*(l_val/r_val))/100;
	
	return monthly_pay;
}
function putStudentGraphValues(){
	if(localStorage.loanAmount != '' && localStorage.loanAmount != 'undefined')
	{	$('#graph-student-slider-purchase').val(localStorage.loanAmount);
		$('#graph-student-slider-purchase').slider('refresh'); }
	if(localStorage.interestRate != '' && localStorage.interestRate != 'undefined')
	{	$('#graph-student-slider-rate').val(localStorage.interestRate); 
		$('#graph-student-slider-rate').slider('refresh');	
	}	
}
