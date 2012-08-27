function loadSettings(){
	if(localStorage.mIncome!='' && localStorage.mIncome !='undefined')
	{	$('#monthly-income').val(localStorage.mIncome); }
	if(localStorage.dPayment != 'undefined' && localStorage.dPayment != '')
	{	$('#down-payment').val(localStorage.dPayment) }
	if(localStorage.mTerm != '' && localStorage.mTerm != 'undefined')
	{	$('#m-term').val(localStorage.mTerm) }
	if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
	{	$('#slider-purchase').val(localStorage.pSlider);
		$('#slider-purchase').slider('refresh'); }
	if(localStorage.rslider != '' && localStorage.rslider != 'undefined')
	{	$('#slider-rate').val(localStorage.rslider); 
		$('#slider-rate').slider('refresh');	
	}
}
function loadOutputSettings(){
	if(localStorage.mIncome!='' && localStorage.mIncome !='undefined')
	{	$('#monthly-income-o').val(localStorage.mIncome); }
	if(localStorage.dPayment != 'undefined' && localStorage.dPayment != '')
	{	$('#down-payment-o').val(localStorage.dPayment) }
	if(localStorage.mTerm != '' && localStorage.mTerm != 'undefined')
	{	$('#m-term-o').val(localStorage.mTerm) }
	if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
	{	$('#slider-purchase-o').val(localStorage.pSlider);
		$('#slider-purchase-o').slider('refresh'); }
	if(localStorage.rslider != '' && localStorage.rslider != 'undefined')
	{	$('#slider-rate-o').val(localStorage.rslider); 
		$('#slider-rate-o').slider('refresh');	
	}
}
function calculate() {
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
	var dwn_pay_amt = (per_val * dwn_pay / 100);

	// Mortgage Price
	var mog_pri = parseFloat(per_val) - parseFloat(dwn_pay_amt);

	
	var l_val = eval(mog_pri*(mog_rat/12));
	
	var r_val = eval(1-(1/Math.pow((1+(mog_rat/12)),(1*mog_ter*12))));
	
	var val_mp=eval(l_val/r_val);
	
	var frac_of_income =eval((val_mp*100)/mon_inc);
	
//alert('Income: '+mon_inc+"\nD Pay: "+dwn_pay+"\nMor Ter Y"+mog_ter+"\nPur Pri"+per_val+"\nMog Rat"+mog_rat+"\nMog Pri"+mog_pri+"\nval Mp"+val_mp);

	//alert(val_ma+'\n'+val_mp+'\n'+frac_of_income);
	$('#monthly-income-o').val(mog_pri);
	localStorage.modpay=val_mp;
	$('#down-payment-o').val(val_mp);
	$('#m-term-o').val(frac_of_income);
}

function fillOutputSlider(){
	if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
	{	$('#slider-purchase-o').val(localStorage.pSlider);
		$('#slider-purchase-o').slider('refresh'); }
	if(localStorage.rslider != '' && localStorage.rslider != 'undefined')
	{	$('#slider-rate-o').val(localStorage.rslider); 
		$('#slider-rate-o').slider('refresh');	
	}
}

function updateSlider(){
	localStorage.pSlider=$('#slider-purchase-o').val();
	calculate();
}

function updateRate(){
	localStorage.rslider=$('#slider-rate-o').val();
	calculate();
}

