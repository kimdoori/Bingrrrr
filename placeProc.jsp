<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="js/place.js"></script>

<link rel="stylesheet" href="css/place.css">
</head>
<body>

	<form action="place.jsp">
		<table border="1" id="input-table">

			<tr>
				<td id="num-list" ondrop='drop(event)' ondragover='allowDrop(event)'>
				<%

				request.setCharacterEncoding("UTF-8");
				String female_number="";
				String male_number="";
				try {
					female_number = request.getParameter("female_number").replaceAll(" ", "");
					male_number = request.getParameter("male_number").replaceAll(" ", "");

					//out.println("female_number : "+female_number);

					if (!female_number.equals("")) {
						String[] number = female_number.split(",");
						for (int i = 0; i < number.length; i++) {
							out.println("<div id='female_num_" + number[i]
									+ "' name='female_num' class='female_num'  draggable='true' ondragstart='drag(event)'>"
									+ number[i] + "</div>");
						}
					}
					//out.println("male_number : "+male_number);

					if (!male_number.equals("")) {
						String[] number = male_number.split(",");
						for (int i = 0; i < number.length; i++) {
							out.println("<div id='male_num_" + number[i]
									+ "' name='male_num' class='male_num'  draggable='true' ondragstart='drag(event)'>"
									+ number[i] + "</div>");
						}
					}
					//out.println("row : "+row);
					//out.println("col : "+col);
					//out.println("space_num : "+space_num);

				} catch (Exception e) {
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
							String[] space = request.getParameterValues("space");
							
							int row = Integer.valueOf(request.getParameter("row"));
							int col = Integer.valueOf(request.getParameter("col"));
							int space_num = Integer.valueOf(request.getParameter("space_num"));
							int space_index = 0;
							for (int i = 0; i < row; i++) {
								int count = 1;

								out.println("<tr>");
								for (int j = 0; j < col; j++) {
									String td = "";
									td = "<td id='seat" + i + "_" + j
											+ "' name='seat' class='seat' ondrop='drop(event)' ondragover='allowDrop(event)'>";
									//String div="";
									//div="<div id='seat"+i+"_"+j+"' class='seat' ondrop='drop(event)' ondragover='allowDrop(event)'></div>";

									if (space!=null && space_index < space.length) {
										String[] space_key = space[space_index].replaceAll("seat", "").split("_");
										int space_row = Integer.valueOf(space_key[0]);
										int space_col = Integer.valueOf(space_key[1]);

										if (i == space_row && j == space_col) {
											//System.out.println(space_row+":"+i);
											//System.out.println(space_col+":"+j);
											td = "<td name='space_seat' id='seat" + i + "_" + j + "' class='space'>";

											//div="<div id='seat"+i+"_"+j+"' name='space_seat' class='space'></div>";
											space_index++;
											if (count % space_num == 0) {
												space_index--;

											}
										}
									}

									if (count % space_num == 0) {
										td = "<td id='none' class='none'>";

										//div="<div id='none' class='none'></div>";
										j--;
									}
									out.println(td);
									//out.println(div);
									count++;
									out.println("</td>");

								}
								out.println("</tr>");

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
					<button type="button"
						onclick="randomSeat(<%=row %>,<%=col %>,<%=space_num%>,'<%=female_number%>','<%=male_number%>')">배치하기
					</button> <input type="submit" value="저장하기">
				</td>
			</tr>

		</table>

	</form>
</body>
</html>
