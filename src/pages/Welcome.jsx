"use client"

import { Link } from "react-router-dom"
import RotatingGlobe from "../components/RotatingGlobe"

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-12">
          {/* Globe Section */}
          <div className="flex-1 flex justify-center lg:justify-start mb-8 lg:mb-0">
            <div className="w-[40rem] h-[40rem] max-w-[85vw] max-h-[85vw] lg:max-w-[45vw] lg:max-h-[45vw] -mt-16 lg:-mt-8">
              <RotatingGlobe />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left lg:pl-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent mb-6">
              Welcome to TripManager
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Your ultimate destination for managing and organizing all your travel adventures. Plan, track, and explore
              with style.
            </p>

            {/* CTA Button */}
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-200 hover-lift shadow-lg hover:shadow-primary/25 mb-12"
              onClick={() => {
                setTimeout(() => window.scrollTo(0, 0), 0)
              }}
            >
              <span>Enter Dashboard</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Features Grid - Better positioned */}
        <div className="grid md:grid-cols-3 gap-6 pb-16 -mt-8">
          <div className="glass rounded-xl p-6 hover-lift text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Plan Trips</h3>
            <p className="text-muted-foreground text-sm text-center">Create and organize your travel itineraries</p>
          </div>

          <div className="glass rounded-xl p-6 hover-lift text-center">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Track Progress</h3>
            <p className="text-muted-foreground text-sm text-center">Monitor your trip status and expenses</p>
          </div>

          <div className="glass rounded-xl p-6 hover-lift text-center">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Search & Filter</h3>
            <p className="text-muted-foreground text-sm text-center">Find trips quickly with powerful filters</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
