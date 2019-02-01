// Define Variables
var numResults = 1; 
let numPages, pageNumber;


$(document).ready(function(){
    // Set the API key
    queryParams = {"api-key": "ZV6Pg8ej8AANKrKAXnwu4ciANpJdCPky"};

    $("#search").on("click", function(search){
        search.preventDefault();
        if (numResults >= 11){
            numPages = Math.ceil(numResults / 10);
            console.log(numPages + " pages needed.");
            pageNumber = numPages - numPages;
            console.log("Page number is currently " + pageNumber);
            queryParams.page = pageNumber;
        }
        queryRequest();
    });

    $("#prev").on("click", function(prevPage) {
        prevPage.preventDefault();
        if (pageNumber > 0) {
            pageNumber--;
            queryParams.page = pageNumber;
            queryRequest();
        }
    });

    $("#next").on("click", function(nextPage) {
        nextPage.preventDefault();
        if (pageNumber < (numPages - 1)) {
            pageNumber++;
            queryParams.page = pageNumber;
            queryRequest();
        }
    });
/*-------------------------------------------
        NYTimes Search API Query Function
--------------------------------------------*/
    function queryRequest() {
        var keyWords = $("input[name=searchterms]").val().trim();
        var recordsToRetrieve = $("input[name=recordnumber]").val().trim();
        var startYear = $("input[name=startyear]").val().trim();
        // console.log(startYear);
        var endYear = $("input[name=endyear]").val().trim();
        // Set the NYTimes artcle search URL
        var queryURL =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

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

        if (numResults >= 10){
            numResults / 10;
            console.log("numResults remainder = " + numResults);
        }
        
        if (pageNumber != ""){
            queryParams.page = pageNumber;
        }

        queryURL = queryURL + $.param(queryParams);
        console.log(queryURL);
        console.log(pageNumber);
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response.response.docs[0]);
                console.log(response.response.docs);
                console.log(response.response.offset);


                displayArticles(response.response.docs, numResults);
            })
    }
    
/*---------------------------------------------------
 FUNCTION THAT DISPLAYS ARTICLES ON SCREEN
---------------------------------------------------*/
/* this function takes in two parameters (arr, n)
arr is the array of articles returned n is the number of articles
user wishes to display. default is 10 */
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