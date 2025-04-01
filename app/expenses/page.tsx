"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ExpensesTable from "@/components/ExpensesTable"
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog"

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

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [currentExpense, setCurrentExpense] = useState<Partial<Expense>>({})
  const [currentCategory, setCurrentCategory] = useState<Partial<Category>>({})
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const { toast } = useToast()
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; expenseId: number | null }>({
    isOpen: false,
    expenseId: null,
  })

  useEffect(() => {
    fetchExpenses()
    fetchCategories()
  }, [])

  const fetchExpenses = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(selectedMonth ? `/api/expenses?month=${selectedMonth}` : "/api/expenses")
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error("Failed to fetch expenses:", error)
      toast({
        title: "Error",
        description: "Failed to fetch expenses. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      toast({
        title: "Error",
        description: "Failed to fetch categories. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const url = isEdit ? `/api/expenses/${currentExpense.id}` : "/api/expenses"
    const method = isEdit ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentExpense),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      setShowExpenseModal(false)
      fetchExpenses()
      toast({
        title: isEdit ? "Expense Updated" : "Expense Added",
        description: `Successfully ${isEdit ? "updated" : "added"} the expense.`,
      })
    } catch (error) {
      console.error("Failed to submit expense:", error)
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "add"} expense. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const url = isEdit ? `/api/categories/${currentCategory.id}` : "/api/categories"
    const method = isEdit ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentCategory),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      setShowCategoryModal(false)
      fetchCategories()
      toast({
        title: isEdit ? "Category Updated" : "Category Added",
        description: `Successfully ${isEdit ? "updated" : "added"} the category.`,
      })
    } catch (error) {
      console.error("Failed to submit category:", error)
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "add"} category. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExpenseDelete = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      fetchExpenses()
      toast({
        title: "Expense Deleted",
        description: "Successfully deleted the expense.",
      })
    } catch (error) {
      console.error("Failed to delete expense:", error)
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setDeleteConfirmation({ isOpen: false, expenseId: null })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentExpense((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setCurrentExpense((prev) => ({ ...prev, category_id: Number.parseInt(value) }))
  }

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value)
    fetchExpenses()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Financial Tracker</h1>
            <div className="space-x-4">
              <Button
                onClick={() => {
                  setCurrentExpense({})
                  setIsEdit(false)
                  setShowExpenseModal(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Expense
              </Button>
              <Button
                onClick={() => {
                  setCurrentCategory({})
                  setIsEdit(false)
                  setShowCategoryModal(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Select onValueChange={handleMonthChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All months</SelectItem>
                {/* Add more months as needed */}
                <SelectItem value="2023-05">May 2025</SelectItem>
                <SelectItem value="2023-06">June 2025</SelectItem>
                <SelectItem value="2023-07">July 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ExpensesTable
            expenses={expenses}
            categories={categories}
            onEdit={(expense) => {
              setCurrentExpense(expense)
              setIsEdit(true)
              setShowExpenseModal(true)
            }}
            onDeleteClick={(expense) => setDeleteConfirmation({ isOpen: true, expenseId: expense.id })}
          />
        </div>
      </main>
      <Footer />

      <Dialog open={showExpenseModal} onOpenChange={setShowExpenseModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{isEdit ? "Edit Expense" : "Add New Expense"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleExpenseSubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={currentExpense.description || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={currentExpense.date || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  value={currentExpense.amount || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select onValueChange={handleCategoryChange} defaultValue={currentExpense.category_id?.toString()}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : isEdit ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showCategoryModal} onOpenChange={setShowCategoryModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{isEdit ? "Edit Category" : "Add New Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCategorySubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={currentCategory.name || ""}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : isEdit ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <DeleteConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, expenseId: null })}
        onConfirm={() => deleteConfirmation.expenseId && handleExpenseDelete(deleteConfirmation.expenseId)}
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
      />
    </div>
  )
}

