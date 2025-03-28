import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Portfolio
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Providing professional web development services and innovative solutions for businesses of all sizes.
            </p>
            <div className="flex items-center space-x-3">
              <Link
                href="https://github.com/yahyashanaah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/yahya-shana%E2%80%99ah-5998961b5/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/history" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    History
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/expenses" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Expenses Tracker
                  </Link>
                </li>
                <li>
                  <Link href="/voices" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Voices Library
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">yahya.shanaah@gmail.com</li>
                <li className="text-sm text-muted-foreground">+971 5 4343 1993</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

