"use client"
import React from 'react'
import Sidebar from '../../components/Sidebar'
import SavingsGoal from '../../components/SavingsGoal'
import SavingSummary from '../../components/SavingSummary'
import ExpenseGoals from '../../components/ExpenseGoals'
import { Button } from '../../components/ui/button'

export default function WealthWise() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Goals</h1>
          <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">+ ADD GOAL</Button>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <SavingsGoal />
          <SavingSummary />
        </div>
        <ExpenseGoals />
      </main>
    </div>
  )
}