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
	<%
	request.setCharacterEncoding("UTF-8");
	String[] gender= request.getParameterValues("gender");
	
	int total=0;
	
	try{
	for(int i=0;i<gender.length;i++){
		out.println(gender[i]);
		if(gender[i].equals("여자")){
			int start= Integer.valueOf(request.getParameter("f_start_num"));
			int end= Integer.valueOf(request.getParameter("f_end_num"));
			String num =request.getParameter("f_not_num").replaceAll(" ","");
			String[] numArray;
			int not_num = 0;
			if(!num.equals("")){
				numArray=num.split(",");
				not_num=numArray.length;
			}
			

			total+= end - start +1 - not_num;
			
			
		}else if(gender[i].equals("남자")){
			int start= Integer.valueOf(request.getParameter("m_start_num"));
			int end= Integer.valueOf(request.getParameter("m_end_num"));
			String num =request.getParameter("m_not_num").replaceAll(" ","");
			String[] numArray;
			int not_num = 0;
			if(!num.equals("")){
				numArray=num.split(",");
				not_num=numArray.length;
			}
			

			total+= end - start +1 - not_num;
			
		}
	}

	}catch(Exception e){
		e.printStackTrace();
	}
	

%>



	<form action="table.jsp">
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
						가기</button> <input type="reset" value="다시 작성"> <input type="submit"
					value="다음으로">
				</td>
			</tr>

		</table>
	</form>
</body>
</html>
