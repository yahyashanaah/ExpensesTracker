import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "http://127.0.0.1:8000"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const response = await fetch(`${API_BASE_URL}/tts/${id}`, {
      headers: {
        Accept: "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "Failed to get TTS entry" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error getting TTS entry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const response = await fetch(`${API_BASE_URL}/tts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const data = await response.json()
      return NextResponse.json({ error: data.detail || "Failed to delete TTS entry" }, { status: response.status })
    }

    return NextResponse.json({ message: "TTS entry deleted successfully" })
  } catch (error) {
    console.error("Error deleting TTS entry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
