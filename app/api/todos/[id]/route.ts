// app/api/todos/[id]/route.ts - Individual Todo CRUD Operations
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/todos/[id]
 * Einzelnes Todo abrufen
 * @param {NextRequest} request 
 * @param {Object} params - Route Parameter
 * @param {Promise<{id: string}>} params.params - Todo ID (Promise in Next.js 16)
 * @returns {NextResponse} Das angeforderte Todo
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params
    const id = parseInt(idString)
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID',
        message: 'Todo ID muss eine gültige Zahl sein'
      }, { status: 400 })
    }

    /// Datenbankabfrage auf Todo mit der gegebenen ID
    const todo = await prisma.todo.findUnique({
      where: { id }
    })

    if (!todo) {
      return NextResponse.json({
        success: false,
        error: 'Not Found',
        message: `Todo mit ID ${id} wurde nicht gefunden`
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: todo
    })
    
  } catch (error) {
    console.error('Fehler beim Abrufen des Todos:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Fehler beim Abrufen des Todos',
      message: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }, { status: 500 })
  }
}

/**
 * PATCH /api/todos/[id]
 * Todo aktualisieren
 * @param {NextRequest} request - Request mit Update-Daten
 * @param {Object} params - Route Parameter
 * @param {Promise<{id: string}>} params.params - Todo ID (Promise in Next.js 16)
 * @returns {NextResponse} Das aktualisierte Todo
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id: number
  let idString: string = 'unknown'
  
  try {
    const resolvedParams = await params
    idString = resolvedParams.id
    id = parseInt(idString)
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID',
        message: 'Todo ID muss eine gültige Zahl sein'
      }, { status: 400 })
    }

    const body = await request.json() as any
    const { title, description, completed } = body

    // Validation
    const updateData: any = {}
    
    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return NextResponse.json({
          success: false,
          error: 'Validation Error',
          message: 'Titel darf nicht leer sein'
        }, { status: 400 })
      }
      
      if (title.length > 255) {
        return NextResponse.json({
          success: false,
          error: 'Validation Error',
          message: 'Titel darf maximal 255 Zeichen lang sein'
        }, { status: 400 })
      }
      
      updateData.title = title.trim()
    }
    
    if (description !== undefined) {
      if (description !== null && typeof description !== 'string') {
        return NextResponse.json({
          success: false,
          error: 'Validation Error',
          message: 'Beschreibung muss ein String oder null sein'
        }, { status: 400 })
      }
      updateData.description = description?.trim() || null
    }
    
    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return NextResponse.json({
          success: false,
          error: 'Validation Error',
          message: 'Completed muss ein Boolean sein'
        }, { status: 400 })
      }
      updateData.completed = completed
    }

    // Check if todo exists and update
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      message: 'Todo erfolgreich aktualisiert',
      data: updatedTodo
    })
    
  } catch (error: any) {
    console.error('Fehler beim Aktualisieren des Todos:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Not Found',
        message: `Todo mit ID ${idString || 'unknown'} wurde nicht gefunden`
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Fehler beim Aktualisieren des Todos',
      message: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }, { status: 500 })
  }
}

/**
 * DELETE /api/todos/[id]
 * Todo löschen
 * @param {NextRequest} request 
 * @param {Object} params - Route Parameter
 * @param {Promise<{id: string}>} params.params - Todo ID (Promise in Next.js 16)
 * @returns {NextResponse} Bestätigung der Löschung
 */

/// delete a todo by ID 
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let id: number
  let idString: string = 'unknown'
  
  try {
    const resolvedParams = await params
    idString = resolvedParams.id
    id = parseInt(idString)
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID',
        message: 'Todo ID muss eine gültige Zahl sein'
      }, { status: 400 })
    }

    await prisma.todo.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: `Todo mit ID ${id} wurde erfolgreich gelöscht`
    })
    
  } catch (error: any) {
    console.error('Fehler beim Löschen des Todos:', error)
    
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        error: 'Not Found',
        message: `Todo mit ID ${idString} wurde nicht gefunden`
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: false,
      error: 'Fehler beim Löschen des Todos',
      message: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }, { status: 500 })
  }
}