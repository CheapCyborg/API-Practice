var apiURL = 'http://voteapi.empower2018.us';

$(document).ready(function () {
	$('#getResults').click(function() {
		$.get(apiURL + '/tally', function(data) {
			var tallyResults = "<thead class='thead-dark'><tr><th scope='col'>API</th><th scope='col'>Vote Count</th><th scope='col'>API ID</th></tr></thead>";
			for (var i = 0; i < data.length; i++) {
				tallyResults += "<tr><td>" + data[i].api_name + "</td><td>" + data[i].vote_count + "</td><td>" + data[i].api_id + "</td></tr>";
			}
			$('#addHere').html(tallyResults)
		});
	});
	$('#getOptions').click(function() {
		$.get(apiURL + '/apis', function(data) {
			var optionsResults = "<thead class='thead-dark'><tr><th scope='col'>API</th><th scope='col'>API ID</th></tr></thead>";
			for (var i = 0; i < data.length; i++) {
				optionsResults += "<tr><td><button class='api btn btn-dark'>" + data[i].name + "</td></button><td>" + "   " + data[i]._id + "</td></tr>";
				var name = data[i].api_name;
				$(document).on("click", ".api" , function (data) {
					console.log("Got here");
					$.post(apiURL + "/CheapCyborg/vote", {"api_name": $(optionsResults).val()},
					function() {
						console.log(data);
					});
				});
			}
			$('#addHere').html(optionsResults)
		});
	});
});
