import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Code,
  Server,
  Database,
  Palette,
  BrainIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Yahia Shanaah
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Software Engineer | Passionate About AI & Innovation
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/yahyashanaah"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://www.linkedin.com/in/yahya-shana%E2%80%99ah-5998961b5/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  About Me
                </h2>
                <p className="text-muted-foreground">
                  I'm a passionate software engineer who loves building scalable
                  web applications and solving complex problems. I specialize in
                  C#, ASP.NET Core, FastAPI, Next.js, and Angular, and I'm
                  always eager to explore new tools and frameworks.
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">
                    My goal is to create intuitive, efficient, and beautiful
                    digital experiences
                  </span>{" "}
                  that solve real-world problems. Currently focusing on advanced AI techniques, web development, and innovative solutions to
                  stay at the forefront of technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[1200px] space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  My Skills
                </h2>
                <p className="text-muted-foreground">
                  Here are some of the technologies and tools I work with
                </p>
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
                      <li>Angular & Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS</li>
                      <li>HTML5 & CSS3</li>
                      <li>Redux & Context API</li>
                      <li>UI/UX Design</li>
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
                      <li>C# & ASP.NET Core</li>
                      <li>Node.js & Express</li>
                      <li>Python & Django</li>
                      <li>RESTful APIs</li>
                      <li>FastAPI</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />Database
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>MongoDB & SQL</li>
                      <li>PostgreSQL & SQLite</li>
                      <li>AWS</li>
                      <li>Docker & Kubernetes</li>
                      <li>Data Structure</li>
                      <li>Algorithms</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <BrainIcon className="h-5 w-5" /> AI & ML
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>LLMs & RAG Systems</li>
                      <li>PyTorch</li>
                      <li>Pandas & Data Analysis</li>
                      <li>Computer Vision</li>
                      <li>NLP & TTS</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[1200px] space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Software Engineering Principles</h2>
                <p className="text-muted-foreground">
                  I follow industry best practices and principles to create maintainable, scalable code
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Object-Oriented Programming</CardTitle>
                    <CardDescription>
                      Building modular, reusable code through encapsulation, inheritance, and polymorphism
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      I leverage OOP principles to create maintainable software architectures that scale with project
                      complexity.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>SOLID Principles</CardTitle>
                    <CardDescription>
                      Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency
                      Inversion
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Following SOLID principles ensures my code is robust, extensible, and easier to maintain over
                      time.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Design Patterns</CardTitle>
                    <CardDescription>Implementing proven solutions to common software design problems</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      I apply appropriate design patterns like Factory, Singleton, Observer, and Strategy to solve
                      complex architectural challenges.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Let's Work Together
              </h2>
              <p className="text-muted-foreground">
                I'm currently available for freelance work and open to new
                opportunities. If you have a project that needs my expertise,
                feel free to reach out.
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
  );
}