// JS Functions For Auto Loan
	function loadAutoOutputSettings(){
		if(localStorage.totalamtfinanced!='' && localStorage.totalamtfinanced !='undefined')
		{	$('#total-amt-financed-o').val(localStorage.totalamtfinanced); }
		if(localStorage.dPayment != 'undefined' && localStorage.dPayment != '')
		{	$('#auto-down-payment-o').val(localStorage.dPayment) }
		if(localStorage.noofmonths != '' && localStorage.noofmonths != 'undefined')
		{	$('#no-of-month-o').val(localStorage.noofmonths) }
		if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
		{	$('#auto-slider-purchase-o').val(localStorage.pSlider);
			$('#auto-slider-purchase-o').slider('refresh'); }
		if(localStorage.rSlider != '' && localStorage.rSlider != 'undefined')
		{	$('#slider-anual-int-rate-o').val(localStorage.rSlider); 
			$('#slider-anual-int-rate-o').slider('refresh');	
		}
	}

	//function for calculating auto loan
	function calculateAutoLoan(){
		//purchase price
        var purchase_val=parseInt(localStorage.pSlider);
		//downpayment 
		var down_pay_val=parseInt(localStorage.dPayment);
		// no of months G10
		var no_of_mon=parseInt(localStorage.noofmonths);
        // total amount financed G8
		var total_amt_financed=purchase_val-down_pay_val;
		// interest rate G13
		var int_rate=parseFloat(localStorage.rSlider);

		//=(G8*(G13/12))/(1-(1+(G13/12))^(-1.0*G10)) (formula for monthly payment)
		var l_val= eval(total_amt_financed*(int_rate/12));
		//alert(l_val);
		var r_val= eval(1-Math.pow((1+(int_rate/12)),(-1.0*no_of_mon)))
		$('#auto-down-payment-o').val(l_val/r_val);
		$('#total-amt-financed-o').val(total_amt_financed);
		$('#no-of-month-o').val(localStorage.noofmonths);
		  
	}
	// calculate total amount financed 
	function getTotalAmountFinanced(){
		return parseInt(localStorage.pSlider)-parseInt(localStorage.dPayment);		
	}
	function putSliderValues(){
		if(localStorage.pSlider != '' && localStorage.pSlider != 'undefined')
		{	$('#auto-slider-purchase-o').val(localStorage.pSlider);
			$('#auto-slider-purchase-o').slider('refresh'); }
		if(localStorage.rSlider != '' && localStorage.rSlider != 'undefined')
		{	$('#slider-anual-int-rate-o').val(localStorage.rSlider); 
			$('#slider-anual-int-rate-o').slider('refresh');	
		}	
	}
/************************GRAPH FUNCTION *************************/

	function calculateGraph(){
		// Purchase Price
		var per_val=parseInt(localStorage.pSlider);
		// Intrest Rate
		var mog_rat=parseFloat(localStorage.rslider);
		//Monthly income
		var mon_inc=parseInt(localStorage.mIncome);
		// Downpayment In %
		var dwn_pay=parseInt(localStorage.dPayment);
		// Mortgage Terme Years
		var mog_ter=parseInt(localStorage.mTerm);
		
		// Downpayment in $$
		var dwn_pay_amt = (per_val * dwn_pay / 100);

		// Mortgage Price
		var mog_pri = parseFloat(per_val) - parseFloat(dwn_pay_amt);

	
		var l_val = eval(mog_pri*(mog_rat/12));
	
		var r_val = eval(1-(1/Math.pow((1+(mog_rat/12)),(1*mog_ter*12))));
	
		var val_mp=eval(l_val/r_val);
	 
		return val_mp;
		
	}

/************************END GRAPH FUNCTION*********************/

/**************************************************************/
/*		Student Loan Functions 			     */
/**************************************************************/

function loadStudentLoanValues(){
	if(localStorage.loanAmount!='' && localStorage.loanAmount !='undefined')
	{	$('#loan-amount-o').val(localStorage.loanAmount);
		$('#loan-amount-o').slider('refresh'); }
	if(localStorage.noofMonth != 'undefined' && localStorage.noofMonth != '')
	{	$('#monthly-payment').val(localStorage.noofMonth) }
	if(localStorage.interestRate != '' && localStorage.interestRate != 'undefined')
	{	$('#interest-rate-o').val(localStorage.interestRate) 
		$('#interest-rate-o').slider('refresh');	}
}
function calculateStudentLoan(){
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

	var monthly_pay=l_val/r_val;
	
	alert(monthly_pay);
}


