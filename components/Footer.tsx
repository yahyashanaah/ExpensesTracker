import Link from "next/link"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
            ExpensesTracker
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">About Us</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/history">History</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/services">Our Service</Link>
            </Button>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} ExpensesTracker. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

