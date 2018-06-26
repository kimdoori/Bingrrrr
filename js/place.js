function goBack(){
	history.back();
}
function placeTable(){
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

    	
    	var row_h = document.getElementById("row_h");
    	row_h.value=table_row;
    	
    	var col_h = document.getElementById("col_h");
    	col_h.value=min_seat_num;
    	
    	var space_num = Number(line_num) + 1;

    	var space_num_h = document.getElementById("space_num");
    	space_num_h.value=space_num;
    	
        
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
            	
            	td.innerHTML="<div id='seat"+i+"_"+j+"' class='seat'></div>";
            	
            	if(seat_count>total){
                	td.innerHTML="<div id='seat"+i+"_"+j+"' class='space' draggable='true' ondragstart='drag(event)'>"
                	+"<input type='text' name='space' value='seat"+i+"_"+j+"' hidden='true'>"
                	+"</div>";
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
    
//    dragObject.className ="seat";
//    //dragObject.id="seat";
//    ev.target.className ="space";
//    
//    //ev.target.id ="space";
//
//    dragObject.draggable="false";
//    dragObject.addEventListener("dragstart", function(e){
//		
//	});
    var id = dragObject.id.replace("male_num_","");
    id = id.replace("fe","");
    dragObject.innerHTML=id;
//
//    
//    ev.target.draggable="true";
//    ev.target.addEventListener("dragstart", function(e){
//		drag(e);
//	});
    ev.target.innerHTML = "<input type='text' name='fix' value='"+ev.target.id+"' hidden='true'>";

   // alert(ev.target.id);
    	if(ev.target.id.includes("seat")){
    		ev.target.parentElement.appendChild(dragObject);
    		dragObject.style.position="absolute";
    		dragObject.style.top="1.2em";
    		
    		dragObject.style.right="1em";
    		//TODO:자리에 이미 있는
    		//check(ev.target.id);
    		return;
    	}
		dragObject.style.position="static";

        ev.target.appendChild(dragObject);

  
}




function randomSeat(row,col,space_num){
	var fix = document.getElementsByName("fix");
	//alert(fix[0].value);
	var fix_index=0;
	
	var td = document.getElementsByName("td");
	for(var i=0;i<td.lengtj;i++){
		
		if(fix_index<fix.length){
			 var fix_seat= fix[fix_index].replace("seat").split("_");
			 if(fix_seat[0]==i && fix_seat[1]==j){
				 continue;
			 }
		}
		//랜덤으로 배

	}
	var female_num = document.getElementsByName("female_num");
	
	var male_num = document.getElementsByName("male_num");

	
}
