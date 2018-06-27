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
    
    if(dragObject.parentElement.id.includes("seat")){
    	//dragObject.parentElement.name="seat";
    	dragObject.parentElement.setAttribute("name","seat");

    	dragObject.parentElement.className="seat";
    	dragObject.parentElement.innerHTML="";
    }

    var id = dragObject.id.replace("male_num_","");
    id = id.replace("fe","");
    dragObject.innerHTML=id;
//
//    
//    ev.target.draggable="true";
//    ev.target.addEventListener("dragstart", function(e){
//		drag(e);
//	});
    
    if(ev.target.id.includes("num-list")){
    	ev.target.appendChild(dragObject);
    	dragObject.style.position="static";
		
    	return;
    }
    ev.target.innerHTML = "<input type='text' id='num_"+ev.target.id+"' name='fix' value='"+dragObject.id+"' hidden='true'>";
    ev.target.setAttribute("name","fix_seat");

    ev.target.className="fix-seat";
   // alert(ev.target.id);
    	if(ev.target.id.includes("seat")){
    		ev.target.appendChild(dragObject);
    		dragObject.style.position="absolute";
    		dragObject.style.top="0.8em";
    		
    		dragObject.style.right="0.33em";
    		//TODO:자리에 이미 있는
    		//check(ev.target.id);
    		return;
    	}
		dragObject.style.position="static";

        ev.target.appendChild(dragObject);

  
}

var placeArray;
var already="";
var fix_already="";
var female_index=0;
var male_index=0;
var option;


function init(row,col){
	female_index=0;
	male_index=0;
	
	var num_list = document.getElementById("num-list");
	num_list.innerHTML="";
	
	placeArray = new Array(row); // 매개변수는 배열의 크기
	already="";
	fix_already="";
	for (var i = 0; i < row; i++) {
		placeArray[i] = new Array(col); // 매개변수는 배열의 크기
	}
	
	for(var i=0;i<row;i++){
		for(var j=0;j<col;j++){
			placeArray[i][j]="y_";
			//console.log(placeArray[i][j]);
		}
	}
	
	
	var fix_seat = document.getElementsByName("fix_seat");
	
	for(var i=0;i<fix_seat.length;i++){
		var seat_key = fix_seat[i].id.replace("seat","").split("_");
		//alert(fix_seat[i].id);
		var seat_num = document.getElementById("num_"+fix_seat[i].id);
		

		placeArray[Number(seat_key[0])][Number(seat_key[1])]=seat_num.value;
		if(seat_num.value.includes("female_")){
			
			female_index++;
		}else{
			male_index++;
		}
		fix_already+=","+seat_num.value;

	}
	
	
	var space_seat = document.getElementsByName("space_seat");
	
	for(var i=0;i<space_seat.length;i++){
		var seat_key = space_seat[i].id.replace("seat","").split("_");
		//alert(seat_key[0]+","+seat_key[1]);

		placeArray[Number(seat_key[0])][Number(seat_key[1])]="n_";

	}
	
	
	for(var i=0;i<row;i++){
		for(var j=0;j<col;j++){
			console.log("["+i+"]"+"["+j+"]"+placeArray[i][j]);
		}
	}
	
	
}

var option;
var space_num;

var female_array;
var female_count;
var male_array;
var male_count;

function randomSeat(option,row,col,space,female_number,male_number){
	init(row,col);
	
	space_num=space;
	
	female_array = female_number.split(",");

	female_count = female_array.length-1;
	
	male_array = male_number.split(",");

	male_count = male_array.length-1;
	
	
	var isBothChecked=true;
	if(female_count>=1 && male_count>=1){
		isBothChecked=true;
	}else{
		isBothChecked=false;

	}

	for(var i=0;i<row;i++){
		for(var j=0;j<col;j++){
			
			if(placeArray[i][j].includes("n_") || placeArray[i][j].includes("num")){
				continue;
			}else{
				
				var gender_ran = 0;
				
				if(isBothChecked){//둘다 체크라면
					switch(option){
					case 0:
						CheckedOption(0,i,j);
						break;
					case 1:
						CheckedOption(1,i,j);
						break;
					case 2:	//상관없음 선택했을경우
						CheckedOption(2,i,j);
						break;

						default:
							break;
					}
					
				}else{
					
					if(male_count>=1){//남자만
						onlyOne("male",male_array,male_count,i,j);
					}
					else{//여자만
						onlyOne("female",female_array,female_count,i,j);
					}

					
					
					
				}

				
			}
		}
	}
	
}

