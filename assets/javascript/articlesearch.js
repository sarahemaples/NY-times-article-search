$(document).ready(function(){
    
var numResults = 5;

    $("#search").on("click", function(e){
        e.preventDefault();
    // take in all info from form and save it in variables
        // console.log("clicked");
        var keyWords = $("input[name=searchterms]").val().trim();
        var recordsToRetrieve = $("input[name=recordnumber]").val().trim();
        var startYear = $("input[name=startyear]").val().trim();
        console.log(startYear);
        var endYear = $("input[name=endyear]").val().trim();
        // console.log(keyWords);

        var queryURL =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

        var queryParams = {"api-key": "ZV6Pg8ej8AANKrKAXnwu4ciANpJdCPky"};

        // console.log(queryURL);

        // adding search term to url
        queryParams.q = keyWords;

        // query params

        // start year
        if (startYear != ""){
            queryParams.begin_date = startYear + "0101";
        };

        // end year
        if (endYear != ""){
            queryParams.end_date = endYear + "1231";
        }

        // grabbing # records 
        if (recordsToRetrieve != ""){
            numResults = parseInt(recordsToRetrieve);
        }

        queryURL = queryURL + $.param(queryParams);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response.response.docs[0]);
                console.log(response.response.docs);


                displayArticles(response.response.docs, numResults);
            })
    });
    
//---------------------------------------------------//
// FUNCTION THAT DISPLAYS ARTICLES ON SCREEN
//---------------------------------------------------//
// this function takes in two parameters (arr, n)
// arr is the array of articles returned
// n is the number of articles user wishes to display. default is 10
    function displayArticles(arr, n){
        // clear any previously displayed articles
        $("#results").empty();
        // create new list and append it to our 'results' div (span?)
        var articleList = $("<ol>");
        $("#results").append(articleList);

        // for loop through the response.data array
        for (var a = 0; a < n; a++){
            // create new list item
            var newArt = $("<li>");

            // add headline
            if (arr[a].headline.main){
                var headline = "<h2>" + arr[a].headline.main + "</h2><br>";
                newArt.append(headline);
            }

            // add date and time
            if (arr[a].pub_date){
                var dateTime = "<h6>" + arr[a].pub_date + "</h6><br>";
                newArt.append(dateTime);
            }

            // add author
            if (arr[a].byline.original){
                var author = "<h5>" + arr[a].byline.original + "</h5><br>";
                newArt.append(author);
            }

            // add link to article
            if (arr[a].web_url){
                var webLink = "<a href = '" + arr[a].web_url + "'>" + arr[a].web_url + "</a>";
                // console.log(webLink);
                newArt.append(webLink);
            }

            // add list item to list
            articleList.append(newArt);
        }
    }
});