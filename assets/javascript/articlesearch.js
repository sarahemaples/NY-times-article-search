$(document).ready(function(){
    $("#search").on("click", function(e){
        e.preventDefault();
    // take in all info from form and save it in variables
        console.log("clicked");
        var keyWords = $("input[name=searchterms]").val();
        console.log(keyWords);
        var queryURL =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+keyWords+"&api-key=ZV6Pg8ej8AANKrKAXnwu4ciANpJdCPky";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response.response.docs);
            })
    });

    // $(".Clear").on("click", function(e){
    //     e.preventDefault();
    //     console.log("fuck you cole");
    // });     

});