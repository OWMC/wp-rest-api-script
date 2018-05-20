/* 


This script needs to be enqueued in a WP theme function. 

The markup for the page targetted for content delivery must have a container div for the data output ("posts-container").

*/


console.log('Hello from main.js. Here we use AJAX to get the JSON data via the REST API.');

/* create var for where we want to put our data in the markup */
var ppc = document.getElementById("rest-container");

/* create var for our XMLHttpRequest (XHR) object */
var ourRequest = new XMLHttpRequest();

/* the XHR command and REST API path */
ourRequest.open('GET', 'http://localhost:3000/owmc-v5/wp-json/wp/v2/posts');
ourRequest.onload = function() {
  /* Create the data if all goes well */
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var data = JSON.parse(ourRequest.responseText);
    createHTML(data)
  } else {
    /* If there is a problem after connection */
    console.log("We connected to the server, but it returned an error.");
  }
};
/* If we can't connect at all */
ourRequest.onerror = function() {
  console.log("Error trying to connect to server.");
};

/* Do the request */
ourRequest.send();

/* Function to format the data output */
function createHTML(postsData) {
	var ourHTMLString = '';
	for (i = 0; i < postsData.length; i++) {
		ourHTMLString += '<h2>' + postsData[i].title.rendered + '</h2>';
	}
	ppc.innerHTML = ourHTMLString;
}