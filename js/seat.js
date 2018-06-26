function goBack(){
	history.back();
}

function choiceGender(gender){
	var check;
	var div;
	if(gender=="male"){
		check = document.getElementById('male-check');
		div = document.getElementById('male-div');
		
	}else{
		check = document.getElementById('female-check');
		div = document.getElementById('female-div');
	}
	
	
	var isChecked = check.checked;
	
	if(isChecked==true){
		div.style.visibility="visible";

	}else{
		div.style.visibility="hidden";

	}
	
	var male = document.getElementById('male-check');
	var female = document.getElementById('female-check');
	var option_div = document.getElementById('gen_option_div');

	if(male.checked == true && female.checked == true){
		option_div.style.display="block";

	}else{
		option_div.style.display="none";

	}
	
}