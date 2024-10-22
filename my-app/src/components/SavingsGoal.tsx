import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Trophy, Target } from 'lucide-react'

export default function SavingsGoal() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Savings Goal</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-2" size={24} />
            <div>
              <p className="text-sm text-gray-500">Target Achieved</p>
              <p className="text-2xl font-bold">$12,500</p>
            </div>
          </div>
          <div className="flex items-center">
            <Target className="text-teal-500 mr-2" size={24} />
            <div>
              <p className="text-sm text-gray-500">This month Target</p>
              <p className="text-2xl font-bold">$20,000</p>
            </div>
          </div>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                $0
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                $20k
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div style={{ width: "62.5%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
          </div>
        </div>
        <p className="text-center text-gray-600 mb-4">Target vs Achievement</p>
        <Button variant="outline" className="w-full">Adjust Goal</Button>
      </CardContent>
    </Card>
  )
}