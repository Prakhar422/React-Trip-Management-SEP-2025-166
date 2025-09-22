"use client"

import { Edit, Trash2, Calendar, DollarSign, MapPin, Plane, Plus, Clock } from "lucide-react"
import { Link } from "react-router-dom"

const TripList = ({ trips, onDeleteTrip }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "PLANNED":
        return "status-planned"
      case "ONGOING":
        return "status-ongoing"
      case "COMPLETED":
        return "status-completed"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getDaysUntilTrip = (startDate) => {
    const today = new Date()
    const tripDate = new Date(startDate)
    const diffTime = tripDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (trips.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center border border-border/50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-success/10 rounded-full blur-3xl"></div>
          <div className="relative p-6 bg-card/50 rounded-2xl border border-border/50 backdrop-blur-sm">
            <Plane className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-foreground mb-3">No trips found</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Start planning your next adventure by adding a new trip.
            </p>
            <Link
              to="/add"
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              Add Your First Trip
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="hidden lg:block">
        <div className="glass rounded-xl overflow-hidden border border-border/50">
          <div className="bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm">
            <div className="grid grid-cols-12 gap-4 py-4 px-6 text-sm font-semibold text-muted-foreground">
              <div className="col-span-3">Destination</div>
              <div className="col-span-3">Travel Dates</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {trips.map((trip, index) => {
              const daysUntil = getDaysUntilTrip(trip.startDate)
              return (
                <div
                  key={trip.id}
                  className="grid grid-cols-12 gap-4 py-4 px-6 hover:bg-muted/20 transition-all duration-200 group"
                >
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">{trip.destination}</span>
                      {daysUntil > 0 && trip.status === "PLANNED" && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {daysUntil} days to go
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center gap-1 text-foreground font-bold text-lg">
                      <DollarSign className="h-4 w-4 text-success" />
                      {trip.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}
                    >
                      {trip.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Link
                      to={`/edit/${trip.id}`}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/20"
                      title="Edit trip"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => onDeleteTrip(trip.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 border border-transparent hover:border-destructive/20"
                      title="Delete trip"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map((trip) => {
          const daysUntil = getDaysUntilTrip(trip.startDate)
          return (
            <div
              key={trip.id}
              className="group glass hover-lift rounded-xl p-6 border border-border/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{trip.destination}</h3>
                      {daysUntil > 0 && trip.status === "PLANNED" && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {daysUntil} days to go
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(trip.status)}`}
                  >
                    {trip.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-5 w-5 text-success" />
                    <span className="text-xl font-bold text-foreground">${trip.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/edit/${trip.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-secondary/50 text-secondary-foreground rounded-lg hover:bg-secondary transition-all duration-200 font-medium border border-border/50"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 font-medium border border-destructive/20"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TripList
