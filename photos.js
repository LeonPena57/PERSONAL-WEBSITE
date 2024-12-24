// Disable right-click on protected images without alert
document.addEventListener('contextmenu', function (e) {
    if (e.target.classList.contains('protected')) {
        e.preventDefault();
    }
});

// Detect tab visibility change and hide images
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        // Hide images when the tab is not active
        document.querySelectorAll('.protected').forEach(element => element.style.visibility = 'hidden');
    } else {
        // Show images when the tab is active again
        document.querySelectorAll('.protected').forEach(element => element.style.visibility = 'visible');
    }
});

// Additional method to detect print screen button
document.addEventListener('keydown', function (e) {
    if (e.key === 'PrintScreen') {
        document.querySelectorAll('.protected').forEach(element => element.style.visibility = 'hidden');
    }
});

// Detect screenshot tools
window.addEventListener('blur', function () {
    document.querySelectorAll('.protected').forEach(element => element.style.visibility = 'hidden');
});

window.addEventListener('focus', function () {
    document.querySelectorAll('.protected').forEach(element => element.style.visibility = 'visible');
});

// Disable drag-and-drop
document.addEventListener('dragstart', function (e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});
