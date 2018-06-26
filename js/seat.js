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
            	
            	td.addEventListener("drop", function(e){
            	    drop(e);
            	});
            	td.addEventListener("dragover", function(e){
            		allowDrop(e);
            	});
            	
            	td.innerHTML="<div id='seat"+i+j+"' class='seat'></div>";
            	var space_num = Number(line_num) + 1;
            	
            	if(seat_count>total){
                	td.innerHTML="<div id='seat"+i+j+"' class='space' draggable='true' ondragstart='drag(event)'></div>";
            	}
            	if(count%space_num==0){
                	td.innerHTML="<div id='none' class='none'></div>";
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


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    
    
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var dragObject = document.getElementById(data);
    
    dragObject.className ="seat";
    //dragObject.id="seat";
    ev.target.className ="space";
    
    //ev.target.id ="space";

    dragObject.draggable="false";
    dragObject.addEventListener("dragstart", function(e){
		
	});
    
    ev.target.draggable="true";
    ev.target.addEventListener("dragstart", function(e){
		drag(e);
	});
    
//    if(dragObject.id=="character"){
//    	if(ev.target.id.includes("imageAnswer")){
//    		ev.target.parentElement.appendChild(dragObject);
//    		dragObject.style.position="relative";
//    		dragObject.style.top="-85px";
//    		dragObject.style.left="-20px";
//    		//TODO : 이미지가 있는 테이블에 놓았을 때 
//    		checkImageChinese(ev.target.id);
//    		return;
//    	}
//		dragObject.style.position="static";
//
//        ev.target.appendChild(dragObject);
//
//    }else{
//  
//   	if(ev.target.id == "imageList"){
//   		dragObject.style.width="50px";
//   		dragObject.style.height="50px";
//   		
//   	}else{
//   		dragObject.style.width="100%";
//   		dragObject.style.height="100%";
//   	}
//    
//    ev.target.appendChild(dragObject);
//    }
}