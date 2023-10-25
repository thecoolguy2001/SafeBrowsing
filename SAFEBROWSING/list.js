document.addEventListener('DOMContentLoaded', function() {
  var wordInput = document.getElementById('wordInput');
  var addButton = document.getElementById('addButton');
  var wordList = document.getElementById('wordList');

  // Initial blocked words
  var blockedWords = ["account", "bank", "for"];

  // Function to render the blocked words list
  function renderBlockedWords() {
    wordList.innerHTML = '';

    blockedWords.forEach(function(word) {
      var listItem = document.createElement('li');
      listItem.innerHTML = '<span>' + word + '</span> <span class="remove-button">(remove)</span>';
      wordList.appendChild(listItem);
    });

    // Update the harmfulWords array in script.js
    chrome.storage.sync.set({ blockedWords: blockedWords }, function() {
      console.log('Blocked words updated');
    });
  }

  // Call the renderBlockedWords function when the page finishes loading
  window.addEventListener('load', renderBlockedWords);

  // Retrieve the blocked words from storage
  chrome.storage.sync.get(['blockedWords'], function(result) {
    if (result.blockedWords) {
      blockedWords = result.blockedWords;
      renderBlockedWords();
    }
  });

  // Handle add button click event
  addButton.addEventListener('click', function() {
    var newWord = wordInput.value.trim();

    if (newWord !== '') {
      blockedWords.push(newWord);
      wordInput.value = '';
      renderBlockedWords();
    }
  });

  // Handle remove button click event
  wordList.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-button')) {
      var word = event.target.parentNode.firstChild.textContent;
      removeBlockedWord(word);
    }
  });

  // Function to remove a blocked word from the list
  function removeBlockedWord(word) {
    var index = blockedWords.indexOf(word);
    if (index !== -1) {
      blockedWords.splice(index, 1);
      renderBlockedWords();
    }
  }
});
