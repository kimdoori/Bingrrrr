<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<!-- <script src="js/html2canvas.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

</head>
<body>

<div id="capture" style="padding: 10px; background: #f5da55">
    <h4 style="color: #000; ">Hello world!</h4>
</div>

<hr>

<div id="visitMap">아니?</div>
<button id="btn-Preview-Image">캡쳐</button>
<a id="btn-Convert-Html2Image">저장</a>


<div id="previewImage"></div>
<script>


var element = $("#visitMap"); // global variable

var getCanvas; // global variable


//저장

	$("#btn-Preview-Image").on('click', function () {
		
		
		html2canvas(element, {

         	onrendered: function (canvas) {

         		var image = document.getElementById("previewImage");
         		image.innerHTML="";
                $("#previewImage").append(canvas);

                getCanvas = canvas;
                var imgageData = getCanvas.toDataURL("image/png");

        	    // Now browser starts downloading it instead of just showing it

        	    var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");

        	    $("#btn-Convert-Html2Image").attr("download", "자리표.png").attr("href", newData);

        		}
             })

         });


	   




</script>
</body>
</html>