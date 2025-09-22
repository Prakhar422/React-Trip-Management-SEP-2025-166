"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import AddTrip from "./pages/AddTrip"
import EditTrip from "./pages/EditTrip"
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
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard trips={trips} onDeleteTrip={deleteTrip} />} />
            <Route path="/add" element={<AddTrip onAddTrip={addTrip} />} />
            <Route path="/edit/:id" element={<EditTrip trips={trips} onUpdateTrip={updateTrip} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