function CheckedOption(option,i,j){//다른 성별 짝으로
	var count=0;
	var gender="";
	var num_array;
	
	var flag=0;

	while(flag==0){

		flag=1;
		
	var gender = getGender(option,i,j);
	
//	alert("space_num"+space_num);

	if(gender=="male"){
		count=male_count;
		num_array=male_array;
		
	}
	else{
		count=female_count;
		num_array=female_array;
		
	}
	
		//alert(count);
	var ran = Math.floor(Math.random() * count);
	//console.log("."+gender+ran+","+" : already"+already);
	//alert("."+gender+"["+ran+"]"+num_array[ran]+","+" : already"+already);


	if(already.includes("."+gender+ran+",")){
		flag=0;
		//alert("already true");
		continue;
	}
	if(fix_already.includes(","+gender+"_num_"+num_array[ran])){
		flag=0;
		//alert("fix true");

		continue;
	}

	var td = document.getElementById("seat"+i+"_"+j);
	var div = document.createElement('div');
	
	if(gender == "male"){//남자라면
		div.setAttribute("id","male_num_"+num_array[ran]);
		div.setAttribute("class","male_num");

	}else{
		div.setAttribute("id","female_num_"+num_array[ran]);
		div.setAttribute("class","female_num");
	}
	div.setAttribute("draggable","true");
	div.draggable="true";

	div.addEventListener("dragstart", function(e){
			drag(e);
	});
	div.innerHTML=num_array[ran];
	
	div.style.position="absolute";
	div.style.top="0.8em";
	
	div.style.right="0.33em";

	td.appendChild(div);
	already+="."+gender+ran+",";
	//alert("."+gender+ran+","+" : already"+already);

	if(gender=="female"){
		female_index++;
	}else{
		male_index++;

	}
	placeArray[i][j]=gender+"_num_"+num_array[ran];

	}
}


function getGender(option,i,j){
	var gender;
	if(female_index>=female_count){
		gender="male";
	}else if(male_index>=male_count){
		gender="female";

	}else if(option==2){
		var gender_ran = Math.floor(Math.random() * 2);//0또는 1

		if(gender_ran==0){
			gender="male";

		}else{
			gender="female";

		}
	}
	else{
		
		var gender_ran = Math.floor(Math.random() * 2);//0또는 1
		if(j==0 || j%(space_num-1)==0){
			//alert("첫번째 의");
			if(gender_ran==0){
				gender="male";

			}else{
				gender="female";

			}
		}else{//왼쪽 애랑 비교 
			//alert(placeArray[i][j-1]);
			if(placeArray[i][j-1].includes("female_")){
				if(option==1)
					gender="male";
				else
					gender="female";


			}else if(placeArray[i][j-1].includes("male_")){
				if(option==1)
					gender="female";
				else
					gender="male";

			}else{
				var gender_ran = Math.floor(Math.random() * 2);//0또는 1

				if(gender_ran==0){
					gender="male";

				}else{
					gender="female";

				}
			}
		}
	}
	
	return gender;
}

function onlyOne(gender,num_array,count,i,j){
	
	
	var flag=0;
	
	
	
	while(flag==0){
		flag=1;
		//alert(count);
	var ran = Math.floor(Math.random() * count);

	if(already.includes("."+ran+",")){
	//	alert("."+ran+","+" : already"+already);
		flag=0;
		continue;
	}
	if(fix_already.includes(gender+"_num_"+num_array[ran])){
		flag=0;
		continue;
	}
	
	var td = document.getElementById("seat"+i+"_"+j);
	var div = document.createElement('div');
	
	if(gender == "male"){//남자라면
		div.setAttribute("id","male_num_"+num_array[ran]);
		div.setAttribute("class","male_num");

	}else{
		div.setAttribute("id","female_num_"+num_array[ran]);
		div.setAttribute("class","female_num");
	}
	div.setAttribute("draggable","true");
	div.draggable="true";

	div.addEventListener("dragstart", function(e){
			drag(e);
	});
	div.innerHTML=num_array[ran];
	
	div.style.position="absolute";
	div.style.top="0.8em";
	
	div.style.right="0.33em";

	td.appendChild(div);
	already+="."+ran+",";
	placeArray[i][j]=gender+"_num_"+num_array[ran];
	}
}



