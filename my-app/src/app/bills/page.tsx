import React from 'react'
import Sidebar from '../../components/Sidebar'

import Upcomin from '@/components/Upcomin'

export default function WealthWise() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Upcomin />
      </main>
    </div>
  )
}