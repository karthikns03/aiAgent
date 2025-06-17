async function sendToDeepSeek(promptText) {
  const requestBody = {
    model: "deepseek-chat",
    messages: [{ role: "user", content: promptText }],
  }

  try {
    const response = await fetch("http://localhost:3000/api/deepseek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    const output =
      data.choices?.[0]?.message?.content || "No response content received."
    document.getElementById("output").textContent = output
  } catch (error) {
    document.getElementById("output").textContent = "Error: " + error.message
  }
}

function handleSubmit() {
  const prompt = document.getElementById("prompt").value
  if (prompt.trim() === "") {
    alert("Please enter a prompt.")
    return
  }
  sendToDeepSeek(prompt)
}
