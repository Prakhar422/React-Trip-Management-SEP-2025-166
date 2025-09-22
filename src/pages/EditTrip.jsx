"use client"

import { useParams, Navigate } from "react-router-dom"
import TripForm from "../components/TripForm"

const EditTrip = ({ trips, onUpdateTrip }) => {
  const { id } = useParams()
  const trip = trips.find((t) => t.id === Number.parseInt(id))

  if (!trip) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = (updatedTrip) => {
    onUpdateTrip(id, updatedTrip)
  }

  return (
    <div>
      <TripForm trip={trip} onSubmit={handleSubmit} isEditing={true} />
    </div>
  )
}

export default EditTrip
