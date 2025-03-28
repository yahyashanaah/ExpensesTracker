"use client"

import type React from "react"
import { format } from "date-fns"
import { Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Expense {
  id: number
  description: string
  date: string
  amount: number
  category_id: number
  month: string
}

interface Category {
  id: number
  name: string
}

interface ExpensesTableProps {
  expenses: Expense[]
  categories: Category[]
  onEdit: (expense: Expense) => void
  onDeleteClick: (expense: Expense) => void
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses, categories, onEdit, onDeleteClick }) => {
  return (
    <div className="bg-card rounded-lg shadow-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="font-semibold">Description</TableHead>
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Amount</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>{format(new Date(expense.date), "PP")}</TableCell>
              <TableCell>${expense.amount.toFixed(2)}</TableCell>
              <TableCell>{categories.find((cat) => cat.id === expense.category_id)?.name}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(expense)}
                    className="text-yellow-400 border-yellow-400 hover:bg-yellow-400/20 hover:text-yellow-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteClick(expense)}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ExpensesTable

