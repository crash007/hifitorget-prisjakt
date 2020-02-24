chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery == "search") {
            //var url = "https://duckduckgo.com/html/?q=" +
            var url = "https://google.se/search?q=" +
                encodeURIComponent(request.itemId);
            fetch(url)
                .then(response => response.text())
                .then(text => parseSearch(text))
                .then(link => {
                    console.log(link);
                    sendResponse(link)
                })
                .catch(error => {
                    console.log(error)
                })
            return true;  // Will respond asynchronously.
        }

        if (request.contentScriptQuery == "retrive") {

            fetch(request.url)
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    sendResponse(result)
                })
                .catch(error => {
                    console.log(error)
                })
            return true;  // Will respond asynchronously.
        }

    }
);

function parseSearch(result){
    return $(result).find('a[href*="prisjakt.nu"]').attr('href');
}

