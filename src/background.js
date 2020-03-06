const host = "https://google.se";
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery == "search") {

            var url = host+"/search?q=" +
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
            console.log(request.url);
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

        if (request.contentScriptQuery == "retriveHistory") {
            console.log(request.url);
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
    console.log(result);
    let url = $(result).find('a[href*="prisjakt.nu"]').attr('href');
    //on android url is relative. google cache?
    if(url.startsWith("/url?q")){
        return host+url;
    }else{
        return url;
    }
}

