"use client"

import { useState, useEffect } from "react"
import { Play, Trash2, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog"

interface TTSEntry {
  id: number
  text: string
  audio_file: string
  language_id: number
}

interface Language {
  id: number
  code: string
}

export default function VoicesLibrary() {
  const [text, setText] = useState("")
  const [languageId, setLanguageId] = useState<string>("")
  const [entries, setEntries] = useState<TTSEntry[]>([])
  const [languages, setLanguages] = useState<Language[]>([
    { id: 1, code: "en" },
    { id: 2, code: "ar" },
    { id: 3, code: "tr" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; entryId: number | null }>({
    isOpen: false,
    entryId: null,
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/tts")

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.statusText}`)
      }

      const data = await response.json()
      setEntries(data)
    } catch (error) {
      console.error("Failed to fetch entries:", error)
      toast({
        title: "Error",
        description: "Failed to fetch voice entries. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateTTS = async () => {
    if (!text || !languageId) {
      toast({
        title: "Missing Information",
        description: "Please enter text and select a language.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language_id: Number.parseInt(languageId),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.statusText}`)
      }

      const newEntry = await response.json()

      // Refresh the entries list to include the new entry
      fetchEntries()

      setText("")
      setLanguageId("")

      toast({
        title: "Success",
        description: "Text-to-speech generated successfully!",
      })
    } catch (error) {
      console.error("Failed to generate TTS:", error)
      toast({
        title: "Error",
        description: `Failed to generate text-to-speech: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayAudio = async (id: number) => {
    try {
      const response = await fetch(`/api/tts/${id}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.statusText}`)
      }

      const data = await response.json()

      // Create an audio element and play it
      const audio = new Audio(data.audio_file)
      audio.play()
    } catch (error) {
      console.error("Failed to play audio:", error)
      toast({
        title: "Error",
        description: `Failed to play audio: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    }
  }

  const handleDeleteEntry = async (id: number) => {
    try {
      const response = await fetch(`/api/tts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.statusText}`)
      }

      // Refresh the entries list after deletion
      fetchEntries()

      toast({
        title: "Success",
        description: "Entry deleted successfully!",
      })
    } catch (error) {
      console.error("Failed to delete entry:", error)
      toast({
        title: "Error",
        description: `Failed to delete entry: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setDeleteConfirmation({ isOpen: false, entryId: null })
    }
  }

  const getLanguageCode = (id: number) => {
    const language = languages.find((lang) => lang.id === id)
    return language ? language.code : "unknown"
  }

  // Map language codes to readable names
  const languageNames: Record<string, string> = {
    en: "English",
    ar: "Arabic",
    tr: "Turkish",
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Voices Library</h1>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Text</label>
                  <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something to convert to speech..."
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Language</label>
                    <Select value={languageId} onValueChange={setLanguageId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((language) => (
                          <SelectItem key={language.id} value={language.id.toString()}>
                            {languageNames[language.code] || language.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2 flex items-end">
                    <Button
                      onClick={handleGenerateTTS}
                      disabled={isLoading || !text || !languageId}
                      className="w-full md:w-auto"
                    >
                      <Volume2 className="mr-2 h-4 w-4" />
                      Generate Speech
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">History</h2>
            <Button variant="outline" size="sm" onClick={fetchEntries} disabled={isLoading}>
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading entries...</div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No voice entries yet. Create your first one!</div>
          ) : (
            <div className="grid gap-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <p className="font-medium truncate">{entry.text}</p>
                        <p className="text-sm text-muted-foreground">
                          {languageNames[getLanguageCode(entry.language_id)] || getLanguageCode(entry.language_id)}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handlePlayAudio(entry.id)}>
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirmation({ isOpen: true, entryId: entry.id })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      <DeleteConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, entryId: null })}
        onConfirm={() => deleteConfirmation.entryId && handleDeleteEntry(deleteConfirmation.entryId)}
        title="Delete Voice Entry"
        description="Are you sure you want to delete this voice entry? This action cannot be undone."
      />
    </div>
  )
}

