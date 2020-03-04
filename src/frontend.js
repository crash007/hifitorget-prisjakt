jQuery(document).ready(function () {

    var relativePath = window.location.pathname;
    console.log(relativePath);

    if (relativePath.startsWith("/visa_annons")) {
        let heading = $('h2').text();
		chrome.runtime.sendMessage(
			{contentScriptQuery: "search", itemId: "prisjakt "+heading},
			link => {
				console.log(link);
				var parser = new DOMParser();
				chrome.runtime.sendMessage({contentScriptQuery: "retrive", url: link},
					result => {

						var htmlDoc = parser.parseFromString(result, "text/html");

						let price = $(htmlDoc).find('meta[property="og\\:amount"]').attr('content');
						let title = $(htmlDoc).find('meta[property="og\\:title"]').attr('content');
						let url = $(htmlDoc).find('meta[property="og\\:url"]').attr('content');
						let image = $(htmlDoc).find('meta[property="og\\:image"]').attr('content');
						if(price == "null"){
							price = '-';
						}
						$('<div class="well"><div class="row"><div class="col-xs-6 col-sm-6"><h3>Prisjakt</h3><p class="kategoriplats">'+title+'</p><p class="kategoriplats">Pris: <b>'+ price+'</b> </p> <p><a class="kategoriplats" href="'+url+'" target="_blank">Länk</a></p></div><div class="col-xs-6 col-sm-6"><img src="'+image+'"></img></div></div></div>').insertAfter('p.kategoriplats');

					}
				);

				//TODO get history
				/*
				chrome.runtime.sendMessage({contentScriptQuery: "retriveHistory", url: link.replace("?p","?pu")}, result =>{


					let json = parser.parseFromString(result,"text/html");
					console.log(json);
					console.log( $(json).find('script').text());
						console.log( $(json).find('script[type="application/ld+json"]').text());
					//console.log(json);
				});
*/


			});

    }


});
