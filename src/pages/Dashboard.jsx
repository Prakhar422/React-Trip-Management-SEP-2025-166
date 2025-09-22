"use client"

import { useState, useMemo } from "react"
import TripList from "../components/TripList"
import SearchFilter from "../components/SearchFilter"
import Pagination from "../components/Pagination"
import { BarChart3, TrendingUp, MapPin, Calendar, Globe } from "lucide-react"

const Dashboard = ({ trips, onDeleteTrip }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [sortBy, setSortBy] = useState("destination")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Filter and sort trips
  const filteredAndSortedTrips = useMemo(() => {
    const filtered = trips.filter((trip) => {
      const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = !statusFilter || trip.status === statusFilter
      return matchesSearch && matchesStatus
    })

    // Sort trips
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "price") {
        aValue = Number.parseFloat(aValue)
        bValue = Number.parseFloat(bValue)
      } else if (sortBy === "startDate") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [trips, searchTerm, statusFilter, sortBy, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTrips.length / itemsPerPage)
  const paginatedTrips = filteredAndSortedTrips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to first page when filters change
  const handleSearchChange = (term) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  // Calculate summary statistics
  const totalTrips = trips.length
  const averagePrice =
    trips.length > 0 ? Math.round(trips.reduce((sum, trip) => sum + trip.price, 0) / trips.length) : 0
  const plannedTrips = trips.filter((trip) => trip.status === "PLANNED").length
  const completedTrips = trips.filter((trip) => trip.status === "COMPLETED").length

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted/20 border border-border p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text ">
                Trip Dashboard
              </h1>
              <p className="text-muted-foreground mt-1 text-lg">Manage and track all your travel adventures</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-success/5 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group glass hover-lift rounded-xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium">Total Trips</p>
              <p className="text-3xl font-bold text-foreground">{totalTrips}</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-primary/20 to-primary rounded-full"></div>
        </div>

        <div className="group glass hover-lift rounded-xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success/10 rounded-xl border border-success/20 group-hover:bg-success/20 transition-colors">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium">Average Price</p>
              <p className="text-3xl font-bold text-foreground">$ {averagePrice}</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-success/20 to-success rounded-full"></div>
        </div>

        <div className="group glass hover-lift rounded-xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warning/10 rounded-xl border border-warning/20 group-hover:bg-warning/20 transition-colors">
              <MapPin className="h-6 w-6 text-warning" />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium">Planned</p>
              <p className="text-3xl font-bold text-foreground">{plannedTrips}</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-warning/20 to-warning rounded-full"></div>
        </div>

        <div className="group glass hover-lift rounded-xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-success/10 rounded-xl border border-success/20 group-hover:bg-success/20 transition-colors">
              <Calendar className="h-6 w-6 text-success" />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground font-medium">Completed</p>
              <p className="text-3xl font-bold text-foreground">{completedTrips}</p>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-success/20 to-success rounded-full"></div>
        </div>
      </div>

      <div className="glass rounded-xl p-6 border border-border/50">
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
      </div>

      {/* Results Info */}
      {(searchTerm || statusFilter) && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/20 rounded-lg px-4 py-2 border border-border/50">
          <BarChart3 className="h-4 w-4" />
          Showing {filteredAndSortedTrips.length} of {totalTrips} trips
          {searchTerm && ` matching "${searchTerm}"`}
          {statusFilter && ` with status "${statusFilter}"`}
        </div>
      )}

      {/* Trip List */}
      <TripList trips={paginatedTrips} onDeleteTrip={onDeleteTrip} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredAndSortedTrips.length}
      />
    </div>
  )
}

export default Dashboard
