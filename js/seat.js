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


function placeTable(total){
    var line = document.getElementById("line");
    var line_num = line.options[line.selectedIndex].value;
    
    var group = document.getElementById("group");
    var group_num = group.options[group.selectedIndex].value;
    var min_seat_num = line_num*group_num;
    var table_row=1;
    if(min_seat_num<=total){

    	var seat_table = document.getElementById("seat-table");
        seat_table.innerHTML="";
        
        for(var i=1;i<total+1;i++){
        	if(min_seat_num*i>=total){
        		table_row=i;
        		break;
        	}
        }
        
        var table = document.createElement('table');
        table.className ="seat_table";
        var seat_count=1;

        for(var i=0;i<table_row;i++){
            var count=1;

        	var tr = document.createElement('tr');
        	
        	for(var j=0;j<min_seat_num;j++){
            	var td = document.createElement('td');
            	td.innerHTML="<div class='seat'></div>";
            	var space_num = Number(line_num) + 1;

            	if(seat_count>total){
                	td.innerHTML="<div class='space'></div>";
            	}
            	if(count%space_num==0){
                	td.innerHTML="<div class='none'></div>";
            		j--;
            		seat_count--;
            	}

            	
            	
            	tr.appendChild(td);
            	 count++;
            	 seat_count++;
        	}
        	table.appendChild(tr);

        }
        seat_table.appendChild(table);
        

    }else{
    	alert("인원이 너무 적어 해당 책상 배치로는 학생을 배치할 수 없습니다.");
    }

}