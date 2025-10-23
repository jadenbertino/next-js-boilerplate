import { handleErrors } from '@/lib/api/handleErrors'
import { NextRequest, NextResponse } from 'next/server'

export const GET = handleErrors(async (_req: NextRequest) => {
  return NextResponse.json({
    status: 'ok',
  })
})
