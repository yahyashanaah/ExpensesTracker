"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

interface Item {
  id: number
  item_name: string
  description: string
  date: string
  amount: number
  salary: number
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState<Partial<Item>>({})
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/items/")
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Failed to fetch items:", error)
      toast({
        title: "Error",
        description: "Failed to fetch items. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const url = isEdit ? `/api/items/${currentItem.id}/` : "/api/items/"
    const method = isEdit ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentItem),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      setShowModal(false)
      fetchItems()
      toast({
        title: isEdit ? "Item Updated" : "Item Added",
        description: `Successfully ${isEdit ? "updated" : "added"} the item.`,
      })
    } catch (error) {
      console.error("Failed to submit item:", error)
      toast({
        title: "Error",
        description: `Failed to ${isEdit ? "update" : "add"} item. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/items/${id}/`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        fetchItems()
        toast({
          title: "Item Deleted",
          description: "Successfully deleted the item.",
        })
      } catch (error) {
        console.error("Failed to delete item:", error)
        toast({
          title: "Error",
          description: "Failed to delete item. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentItem((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Financial Items</h1>
            <Button
              onClick={() => {
                setCurrentItem({})
                setIsEdit(false)
                setShowModal(true)
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Button>
          </div>

          <div className="bg-card rounded-lg shadow-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Salary</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{item.item_name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{format(new Date(item.date), "PP")}</TableCell>
                    <TableCell>${item.amount.toFixed(2)}</TableCell>
                    <TableCell>${item.salary.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentItem(item)
                            setIsEdit(true)
                            setShowModal(true)
                          }}
                          className="text-yellow-400 border-yellow-400 hover:bg-yellow-400/20 hover:text-yellow-300"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 border-red-400 hover:bg-red-400/20 hover:text-red-300"
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
        </div>
      </main>
      <Footer />

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] bg-card">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{isEdit ? "Edit Item" : "Add New Item"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item_name" className="text-right">
                  Name
                </Label>
                <Input
                  id="item_name"
                  name="item_name"
                  value={currentItem.item_name || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={currentItem.description || ""}
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
                  value={currentItem.date || ""}
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
                  value={currentItem.amount || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salary" className="text-right">
                  Salary
                </Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  step="0.01"
                  value={currentItem.salary || ""}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="bg-yellow-400 hover:bg-yellow-500 text-black">
                {isLoading ? "Processing..." : isEdit ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

