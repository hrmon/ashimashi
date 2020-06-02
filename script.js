const _L = console.log;

function removeTrending() {
  let region = document.querySelectorAll('[aria-label="Timeline: Trending now"]');
  if (region[0].style.display !== "none")
    region[0].style.display = "none";
}

function isTweet(node) {
  return !!node.querySelector('[data-testid="tweet"]');
}

function isInThread(node) {
  let tweet = node.querySelector('[data-testid="tweet"]');
  if (!tweet) return true;
  let authorArea = tweet.childNodes[0];
  let link = authorArea.querySelector('a');
  return window.location.pathname.startsWith(link.getAttribute('href'));
}

function ripReplies(hint) {
  let region = document.querySelector(`[aria-label="${hint}"]`);
  if (!region) return;
  let nodes = region.childNodes[0].childNodes[0].childNodes;
  let reachedThread = pastThread = false;

  nodes.forEach(node => {
    if (!isTweet(node)) {
      node.style.display = "none";
      return
    }
    if (!reachedThread && isInThread(node))
      reachedThread = true;
    if (reachedThread && !isInThread(node))
      pastThread = true;
    if (pastThread)
      node.style.display = "none";
  });
}

let rootObserver = new MutationObserver(function (mutations, observer) {

  removeTrending();
  ripReplies("Timeline: Tweet");
  ripReplies("Timeline: Conversation");
});

rootObserver.observe(document, {
  subtree: true,
  attributes: true
});