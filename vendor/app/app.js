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

	// Tests to see if /users/<userId> has any data. 
	/* function checkIfCourseExists(course_id,student_code) {
		$.LoadingOverlay("show");
		// Firebase Ref
		const rootRef = firebase.database().ref();
		const oneRef = rootRef.child('Student').child(student_code).child(course_id);

		oneRef.once('value', function(snapshot) {
			var exists = (snapshot.val() !== null);
			courseDataExistsCallback(course_id, exists,student_code);
		});

	} */

	function checkIfCourseExists(course_id, student_code) {
		
		//$.LoadingOverlay("show");
		
		// Firebase Ref
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

		$("#signShow").LoadingOverlay("show");

		const rootRef = firebase.database().ref();
		$("#signShow").find("tr:gt(0)").remove();


		firebase.database().ref("/Student").child(student_code + '/' + course_id).on("value", function (snapshot) {
			snapshot.forEach(function (childSnapshot) {

				console.log(childSnapshot.key, childSnapshot.val());
				console.log(childSnapshot.child('Sign 1').val());

				$('#signShow').append('<tr> <td> ' + childSnapshot.key + ' </td> <td> ' + childSnapshot.child('Sign 1').val() + '</td> <td> ' + childSnapshot.child('Sign 2').val() + ' </td> <td> ' + childSnapshot.child('Sign 3').val() + ' </td> <td> ' + childSnapshot.child('Sign 4').val() + ' </td> <td> E-Mail </td> </tr>' );
				
				//appendSignRow(childSnapshot.key, childSnapshot.val());
			});
		});


		$("#signShow").LoadingOverlay("hide");

		/* function appendSignRow(count, signs, course_id) {

			var trHTML = '<tr><td>' + count + '</td>';
			$.each(signs, function (i, item) {
				trHTML += '<td>' + item + '</td>';
			});
			$('#signShow').append(trHTML + '</tr>');
			//checkHideOverlayLoading(count , course_id);
			//$.LoadingOverlay("hide");
		} */

		/* const rootRef = firebase.database().ref();
		const oneRef = rootRef.child('Student').child(student_code).child(course_id);

		// Query Data
		var count = 1;
		// Remove AlL Row Before Append
		$("#signShow").find("tr:gt(0)").remove();

		oneRef.on('child_added', snap => {
			//console.log(snap.val());
			appendSignRow(count , snap.val(), course_id);
			count++;
		}); */

		//getCourseName(course_id);

	} else {
		//$.LoadingOverlay("hide");
		alert('กรอกข้อมูล รหัสวิชา หรือ รหัสนักศึกษาไม่ถูกต้อง !');
	}
	}


	/* Get Course Name */
	/* function getCourseName(course_id){

		const rootRef = firebase.database().ref();
		const oneRef = rootRef.child('Course/' + course_id + '/description');

		oneRef.on('child_added', snap => {
			//$("#showCourseName").html(snap);
			//console.log(snap);
			if(snap.key == 'name'){
				console.log(snap.val());
				$("#showCourseName").html(snap.val());
				$.LoadingOverlay("hide");
			}
		});
	}
	*/



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