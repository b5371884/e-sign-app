

/* Function Search From Student id and Course */
function search_signs(course_id,student_code) {

	//console.log(course_id,student_code);

	// Firebase Ref
	const rootRef = firebase.database().ref();
	const oneRef = rootRef.child('Student').child(student_code).child(course_id);

	// Query Data
	var count = 1;

	// Remove AlL Row Before Append
	$("#signShow").find("tr:gt(0)").remove();

	oneRef.on('child_added', snap => {
	    //console.log(snap.val());
	    appendSignRow(count , snap.val(), course_id);
		count++;
	});
	// Hide full page LoadingOverlay

}

/* Append Data Row */
function appendSignRow(count , signs , course_id) {
	$.LoadingOverlay("show");
	var trHTML = '<tr><td>'+count+'</td>';
    $.each(signs, function (i, item) {
        trHTML += '<td>' + item + '</td>';
    });
    $('#signShow').append(trHTML+'</tr>');
    checkHideOverlayLoading(count , course_id);
    //$.LoadingOverlay("hide");
}


function checkHideOverlayLoading(count , course_id ) {
	if(count >= 1){
		getCourseName(course_id);
	}
}

function getCourseName(course_id){

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



