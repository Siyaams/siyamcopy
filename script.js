// ট্র্যাকার ১ এর জন্য ফাংশনালিটি
const tracker1 = {
    items: [],
    currentIndex: 0,
    totalItems: 0,
    
    init: function() {
        this.textInput = document.getElementById('text-input-1');
        this.processBtn = document.getElementById('process-btn-1');
        this.copyBtn = document.getElementById('copy-btn-1');
        this.clearBtn = document.getElementById('clear-btn-1');
        this.currentItem = document.getElementById('current-item-1');
        this.totalCount = document.getElementById('total-count-1');
        this.remainingCount = document.getElementById('remaining-count-1');
        this.progressBar = document.getElementById('progress-bar-1');
        this.historyList = document.getElementById('history-list-1');
        
        this.processBtn.addEventListener('click', () => this.processInput());
        this.copyBtn.addEventListener('click', () => this.copyItem());
        this.clearBtn.addEventListener('click', () => this.clearAll());
    },
    
    processInput: function() {
        const inputText = this.textInput.value.trim();
        if (!inputText) return alert('Please enter some items!');
        
        this.items = inputText.split(/[,/\n]/).filter(item => item.trim() !== '');
        this.totalItems = this.items.length;
        this.currentIndex = 0;
        this.historyList.innerHTML = '';
        this.updateUI();
    },
    
    copyItem: function() {
        if (this.currentIndex >= this.items.length) return;
        
        const item = this.items[this.currentIndex];
        navigator.clipboard.writeText(item).then(() => {
            const now = new Date();
            const historyItem = document.createElement('li');
            historyItem.textContent = `${item} (Copied at ${now.toLocaleTimeString()})`;
            this.historyList.prepend(historyItem);
            
            this.currentIndex++;
            this.updateUI();
        });
    },
    
    clearAll: function() {
        this.textInput.value = '';
        this.items = [];
        this.currentIndex = 0;
        this.totalItems = 0;
        this.historyList.innerHTML = '';
        this.updateUI();
    },
    
    updateUI: function() {
        this.totalCount.textContent = this.totalItems;
        this.remainingCount.textContent = this.totalItems - this.currentIndex;
        
        if (this.items.length === 0) {
            this.currentItem.textContent = "Waiting for input...";
            this.progressBar.style.width = "0%";
            return;
        }
        
        if (this.currentIndex < this.items.length) {
            this.currentItem.textContent = this.items[this.currentIndex];
        } else {
            this.currentItem.textContent = "All items copied!";
        }
        
        const progress = (this.currentIndex / this.totalItems) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
};

// ট্র্যাকার ২ এর জন্য ফাংশনালিটি (একই কোড, শুধু ID পরিবর্তন)
const tracker2 = {
    items: [],
    currentIndex: 0,
    totalItems: 0,
    
    init: function() {
        this.textInput = document.getElementById('text-input-2');
        this.processBtn = document.getElementById('process-btn-2');
        this.copyBtn = document.getElementById('copy-btn-2');
        this.clearBtn = document.getElementById('clear-btn-2');
        this.currentItem = document.getElementById('current-item-2');
        this.totalCount = document.getElementById('total-count-2');
        this.remainingCount = document.getElementById('remaining-count-2');
        this.progressBar = document.getElementById('progress-bar-2');
        this.historyList = document.getElementById('history-list-2');
        
        this.processBtn.addEventListener('click', () => this.processInput());
        this.copyBtn.addEventListener('click', () => this.copyItem());
        this.clearBtn.addEventListener('click', () => this.clearAll());
    },
    
    processInput: function() { /* ... tracker1.processInput এর মতোই ... */ },
    copyItem: function() { /* ... tracker1.copyItem এর মতোই ... */ },
    clearAll: function() { /* ... tracker1.clearAll এর মতোই ... */ },
    updateUI: function() { /* ... tracker1.updateUI এর মতোই ... */ }
};

// পেজ লোড হলে ইনিশিয়ালাইজ
document.addEventListener('DOMContentLoaded', () => {
    tracker1.init();
    tracker2.init();
});
