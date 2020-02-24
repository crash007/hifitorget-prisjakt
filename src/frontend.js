jQuery(document).ready(function () {

    var relativePath = window.location.pathname;
    console.log(relativePath);

    if (relativePath.startsWith("/visa_annons")) {
        let heading = $('h2').text();
		chrome.runtime.sendMessage(
			{contentScriptQuery: "search", itemId: "prisjakt "+heading},
			link => {
				console.log(link)

				chrome.runtime.sendMessage({contentScriptQuery: "retrive", url: link},
					result => {
						var parser = new DOMParser();
						var htmlDoc = parser.parseFromString(result, "text/html");

						console.log($(htmlDoc).find("head"));
						let price = $(htmlDoc).find('meta[property="og\\:amount"]').attr('content');
						let title = $(htmlDoc).find('meta[property="og\\:title"]').attr('content');
						let url = $(htmlDoc).find('meta[property="og\\:url"]').attr('content');
						$('<h3><strong>Prisjakt</strong></h3><p class="kategoriplats">'+title+'</p><p class="kategoriplats">Pris: '+ price+'  <a href="'+url+'" target="_blank">Länk</a></p>').insertAfter('p.kategoriplats');

					}
				);

			});

    }


});
