	$.each(obj, function(key, val) {
					   $("#div1").append('[' + key + '] ' + 'CustomerID=' + val["CustomerID"] +'<br />');
					   $("#div1").append('[' + key + '] ' + 'Name=' + val["Name"] +'<br />');
					   $("#div1").append('[' + key + '] ' + 'Email=' + val["Email"] +'<br />');
					   $("#div1").append('[' + key + '] ' + 'CountryCode=' + val["CountryCode"] +'<br />');
					   $("#div1").append('[' + key + '] ' + 'Budget=' + val["Budget"] +'<br />');
					   $("#div1").append('[' + key + '] ' + 'Used=' + val["Used"] +'<br />');
				  });

	$.each(obj, function(key, val) {
			 $("#div1").append('[' + key + '] ' + 'Used=' + val["Used"] +'<br />');
	});


	<!DOCTYPE html>
	<html>
	<head>
	<title>ThaiCreate.Com</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	<meta charset=utf-8 />
	<script>
	  
	function getDataFromDb()
	{
		$.ajax({ 
					url: "getData.php" ,
					type: "POST",
					data: ''
				})
				.success(function(result) { 
					var obj = jQuery.parseJSON(result);
						if(obj != '')
						{
							  //$("#myTable tbody tr:not(:first-child)").remove();
							  $("#myBody").empty();
							  $.each(obj, function(key, val) {
										var tr = "<tr>";
										tr = tr + "<td>" + val["CustomerID"] + "</td>";
										tr = tr + "<td>" + val["Name"] + "</td>";
										tr = tr + "<td>" + val["Email"] + "</td>";
										tr = tr + "<td>" + val["CountryCode"] + "</td>";
										tr = tr + "<td>" + val["Budget"] + "</td>";
										tr = tr + "<td>" + val["Used"] + "</td>";
										tr = tr + "</tr>";
										$('#myTable > tbody:last').append(tr);
							  });
						}

				});

	}



	const rootRef = firebase.database().ref();

	firebase.database().ref("/Student").child('B5371884/204343').on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			console.log(childSnapshot.key);
		});
	});


	// Refference

	The answer to this question is buried deep within Firebase Database Reference.  forEach() is used to get to the child without knowing the child's exact path.

	var leadsRef = database.ref('leads');
	leadsRef.on('value', function(snapshot) {
	    snapshot.forEach(function(childSnapshot) {
	      var childData = childSnapshot.val();
	    });
	});
	Now childSnapshot will contain the required data, the same thing can also be accessed using child_added.

	leadsRef.on('child_added', function(snapshot) {
	      //Do something with the data
	});
