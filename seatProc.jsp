<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/seat.css">
<script src="js/seat.js"></script>
</head>
<body>
	<form action="table.jsp">
		<table border="1" id="input-table">

			<tr>
				<td style="width:50%;">여자 <input id="female-check" type="checkbox" name="gender"
					value="여자" onclick="choiceGender('female')" checked>
					<hr> <br>
					<div id="female-div" style="display:block;">

						시작번호 <input type="text" name="f_start_num"
							style="display: inline;"><br> 끝번호 <input type="text"
							name="f_end_num" style="display: inline;"><br> 결번 <input
							type="text" name="f_not_num" placeholder=",단위로 입력해주세요"
							style="display: inline;">
					</div>
				</td>
				<td style="width:50%;">남자 <input id="male-check" type="checkbox" name="gender"
					value="남자" onclick="choiceGender('male')" checked>
					<hr> <br>
					<div id="male-div">

						시작번호 <input type="text" name="m_start_num"><br> 끝번호 <input
							type="text" name="m_end_num"> <br> 결번 <input
							type="text" name="m_not_num" placeholder=",단위로 입력해주세요">
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div id="gen_option_div">
						<input type="radio" name="gen_option" value="0">같은 성별을 짝으로
						배치<br> <input type="radio" name="gen_option" value="1">다른
						성별을 짝으로 배치<br> <input type="radio" name="gen_option"
							value="2" checked>성별에 상관없이 상관 없이 배치<br> 성비가 다를 경우 위의
						규칙이 적용되고 남는 학생은 위 규칙이 적용되지않습니다.
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2"><input type="reset" value="다시 작성"> <input
					type="submit" value="다음으로"></td>
			</tr>

		</table>
	</form>
</body>
</html>
