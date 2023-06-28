
$(document).ready(function() {
    let currentPage = 1;
    let obj;

    $.getJSON("https://api.coingecko.com/api/v3/exchange_rates", function(data) {
        console.log(data);
        console.log(data.rates);
        obj = data.rates;
        displayAllCurrencies(currentPage);

        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                currentPage++;
                displayAllCurrencies(currentPage);

                // Check if the end of the content is reached
                if ($(window).scrollTop() + $(window).height() >= $("#content").height()) {
                    $("#loading-indicator").hide();
                    $("#end-notification").text("No more records to show.").show();
                }
            }
        });
    });

    // Function to display currencies based on the current page
    function displayAllCurrencies(page) {
        const perPage = 10; // Number of currencies to display per page
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const currencyKeys = Object.keys(obj);

        for (let i = startIndex; i < endIndex && i < currencyKeys.length; i++) {
            const currency = currencyKeys[i];
            console.log("Currency:", currency);
            const currencyObj = obj[currency];

            const currencyContainer = $("<div>").addClass("currency-container");
            const imageContainer = $("<div>").attr("id", "image");
            const imageElement = $("<img>").attr("src", "path/to/image.png").attr("alt", "image");
            const detailsContainer = $("<div>").attr("id", "details");
            const nameValueContainer = $("<div>").addClass("name-value-container");
            // $("<p>").text("Rate: ").appendTo(nameValueContainer);
            $("<p>").attr("id", "ratetitle").text("Rate: ").appendTo(nameValueContainer);
            $("<p>").attr("id", "rate").text(currencyObj.value).appendTo(nameValueContainer);
            $("<p>").text("Crypto Name: ").appendTo(nameValueContainer);
            $("<p>").attr("id", "name").text(currencyObj.name).appendTo(nameValueContainer);
            $("<p>").text("Crypto Unit: ").appendTo(nameValueContainer);
            $("<p>").attr("id", "unit").text(currencyObj.unit).appendTo(nameValueContainer);
            $("<p>").attr("id", "count").text("").appendTo(nameValueContainer);

            imageContainer.append(imageElement);
            currencyContainer.append(imageContainer);
            detailsContainer.append(nameValueContainer);
            currencyContainer.append(detailsContainer);

            currencyContainer.appendTo("#content");

            console.log("Name:", currencyObj.name);
            console.log("Type:", currencyObj.type);
            console.log("Unit:", currencyObj.unit);
            console.log("Value:", currencyObj.value);
            console.log("----------------------");
        }
    }

    // Event listener for search input
    $("#search-input").on("keydown", function(event) {
    if (event.keyCode === 13) { // Check if the Enter key is pressed
        const searchInput = $("#search-input").val().trim().toLowerCase();
        currentPage = 1; // Reset the current page to 1 when a search is performed

        $("#content").empty();

        if (searchInput === "") {
            displayAllCurrencies(currentPage);
        } else {
            const filteredCurrencies = Object.keys(obj).filter(function(currency) {
                return obj[currency].name.toLowerCase().includes(searchInput);
            });

            filteredCurrencies.forEach(function(currency) {
                console.log("Currency:", currency);
                const currencyObj = obj[currency];

                const currencyContainer = $("<div>").addClass("currency-container");
                const imageContainer = $("<div>").attr("id", "image");
                const imageElement = $("<img>").attr("src", "path/to/image.png").attr("alt", "image");
                const detailsContainer = $("<div>").attr("id", "details");
                const nameValueContainer = $("<div>").addClass("name-value-container");
                // $("<p>").text("Rate: ").appendTo(nameValueContainer);
                $("<p>").attr("id", "ratetitle").text("Rate: ").appendTo(nameValueContainer);
                $("<p>").attr("id", "rate").text(currencyObj.value).appendTo(nameValueContainer);
                $("<p>").text("Crypto Name: ").appendTo(nameValueContainer);
                $("<p>").attr("id", "name").text(currencyObj.name).appendTo(nameValueContainer);
                $("<p>").text("Crypto Unit: ").appendTo(nameValueContainer);
                $("<p>").attr("id", "unit").text(currencyObj.unit).appendTo(nameValueContainer);
                $("<p>").attr("id", "count").text("").appendTo(nameValueContainer);

                imageContainer.append(imageElement);
                currencyContainer.append(imageContainer);
                detailsContainer.append(nameValueContainer);
                currencyContainer.append(detailsContainer);

                currencyContainer.appendTo("#content");
            });

            if (filteredCurrencies.length === 0) {
                console.log("No matching records found");
                // Replace the console.log with your desired notification method
                // For example, you can use a notification library or display a message on the webpage
            }
        }

        // Check if the end of the content is reached after searching
        if ($(window).scrollTop() + $(window).height() >= $("#content").height()) {
            $("#loading-indicator").hide();
            $("#end-notification").text("No more records to show.").hide();
        }
    }
    });
});


