// Function to fetch live dates from Google Sheets
async function fetchLiveDates() {
  const SHEET_ID = "1RIkJ1_3uMzqVvLMymxh-y2GDCMfqVRdpfBjI9yUJaiY"
  const SHEET_NAME = "Tabellenblatt1" // or whatever your sheet name is
  const API_KEY = "AIzaSyAacAGRApQ0RUbDQFU1tRHgsXQ-8ms8CC8"
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
