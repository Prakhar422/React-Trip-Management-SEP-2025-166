"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import AddTrip from "./pages/AddTrip"
import EditTrip from "./pages/EditTrip"
import Welcome from "./pages/Welcome"
import ScrollToTop from "./components/ScrollToTop"
import { initialTrips } from "./data/trips"

function App() {
  const [trips, setTrips] = useState(initialTrips)

  const addTrip = (trip) => {
    const newTrip = {
      ...trip,
      id: Math.max(...trips.map((t) => t.id), 0) + 1,
    }
    setTrips([...trips, newTrip])
  }

  const updateTrip = (id, updatedTrip) => {
    setTrips(
      trips.map((trip) => (trip.id === Number.parseInt(id) ? { ...updatedTrip, id: Number.parseInt(id) } : trip)),
    )
  }

  const deleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id))
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <Dashboard trips={trips} onDeleteTrip={deleteTrip} />
                </main>
              </>
            }
          />
          <Route
            path="/add"
            element={
              <>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <AddTrip onAddTrip={addTrip} />
                </main>
              </>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <>
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                  <EditTrip trips={trips} onUpdateTrip={updateTrip} />
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
