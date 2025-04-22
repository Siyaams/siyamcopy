let items = [];
let currentIndex = 0;
let totalItems = 0;

// DOM Elements
const textInput = document.getElementById('text-input');
const processBtn = document.getElementById('process-btn');
const copyBtn = document.getElementById('copy-btn');
const clearBtn = document.getElementById('clear-btn');
const currentItem = document.getElementById('current-item');
const totalCount = document.getElementById('total-count');
const remainingCount = document.getElementById('remaining-count');
const progressBar = document.getElementById('progress-bar');
const historyList = document.getElementById('history-list');

// Process Input
processBtn.addEventListener('click', () => {
    const inputText = textInput.value.trim();
    
    if (!inputText) {
        alert('Please enter some text/numbers!');
        return;
    }
    
    // Reset everything
    items = inputText.split(/[,/\n]/).filter(item => item.trim() !== '');
    totalItems = items.length;
    currentIndex = 0;
    
    // Clear history
    historyList.innerHTML = '';
    
    updateUI();
    
    // Change button text back to "Get Started"
    processBtn.textContent = 'Get Started';
});

// Copy Current Item
copyBtn.addEventListener('click', () => {
    if (items.length === 0 || currentIndex >= items.length) {
        alert('No items to copy!');
        return;
    }
    
    const itemToCopy = items[currentIndex];
    
    // Copy to clipboard
    navigator.clipboard.writeText(itemToCopy).then(() => {
        // Add to history
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const historyItem = document.createElement('li');
        historyItem.textContent = `${itemToCopy} (Copied at: ${timeString})`;
        historyList.prepend(historyItem);
        
        // Move to next item
        currentIndex++;
        updateUI();
    });
});

// Clear All
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    items = [];
    currentIndex = 0;
    totalItems = 0;
    historyList.innerHTML = '';
    updateUI();
});

// Update UI
function updateUI() {
    if (items.length === 0) {
        currentItem.textContent = "Waiting for input...";
        totalCount.textContent = "0";
        remainingCount.textContent = "0";
        progressBar.style.width = "0%";
        return;
    }
    
    if (currentIndex < items.length) {
        currentItem.textContent = items[currentIndex];
    } else {
        currentItem.textContent = "All items copied!";
        processBtn.textContent = "Input Again";
    }
    
    totalCount.textContent = totalItems;
    remainingCount.textContent = totalItems - currentIndex;
    
    // Update progress bar
    const progress = (currentIndex / totalItems) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Change progress bar color when complete
    if (progress === 100) {
        progressBar.style.backgroundColor = '#4CAF50';
    } else {
        progressBar.style.backgroundColor = '#4a6bff';
    }
}