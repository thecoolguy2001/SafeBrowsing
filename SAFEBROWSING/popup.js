document.addEventListener('DOMContentLoaded', function() {
  var blurButton = document.getElementById('blurButton');
  var settingsButton = document.getElementById('settingsButton');

  // Initial button state
  var isBlurOn = true;
  updateBlurButton();

  // Toggle blur button state and update text
  blurButton.addEventListener('click', function() {
    isBlurOn = !isBlurOn;
    updateBlurButton();
    updateBlockedWords();
  });

  // Redirect to list page on settings button click
  settingsButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'list.html' });
  });

  // Update blur button text and color
  function updateBlurButton() {
    blurButton.textContent = isBlurOn ? 'Blur On' : 'Blur Off';
    blurButton.style.backgroundColor = isBlurOn ? '#00cc00' : '#ff0000';
  }

  // Update blocked words in content script
  function updateBlockedWords() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { isBlurOn: isBlurOn }, function(response) {
        console.log(response);
      });
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  var blurButton = document.getElementById('blurButton');
  var settingsButton = document.getElementById('settingsButton');

  // Initial button state
  var isBlurOn = true;
  updateBlurButton();

  // Toggle blur button state and update text
  blurButton.addEventListener('click', function() {
    isBlurOn = !isBlurOn;
    updateBlurButton();
    updateStyling();
  });

  // Redirect to list page on settings button click
  settingsButton.addEventListener('click', function() {
    chrome.tabs.create({ url: 'list.html' });
  });

  // Update blur button text and color
  function updateBlurButton() {
    blurButton.textContent = isBlurOn ? 'Blur On' : 'Blur Off';
    blurButton.classList.toggle('blur-off', !isBlurOn);
  }

  // Update styling in content script
  function updateStyling() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { isBlurOn: isBlurOn }, function(response) {
        console.log(response);
      });
    });
  }
});
