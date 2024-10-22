import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'

interface Bill {
  dueDate: { month: string; day: number }
  description: string
  lastCharge: string
  amount: number
  paid: boolean
}

interface AddBillModalProps {
  onAddBill: (bill: Bill) => void
}

export function AddBillModal({ onAddBill }: AddBillModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newBill, setNewBill] = useState<Partial<Bill>>({
    dueDate: { month: '', day: 1 },
    description: '',
    lastCharge: '',
    amount: 0,
    paid: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddBill(newBill as Bill)
    setIsOpen(false)
    setNewBill({
      dueDate: { month: '', day: 1 },
      description: '',
      lastCharge: '',
      amount: 0,
      paid: false,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">+ ADD BILLS</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Bill</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="month">Month</Label>
              <Input
                id="month"
                value={newBill.dueDate?.month}
                onChange={(e) => setNewBill({ ...newBill, dueDate: { ...newBill.dueDate, month: e.target.value.toUpperCase() } })}
                maxLength={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="day">Day</Label>
              <Input
                id="day"
                type="number"
                value={newBill.dueDate?.day}
                onChange={(e) => setNewBill({ ...newBill, dueDate: { ...newBill.dueDate, day: parseInt(e.target.value) } })}
                min={1}
                max={31}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={newBill.description}
              onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastCharge">Last Charge</Label>
            <Input
              id="lastCharge"
              value={newBill.lastCharge}
              onChange={(e) => setNewBill({ ...newBill, lastCharge: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={newBill.amount}
              onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="paid"
              checked={newBill.paid}
              onCheckedChange={(checked) => setNewBill({ ...newBill, paid: checked as boolean })}
            />
            <Label htmlFor="paid">Paid</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Add Bill</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}