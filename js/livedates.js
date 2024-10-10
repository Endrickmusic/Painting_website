// livedates.js

// We'll use a self-invoking function to avoid polluting the global scope
;(function () {
  // Function to fetch live dates
  async function fetchLiveDates() {
    const SHEET_ID = config.SHEET_ID
    const SHEET_NAME = config.SHEET_NAME
    const API_KEY = config.GOOGLE_SHEETS_API_KEY

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data.values.slice(1) // Assuming first row is headers
    } catch (error) {
      console.error("Error fetching live dates:", error)
      return []
    }
  }

  // Function to display live dates
  function displayLiveDates(dates) {
    const container = document.getElementById("live-dates")
    if (dates.length === 0) {
      container.innerHTML = "<p>No upcoming shows at the moment.</p>"
      return
    }

    const list = document.createElement("ul")
    dates.forEach(([date, venue, city]) => {
      const listItem = document.createElement("li")
      listItem.textContent = `${date} - ${venue}, ${city}`
      list.appendChild(listItem)
    })

    container.appendChild(list)
  }

  // Fetch and display live dates when the page loads
  window.addEventListener("load", async () => {
    const liveDates = await fetchLiveDates()
    displayLiveDates(liveDates)
  })
})()
