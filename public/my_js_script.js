function typeWriter(element, text, delay = 20) { // Adjust delay to 20ms
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", function() {
    const observer = new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        const markdownBody = node.querySelector('.markdown-body p');
                        if (markdownBody && node.querySelector('.MuiBox-root')) { // Ensure the node is part of the answer
                            const text = markdownBody.textContent;
                            markdownBody.textContent = "";  // Clear the existing text
                            typeWriter(markdownBody, text);  // Apply the typewriter effect
                        }
                    }
                });
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true }); // Observe the entire body for changes
});
