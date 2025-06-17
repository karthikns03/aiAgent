import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()
const API_KEY = "sk-0610021be7604bdaa339ea575a06c56c"

// ✅ Use CORS middleware properly
app.use(cors()) // OR app.use(cors({ origin: '*' }))
app.use(express.json())

// ✅ Handle preflight requests for CORS manually (optional fallback)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.sendStatus(200)
})

app.post("/api/deepseek", async (req, res) => {
  try {
    const apiRes = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })

    const data = await apiRes.json()

    // ✅ Add CORS headers here too
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(3000, () => {
  console.log("✅ Server listening on http://localhost:3000")
})
