function removeTrending() {
  let region = document.querySelectorAll('[aria-label="Timeline: Trending now"]');
  if (region[0].style.display !== "none")
    region[0].style.display = "none";
}


function ripReplies() {
  let region = document.querySelectorAll('[aria-label="Timeline: Tweet"]');
  let tweets = region[0].childNodes[0].childNodes[0].childNodes;
  for (let i = 2; i < tweets.length; i++) {
    if (tweets[i].style.display !== "none")
      tweets[i].style.display = "none";
  }
}

function ripConversation() {
  let region = document.querySelectorAll('[aria-label="Timeline: Conversation"]');
  let tweets = region[0].childNodes[0].childNodes[0].childNodes;
  console.log(tweets.length);
  for (let i = 1; i < tweets.length; i++) {
    if (tweets[i].style.display !== "none")
      tweets[i].style.display = "none";
  }
}

let rootObserver = new MutationObserver(function (mutations, observer) {

  removeTrending();
  ripConversation();
  ripReplies();
});

rootObserver.observe(document, {
  subtree: true,
  attributes: true
});