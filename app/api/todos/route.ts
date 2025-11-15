// app/api/todos/route.ts - Todos CRUD API Routes
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/todos
 * Alle Todos abrufen
 * @returns {NextResponse} Array aller Todos
 */
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: todos,
      count: todos.length,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Todos:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler beim Abrufen der Todos",
        message: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/todos
 * Neues Todo erstellen
 * @param {NextRequest} request - Request mit todo Daten
 * @returns {NextResponse} Das erstellte Todo
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      title?: string;
      description?: string;
    };

    // Validierung der Eingabedaten
    const { title, description } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
          message: "Titel ist erforderlich und darf nicht leer sein",
        },
        { status: 400 }
      );
    }

    if (title.length > 255) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
          message: "Titel darf maximal 255 Zeichen lang sein",
        },
        { status: 400 }
      );
    }

    if (description && typeof description !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation Error",
          message: "Beschreibung muss ein String sein",
        },
        { status: 400 }
      );
    }

    // Todo erstellen
    const newTodo = await prisma.todo.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo erfolgreich erstellt",
        data: newTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Fehler beim Erstellen des Todos:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler beim Erstellen des Todos",
        message: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 }
    );
  }
}
