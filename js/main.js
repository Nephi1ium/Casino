document.getElementById('spin-button').addEventListener('click', spin);

function spin() {
    const reel1 = document.getElementById('reel1');
    const reel2 = document.getElementById('reel2');
    const reel3 = document.getElementById('reel3');

    const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '🔔'];

    // Function to spin a single reel
    function spinReel(reel) {
        return setInterval(() => {
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        }, 100); // Change symbol every 100ms
    }

    // Start spinning each reel
    const reel1Interval = spinReel(reel1);
    const reel2Interval = spinReel(reel2);
    const reel3Interval = spinReel(reel3);

    // Function to stop a single reel after a random duration
    function stopReel(reelInterval, callback) {
        const duration = Math.random() * 5000 + 3000; // Random duration between 3000ms (3s) and 8000ms (8s)
        setTimeout(() => {
            clearInterval(reelInterval);
            callback();
        }, duration);
    }

    // Stop each reel after a random duration and check for win only once
    let reelsStopped = 0;
    function onReelStop() {
        reelsStopped++;
        if (reelsStopped === 3) {
            checkWin(reel1.textContent, reel2.textContent, reel3.textContent);
        }
    }

    stopReel(reel1Interval, onReelStop);
    stopReel(reel2Interval, onReelStop);
    stopReel(reel3Interval, onReelStop);
}

function checkWin(symbol1, symbol2, symbol3) {
    const overlayAlert = document.getElementById('overlay-alert');
    const alertContent = document.getElementById('alert-content');

    if (symbol1 === symbol2 && symbol2 === symbol3) {
        alertContent.textContent = 'You win!';
    } else {
        alertContent.textContent = 'Try again!';
    }

    overlayAlert.style.display = 'flex';

    setTimeout(() => {
        overlayAlert.style.display = 'none';
    }, 3000); // Hide the alert after 3 seconds
}
