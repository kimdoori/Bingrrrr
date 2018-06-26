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
	String 


%>



	<form action="table.jsp">
		<table border="1" id="input-table">

			<tr>
				<td>
				
				<select name="line">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
				</select> 
				줄
				
				<select name="group">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
				</select>
				분단
				</td>
			</tr>
			<tr>
				<td>
					
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
