// livedates.js
;(function () {
  // Determine which config to use based on the page
  function getConfig() {
    const isPastPage = document.querySelector(".past-grid") !== null
    console.log("Is Past Page: ", isPastPage) // Updated logging
    return isPastPage ? config_past : config_live
  }

  // Function to fetch live dates
  async function fetchLiveDates() {
    const config = getConfig()
    const SHEET_ID = config.SHEET_ID
    const SHEET_NAME = config.SHEET_NAME
    const API_KEY = config.GOOGLE_SHEETS_API_KEY
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      return data.values.slice(1) // Assuming first row is headers
    } catch (error) {
      console.error("Error fetching dates:", error)
      return []
    }
  }

  // Display dates
  function displayDates(dates) {
    const container = document.getElementById("live-dates")
    if (!container) {
      console.error("Container element not found")
      return
    }

    if (dates.length === 0) {
      container.innerHTML = "<p>No shows to display.</p>"
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

  // Initialize when DOM is loaded
  window.addEventListener("DOMContentLoaded", async () => {
    const dates = await fetchLiveDates()
    displayDates(dates)
  })
})()
