function typeWriter(element, text, delay = 9) {
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }

    const scrollInterval = setInterval(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);  // Smaller interval for smoother scrolling

    type();

    const checkCompletion = setInterval(() => {
        if (i >= text.length) {
            clearInterval(scrollInterval);
            clearInterval(checkCompletion);
        }
    }, 100);  // Check for completion periodically
}

document.addEventListener("DOMContentLoaded", function() {
    const observer = new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.querySelector('.markdown-body')) {
                        const messageElement = node.querySelector('.markdown-body p');
                        if (messageElement) {
                            const text = messageElement.textContent;
                            messageElement.textContent = "";  // Clear the existing text
                            typeWriter(messageElement, text);  // Apply the typewriter effect
                        }
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
