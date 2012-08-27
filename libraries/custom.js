function saveIncomeValues() {
    localStorage.age = $('#current-age').val();
    localStorage.saving = $('#saving-per-month').val();
    localStorage.income = $('#monthly-income').val();
	localStorage.growthSlider = $('#input-slider-growth').val();
   // localStorage.inflationSlider = $('#input-slider-inflation').val(); 
	//alert(localStorage.income)
} 

function saveIncomeOutputValues() {
    localStorage.growthSlider = $('#output-slider-growth').val();
  //  localStorage.inflationSlider = $('#output-slider-inflation').val(); 
} 

function loadSettings() {
	//alert(localStorage.income);
	if(localStorage.income!='undefined' && localStorage.income!=''){
      $('#monthly-income').val(localStorage.income);
	}else{
	  $('#monthly-income').val('')
	}

	 if(localStorage.saving!='undefined' && localStorage.saving!=''){
    $('#saving-per-month').val(localStorage.saving);
	}else{
	 $('#saving-per-month').val('')
	}

	  if(localStorage.age!='undefined' && localStorage.age!=''){
    $('#current-age').val(localStorage.age);
	}else{
	   $('#current-age').val('')
	}

	  if(localStorage.growthSlider!='undefined' && localStorage.growthSlider!=''){
	$('#input-slider-growth').val(localStorage.growthSlider);
	}else{
	 $('#input-slider-growth').val('')
	}

	/*  if(localStorage.inflationSlider!='undefined' && localStorage.inflationSlider!=''){
    $('#input-slider-inflation').val(localStorage.inflationSlider);
	}else{
	 $('#input-slider-inflation').val('')
	}

*/




	$('#input-slider-growth').slider('refresh');
    $('#input-slider-inflation').slider('refresh');

}

/*  Save alal values on window close */
$(window).unload(saveIncomeValues);


//percent sign function


$(document).ready(function(){
		$('.ui-slider-handle,.ui-slider').mousedown(function(){
			$('.percent').css('display', 'inline-block');
			});
		
		if($('#input-slider-growth').val()!='undefined' && $('#input-slider-growth').val()!=''){
		$('.percent').css('display', 'inline-block');
		}
		});
		

	  

// Prevent container div from scrolling on touch

    document.ontouchmove = function(e) {
        e.preventDefault();
    };
