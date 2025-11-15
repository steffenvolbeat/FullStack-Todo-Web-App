// app/api/health/route.ts - Health Check API Route
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/health
 * Health Check Endpoint - Überprüft die Verbindung zur Datenbank
 * @returns {NextResponse} Status und Datenbank-Verbindungsinfo
 */
export async function GET() {
  try {
    // Datenbankverbindung testen
    await prisma.$connect()
    
    // Count der Todos für Verbindungstest
    const todoCount = await prisma.todo.count()
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Todo API ist bereit',
      database: {
        connected: true,
        totalTodos: todoCount
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health Check Fehler:', error)
    
    return NextResponse.json({
      status: 'unhealthy',
      message: 'Datenbankverbindung fehlgeschlagen',
      error: error instanceof Error ? error.message : 'Unbekannter Fehler',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}