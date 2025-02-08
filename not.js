function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';

    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Example: Simulate navigation by attaching a click event to links
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default navigation
        showNotification();

        // Simulate page transition after the notification duration
        setTimeout(() => {
            window.location.href = link.href;
        }, 5000);
    });
});