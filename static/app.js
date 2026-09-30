document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("storyForm");
    const storyInput = document.getElementById("story");
    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const story = storyInput.value.trim();

        if (!story) {
            alert("Please enter a story idea.");
            return;
        }

        loading.style.display = "block";
        output.innerHTML = "";

        try {
            const response = await fetch("/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: story
                })
            });

            const data = await response.json();

            loading.style.display = "none";

            if (data.error) {
                output.innerHTML = `
                    <div class="error">
                        <h3>Error</h3>
                        <p>${data.error}</p>
                    </div>
                `;
                return;
            }

            output.innerHTML = `
                <div class="result">
                    <h2>Generated Result</h2>
                    <pre>${data.result}</pre>
                </div>
            `;
        } catch (err) {
            loading.style.display = "none";
            output.innerHTML = `
                <div class="error">
                    <h3>Server Error</h3>
                    <p>${err.message}</p>
                </div>
            `;
        }
    });
});