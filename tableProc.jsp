<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="js/seat.js"></script>
<link rel="stylesheet" href="css/seat.css">
</head>
<body>

	<form action="place.jsp">

	<%
	request.setCharacterEncoding("UTF-8");
	String[] gender= request.getParameterValues("gender");
	
	int total=0;
	String female_number="";
	String male_number="";

	try{
	for(int i=0;i<gender.length;i++){
		out.println(gender[i]);
		if(gender[i].equals("여자")){
			int start= Integer.valueOf(request.getParameter("f_start_num"));
			int end= Integer.valueOf(request.getParameter("f_end_num"));
			String num =request.getParameter("f_not_num").replaceAll(" ","");
			String[] numArray=null;
			int not_num = 0;
			if(!num.equals("")){
				numArray=num.split(",");
				not_num=numArray.length;
			}
			int fe_num = end - start +1 - not_num;
			total+= fe_num;
			int not_index=0;
			for(int j=start;j<=end;j++){
				if(not_num!=0 && not_index<not_num && numArray[not_index].equals(String.valueOf(j))){
					not_index++;
					continue;
				}
				female_number+=j+",";
				
			}
			

			
			
		}else if(gender[i].equals("남자")){
			int start= Integer.valueOf(request.getParameter("m_start_num"));
			int end= Integer.valueOf(request.getParameter("m_end_num"));
			String num =request.getParameter("m_not_num").replaceAll(" ","");
			String[] numArray=null;
			int not_num = 0;
			if(!num.equals("")){
				numArray=num.split(",");
				not_num=numArray.length;
			}
			
			int me_num = end - start +1 - not_num;

			total+= me_num;
			int not_index=0;
			for(int j=start;j<=end;j++){
				if(not_num!=0 && not_index<not_num && numArray[not_index].equals(String.valueOf(j))){
					not_index++;
					continue;
				}
				male_number+=j+",";
				
			}
		}
	}

	}catch(Exception e){
		e.printStackTrace();
	}
	//System.out.println(female_number);

	//System.out.println(male_number);
		out.println("<input type='text' id='space_num' name='space_num' value='"+female_number+"' hidden='true'>");

	out.println("<input type='text' id='female_number' name='female_number' value='"+female_number+"' hidden='true'>");
	out.println("<input type='text' id='male_number' name='male_number' value='"+male_number+"' hidden='true'>");

%>


<input type="text" id="col_h" name="col" value="" hidden="true">
<input type="text" id="row_h" name="row" value="" hidden="true">



		<table border="1" id="input-table">

			<tr>
				<td><select id="line" name="line">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
				</select> 줄 <select id="group" name="group">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
				</select> 분단 <br> <br>
					<button type="button" onclick="placeTable(<%=total%>)">책상
						구성</button></td>
			</tr>
			<tr>
				<td>
					<div id="seat-table">
					</div>
				
				</td>
			</tr>
			<tr>
				<td>
					<button class="back" type="button" onclick="goBack()">뒤로
						가기</button><input type="submit"
					value="다음으로">
				</td>
			</tr>

		</table>
		
	</form>
</body>
</html>
