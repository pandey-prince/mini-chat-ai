async function sendPrompt() {
  const prompt = document.getElementById("prompt").value;
  const responseEl = document.getElementById("response");
  const loadingEl = document.getElementById("loading");

  // Clear previous response
  responseEl.innerHTML = "";
  loadingEl.style.display = "block"; // Show spinner

  try {
    const res = await fetch("https://mini-chat-ai-two.vercel.app/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    responseEl.innerHTML = data.reply || data.error || "No response.";
  } catch (err) {
    responseEl.innerText = "Error: " + err.message;
  } finally {
    loadingEl.style.display = "none"; // Hide spinner
  }
}
