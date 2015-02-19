$(document).ready(function() {

	//get json from 
	$.getJSON("resources/tweets.json", function(tweetJSON) {

		var tweets = "";
		var hashtags = "";

		tweets += "<ul id=\"tweets\">\n";
		hashtags += "<ul id=\"hashtags\">\n";

		for (var i=0; i<tweetJSON.length; i++) {


			//extract text for display
			tweets += "\t<li><img src=\"" + tweetJSON[i].user.profile_image_url_https + "\"><p>" + tweetJSON[i].text + "</p></li>\n";
			
			//extract hashtags for display
			for (var j=0; j<tweetJSON[i].entities.hashtags.length; j++) {
				hashtags += "\t<li>#" + tweetJSON[i].entities.hashtags[j].text + "</li>\n";
			}

		}

		tweets += "</ul>\n";
		hashtags += "</ul>\n";

		$("#tweetList").append(tweets);
		$("#hashtagList").append(hashtags);

		/*
		Displaying Tweets
		*/

		//hide all tweets
		var hide_all_tweets = $("#tweets li").each(function() {
			$(this).hide();
		});

		//show first five
		var n_t = $("#tweets li").size();
		for (var i1=0; i1<5; i1++) {

			$("#tweets li").eq(i1).show();
		} 


		//animate rest of tweets
		var tweet_animate = setInterval(function() {

			//hide top tweet
			$("#tweets li").eq(0).hide(500);

			//show added tweet
			$("#tweets li").eq(5).show(500);

			if ($("#tweets li").eq(0).is(":hidden")) {
				$("#tweets li:first").insertAfter($("#tweets li:last"));
			
			}


		}, 1500);


		/*
			Displaying Hashtags
		*/

		//hide all hashtags
		var hide_all_hashtags = $("#hashtags li").each(function() {
			$(this).hide();
		});



		//show first five
		var n_h = $("#hashtags li").size();
		for (var i1=0; i1<5; i1++) {

			$("#hashtags li").eq(i1).show();
		} 

		//setTimeout is here so the hashtags start later
		var wait = setTimeout(function() {

			var hashtag_animate = setInterval(function() {

			
				//hide top hashtag
				$("#hashtags li").eq(0).hide(500);

				//show added hashtag
				$("#hashtags li").eq(5).show(500);

				if ($("#hashtags li").eq(0).is(":hidden")) {
					$("#hashtags li:first").insertAfter($("#hashtags li:last"));
			
				}
			
			}, 1500);

		}, 1000);
		





		
	});

	

});