// var searchTerm = '';
// var apiKey = "aAhFSIkGXTkKB4GDqDMcbBmltMCGwU5r";
// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=" + apiKey;

// console.log(queryURL);


$("#submit").on("click", function (event) {
    // prevent page from reloading
    event.preventDefault();
    $("#articleContainer").empty();
    var startYear = $("#startYear").val();
    var endYear = $("#endYear").val();
    var searchTerm = $("#searchTerm").val();
    var apiKey = "&api-key=aAhFSIkGXTkKB4GDqDMcbBmltMCGwU5r";
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + apiKey;

    // If the user provides a startYear -- the startYear will be included in the queryURL
    if (startYear) {
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    };
    // If the user provides a startYear -- the endYear will be included in the queryURL
    if (endYear) {
        queryURL = queryURL + "&end_date=" + endYear + "1231";
    };

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.response.docs);

        if (!$("#numbRecords").val()) {
            for (var i = 0; i < 10; i++) {

                var a = $("<div>")
                a.addClass("article");
                a.append("<a class='articleHead' href='" + response.response.docs[i].web_url + "' target='_blank'>" + response.response.docs[i].headline.main + "</a>");
                a.append("<p class='articleBody'>" + response.response.docs[i].lead_paragraph + "</p>");


                $("#articleContainer").append(a);

            };

        } else {

            for (var i = 0; i < $("#numbRecords").val(); i++) {

                var a = $("<div>")
                a.addClass("article");
                a.append("<a class='articleHead' href='" + response.response.docs[i].web_url + "' target='_blank'>" + response.response.docs[i].headline.main + "</a>");
                a.append("<p class='articleBody'>" + response.response.docs[i].lead_paragraph + "</p>");


                $("#articleContainer").append(a);

            };
        };
    });
});


var clear = function () {
    $("#nytForm").trigger("reset");
    $("#articleContainer").empty();
}

$("#clear").on("click", function () {
    event.preventDefault();
    clear();
});