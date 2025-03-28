import { Github, Linkedin, Mail, FileText, Code, Server, Database, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Yahia Shanaah</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Full Stack Developer & UI/UX Designer
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com/yahyashanaah" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/yahya-shana%E2%80%99ah-5998961b5/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="mailto:yahya.shanaah@gmail.com">
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </a>
            </Button>
                <Button variant="outline" size="icon" asChild>
                <a href="/resume.pdf" download="Yahya_Shannash_Resume.pdf">
                <FileText className="h-5 w-5" />
                <span className="sr-only">Resume</span>
                </a>
            </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">About Me</h2>
                <p className="text-muted-foreground">
                  I'm a passionate full-stack developer with over 5 years of experience building web applications. I
                  specialize in React, Next.js, Node.js, and modern web technologies.
                </p>
                <p className="text-muted-foreground">
                  My goal is to create intuitive, efficient, and beautiful digital experiences that solve real-world
                  problems. I'm constantly learning and exploring new technologies to stay at the forefront of web
                  development.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[1200px] space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">My Skills</h2>
                <p className="text-muted-foreground">Here are some of the technologies and tools I work with</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" /> Frontend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>React & Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>HTML5 & CSS3</li>
                      <li>Redux & Context API</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Server className="h-5 w-5" /> Backend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Node.js & Express</li>
                      <li>Python & Django</li>
                      <li>RESTful APIs</li>
                      <li>GraphQL</li>
                      <li>Authentication & Security</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" /> Database
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>MongoDB</li>
                      <li>PostgreSQL</li>
                      <li>SQL</li>
                      <li>Firebase</li>
                      <li>SQLite</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" /> Design
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>UI/UX Design</li>
                      <li>Figma & Adobe XD</li>
                      <li>Responsive Design</li>
                      <li>Accessibility</li>
                      <li>Design Systems</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Let's Work Together</h2>
              <p className="text-muted-foreground">
                I'm currently available for freelance work and open to new opportunities. If you have a project that
                needs my expertise, feel free to reach out.
              </p>
              <Button asChild size="lg">
                <a href="mailto:yahya.shanaah@gmail.com">Contact Me</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

