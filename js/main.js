var apiURL = 'http://voteapi.empower2018.us';

$(document).ready(function () {
	$('#getResults').click(function() {
		$.get(apiURL + '/tally', function(data) {
			var tallyResults = "<thead class='thead-dark'><tr><th scope='col'>API</th><th scope='col'>Vote Count</th><th scope='col'>API ID</th></tr></thead>";
			for (var i = 0; i < data.length; i++) {
				tallyResults += "<tr><td id='apiName'>" + data[i].api_name + "</td><td>" + data[i].vote_count + "</td><td>" + data[i].api_id + "</td></tr>";
			}
			$('#addHere').html(tallyResults)
		});
	});
	$('#getOptions').click(function() {
		$.get(apiURL + '/apis', function(data) {
			var optionsResults = "<thead class='thead-dark'><tr><th scope='col'>API</th><th scope='col'>API ID</th></tr></thead>";
			for (var i = 0; i < data.length; i++) {
				optionsResults += "<tr><td id='apiName'><button class='api btn btn-dark'data-toggle='tooltip' data-placement='right' title='Cast Vote'>" + data[i].name + "</td></button><td>" + "   " + data[i]._id + "</td></tr>";
				$(document).on("click", ".api" , function (data) {
					console.log("Got here");
					$.post(apiURL + "/" + $('#GithubUser').val() +"/vote", {"api_name": $(optionsResults).val()},
					function() {
						console.log($('#GithubUser').val());
					});
				});
			}
			$('#addHere').html(optionsResults)
		});
	});
	$('#whoVoted').click(function() {
			$.get(apiURL + "/who_voted_for_what", function(data) {
				var voteResults = "<thead class='thead-dark'><tr><th scope='col'>API</th><th scope='col'>Voter Name</th></tr></thead>";
				for(var i = 0; i < data.length; i++) {
					voteResults += "<tr><td id='apiName'>" + data[i].api_name + "</td><td>" + data[i].voter_name + "</td></tr>";
				}
				$('#addHere').html(voteResults);
			})
	})
	$('#clickMe').click(function() {
  	$('#addHere tbody tr').each(function(i, v) {
  		if ($(this).find('#apiName').html() != $('#filterAPI').val()) {
  			$(this).hide();
        	}
    	});
    });
});
