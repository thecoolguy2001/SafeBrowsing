// List of harmful words to be blurred
const harmfulWords = ["account", "bank", "for"];

// Function to check if a word is harmful
function isHarmful(word) {
  return harmfulWords.includes(word.toLowerCase());
}

// Function to blur harmful words
function blurHarmfulWords() {
  const elements = document.querySelectorAll("body *");

  elements.forEach((element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
      const words = node.textContent.split(" ");

      const newWords = words.map((word) => {
        if (isHarmful(word)) {
          const span = document.createElement("span");
          span.classList.add("blurred-word");
          span.textContent = word;
          span.addEventListener("click", revealWord);
          return span;
        } else {
          return document.createTextNode(word);
        }
      });

      const parent = node.parentNode;
      parent.replaceChild(document.createTextNode(" "), node);
      parent.insertBefore(newWords[0], node.nextSibling);
      for (let i = 1; i < newWords.length; i++) {
        parent.insertBefore(document.createTextNode(" "), node.nextSibling);
        parent.insertBefore(newWords[i], node.nextSibling);
      }
    }
  });

  applyBlurStyle();
}

// Function to apply blur style to harmful words
function applyBlurStyle() {
  const blurredWords = document.querySelectorAll(".blurred-word");
  blurredWords.forEach((word) => {
    word.classList.add("blur");
  });
}

// Function to remove blur style from harmful words
function removeBlurStyle() {
  const blurredWords = document.querySelectorAll(".blurred-word");
  blurredWords.forEach((word) => {
    word.classList.remove("blur");
  });
}

// Function to reveal the word when clicked
function revealWord(event) {
  event.target.classList.remove("blur");
}

// Call the blurHarmfulWords function when the page finishes loading
window.addEventListener("load", blurHarmfulWords);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.isBlurOn) {
    applyBlurStyle();
  } else {
    removeBlurStyle();
  }
  sendResponse("Styling updated");
});
