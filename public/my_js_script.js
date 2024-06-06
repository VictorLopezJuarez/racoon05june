function typeWriter(element, text, delay = 9) {
    let i = 0;
    const chatContainer = document.getElementById('root');
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
            setTimeout(type, delay);
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", function() {
    const observer = new MutationObserver(function(mutationsList) {
        for(let mutation of mutationsList) {
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
