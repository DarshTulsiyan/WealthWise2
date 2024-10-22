import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface InsightCard {
  image: string
  tag: string
  title: string
  source: string
  date: string
  description: string
}

const insightCards: InsightCard[] = [
  {
    image: '/placeholder.svg?height=200&width=400',
    tag: 'ITR REFUND SCAM',
    title: 'Beware of ITR Refund Scam! You may lose lakhs with new income tax refund fraud',
    source: 'The Times of India',
    date: 'Aug 16, 2024',
    description: 'Beware of Income Tax Refund Scams! To avoid victim to such scams, taxpayers are recommended to verify any communication from the I-T department through official channels.'
  },
  {
    image: '/placeholder.svg?height=200&width=400',
    tag: '',
    title: 'Gold (XAU) Price Forecast: Is a Breakout on the Horizon with Powell\'s Jackson Hole...',
    source: 'FXEmpire',
    date: 'Aug 16, 2024',
    description: 'Gold prices surged to an all-time high on Friday, breaching the $2,500 mark as the U.S. dollar weakened and geopolitical tensions in the Middle East escalated. This rally reflects increasing demand for safe-haven assets, driven by expectations of a U.S. interest rate cut by the Federal Reserve in September.'
  }
]

export default function Insights() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insightCards.map((card, index) => (
          <Card key={index} className="overflow-hidden">
            <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
            <CardContent className="p-6">
              {card.tag && (
                <span className="inline-block bg-teal-500 text-white text-xs px-2 py-1 rounded mb-2">
                  {card.tag}
                </span>
              )}
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="font-semibold text-red-500 mr-2">{card.source}</span>
                <span>{card.date}</span>
              </div>
              <p className="text-gray-600">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}