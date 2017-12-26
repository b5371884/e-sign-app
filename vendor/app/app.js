	// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyACWpYN8fQJux5WYILmvegefxGjKgz0Ikc",
	    authDomain: "sutsign-9602f.firebaseapp.com",
	    databaseURL: "https://sutsign-9602f.firebaseio.com",
	    projectId: "sutsign-9602f",
	    storageBucket: "sutsign-9602f.appspot.com",
	    messagingSenderId: "670407673317"
	};

	firebase.initializeApp(config);

	/* Function Search From Student id and Course */
	function search_signs(course_id,student_code) {
		if(course_id == '' || student_code == ''){
			alert('กรุณากรอกข้อมูล รหัสวิชา และ รหัสนักศึกษา !');
		}else{
			checkIfCourseExists(course_id,student_code);
		}

	}

	/* ตรวจสอบว่ามีรายวิชาและชื่อนี้อยู่หรือไม่  */
	function checkIfCourseExists(course_id, student_code) {

		const rootRef = firebase.database().ref();
		const oneRef = rootRef.child('Student').child(student_code).child(course_id);

		oneRef.once('value', function (snapshot) {
			var exists = (snapshot.val() !== null);
			courseDataExistsCallback(course_id, exists, student_code);
		});
	}

	/* Check If Query Have Data */
	function courseDataExistsCallback(course_id, exists, student_code) {
		if (exists) {
			getCourseName(course_id);
			$("#signShow").LoadingOverlay("show");
			$("#signShow").find("tr:gt(0)").remove();
			var i = 0;
			const rootRef = firebase.database().ref();
			firebase.database().ref("/Student").child(student_code + '/' + course_id).on("value", function (snapshot) {
				snapshot.forEach(function (childSnapshot) {
					$('#signShow').append('<tr> <td> ' + childSnapshot.key + ' </td> <td> ' + childSnapshot.child('Sign 1').val() + '</td> <td> ' + childSnapshot.child('Sign 2').val() + ' </td> <td> ' + childSnapshot.child('Sign 3').val() + ' </td> <td> ' + childSnapshot.child('Sign 4').val() + ' </td> <td> <button id="user_'+ i +'" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="'+ childSnapshot.child('updated_by').val() +'" onmouseover="tooltip_show(this.id);"> <i class="fa fa-lg fa-user-circle"></i> </button> </td> </tr>' );
					i++;
				});
			});
			$("#signShow").LoadingOverlay("hide");
		} else {
			alert('กรอกข้อมูล รหัสวิชา หรือ รหัสนักศึกษาไม่ถูกต้อง !');
		}
	}

	/* Get Course Name */
	 function getCourseName(course_id){
	 	const rootRef = firebase.database().ref();
	 	firebase.database().ref('Course/' + course_id + '/description').on("value", function (snapshot) {
	 		console.log( snapshot.val().name );
			$("#showCourseName").html( snapshot.val().name );
		});
	}
	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	})

	function tooltip_show(id)
    {	
        $('#'+id).tooltip('show');
    } 

	$("#text").click(function () {
		makeCode();
	});

	var qrcode = new QRCode("qrcode");
	function makeCode () {   
		var elText = document.getElementById("student_code");
		if (!elText.value) {
			alert("กรุณากรอกรหัสนักศึกษา");
			elText.focus();
			return;
		}
		qrcode.makeCode(elText.value);
	}

	makeCode();
	// makeCode();

	// $("#text").on("blur", function () {
	//     makeCode();
	// }).
	// on("keydown", function (e) {
	//     if (e.keyCode == 13) {
	//         makeCode();
	//     }
	// });