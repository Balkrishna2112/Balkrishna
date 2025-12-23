/**
 * PART 1: DISTRACTION REMOVAL
 * This section clears the "clutter" to keep you centered.
 */
const cleanUI = () => {
    const sidebar = document.getElementById('secondary');
    if (sidebar) sidebar.style.display = 'none';

    const comments = document.getElementById('comments');
    if (comments) comments.style.display = 'none';
};

// Run UI cleaner
cleanUI();
const observer = new MutationObserver(cleanUI);
observer.observe(document.body, { childList: true, subtree: true });

/**
 * PART 2: COMMUNICATION
 * This listens for the "Bookmark" button click from your extension popup.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCurrentTime") {
        const video = document.querySelector('video');
        if (video) {
            const time = Math.floor(video.currentTime);
            const title = document.title.replace(" - YouTube", "");
            const url = new URL(window.location.href);
            const videoId = url.searchParams.get("v");

            sendResponse({ time, title, videoId });
        }
    }
});