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

	console.log(course_id,student_code);

	// body...
	const rootRef = firebase.database().ref();
	const oneRef = rootRef.child('Student').child('B5371884').child('204361');

	oneRef.on('child_added', snap => {
	    console.log(snap.val());
	});

	/*
204361 B5371884
	*/

}

