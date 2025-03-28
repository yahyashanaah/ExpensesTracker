import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "http://127.0.0.1:8000"

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/tts/tts/`, {
      headers: {
        Accept: "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "Failed to fetch TTS entries" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching TTS entries:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/tts/tts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.detail || "Failed to create TTS entry" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating TTS entry:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

