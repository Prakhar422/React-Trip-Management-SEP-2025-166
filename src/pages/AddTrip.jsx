"use client"

import TripForm from "../components/TripForm"

const AddTrip = ({ onAddTrip }) => {
  return (
    <div>
      <TripForm onSubmit={onAddTrip} />
    </div>
  )
}

export default AddTrip
