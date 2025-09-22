"use client"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Calendar, DollarSign, MapPin, Save, X } from "lucide-react"
import { tripStatuses } from "../data/trips"

const TripForm = ({ trip, onSubmit, isEditing = false }) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: trip || {
      destination: "",
      startDate: "",
      endDate: "",
      price: "",
      status: "PLANNED",
    },
  })

  const onFormSubmit = async (data) => {
    try {
      await onSubmit({
        ...data,
        price: Number.parseFloat(data.price),
      })
      navigate("/")
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{isEditing ? "Edit Trip" : "Add New Trip"}</h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update your trip details" : "Plan your next adventure"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Destination</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                {...register("destination", {
                  required: "Destination is required",
                  minLength: {
                    value: 2,
                    message: "Destination must be at least 2 characters",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="Enter destination (e.g., Paris, Tokyo)"
              />
            </div>
            {errors.destination && <p className="mt-1 text-sm text-destructive">{errors.destination.message}</p>}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              {errors.startDate && <p className="mt-1 text-sm text-destructive">{errors.startDate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="date"
                  {...register("endDate", {
                    required: "End date is required",
                    validate: (value, { startDate }) => {
                      if (new Date(value) <= new Date(startDate)) {
                        return "End date must be after start date"
                      }
                      return true
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              {errors.endDate && <p className="mt-1 text-sm text-destructive">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* Price and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Price (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be positive",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              {errors.price && <p className="mt-1 text-sm text-destructive">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                {...register("status", {
                  required: "Status is required",
                })}
                className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none"
              >
                {tripStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && <p className="mt-1 text-sm text-destructive">{errors.status.message}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? "Saving..." : isEditing ? "Update Trip" : "Create Trip"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TripForm
