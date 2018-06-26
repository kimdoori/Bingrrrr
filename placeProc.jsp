<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="js/place.js"></script>

<link rel="stylesheet" href="css/seat.css">
</head>
<body>

	<form action="place.jsp">
		<table border="1" id="input-table">

<tr>
				<td>
			<%
	request.setCharacterEncoding("UTF-8");
	
	
	try{
	String female_number= request.getParameter("female_number").replaceAll(" ","");
	String male_number= request.getParameter("male_number").replaceAll(" ","");
	

	
	
	//out.println("female_number : "+female_number);
	
	if(!female_number.equals("")){
		String[] number=female_number.split(",");
		for(int i=0;i<number.length;i++){
			out.println("<div id='female_num_"+number[i]+"' name='female_num' class='female_num'  draggable='true' ondragstart='drag(event)'>"+number[i]+"</div>");
		}
	}
	//out.println("male_number : "+male_number);
		
	if(!male_number.equals("")){
		String[] number=male_number.split(",");
		for(int i=0;i<number.length;i++){
			out.println("<div id='male_num_"+number[i]+"' name='male_num' class='male_num'  draggable='true' ondragstart='drag(event)'>"+number[i]+"</div>");
		}
	}
	//out.println("row : "+row);
	//out.println("col : "+col);
	//out.println("space_num : "+space_num);


	}catch(Exception e){
		e.printStackTrace();
	}
	
	
	
%>
			</td>
			</tr>


			<tr>
				<td>
					<div id="seat-table">
					<table class="seat_table">
					<%
					String[] space= request.getParameterValues("space");

					int row = Integer.valueOf(request.getParameter("row"));
					int col = Integer.valueOf(request.getParameter("col"));
					int space_num = Integer.valueOf(request.getParameter("space_num"));
					int space_index=0;
					for(int i=0;i<row;i++){
			            int count=1;

						out.println("<tr>");
						for(int j=0;j<col;j++){
							String td = "";
							td="<td name='td' id='td"+i+"_"+j+"'>";
							String div="";
							div="<div id='seat"+i+"_"+j+"' class='seat' ondrop='drop(event)' ondragover='allowDrop(event)'></div>";
							

			    
							String[] space_key = space[space_index].replaceAll("seat","").split("_");
							int space_row = Integer.valueOf(space_key[0]);
							int space_col = Integer.valueOf(space_key[1]);

							if(i==space_row && j==space_col){
								div="<div id='none' class='space'></div>";
								space_index++;
							}
							
							if(count%space_num==0){
								td="<td>";

								div="<div id='none' class='none'></div>";
								j--;
							}
							out.println(td);
							out.println(div);
							count++;
							out.println("</td>");

						}
						out.println("</tr>");

						
					}
					for(int i=0;i<space.length;i++){
						//out.println("space"+i+" : "+space[i]);

					}
					%>
					
					</table>
					</div>

				</td>
			</tr>
			<tr>
				<td>
					<button class="back" type="button" onclick="goBack()">뒤로
						가기</button>
						<button  type="button" onclick="randomSeat(<%=row%>,<%=col%>,<%=space_num%>)">배치하기
						</button>
					<input type="submit" value="저장하기">
				</td>
			</tr>

		</table>
		
	</form>
</body>
</html>
