import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      password,
      role,
      studentId,
      major,
      year,
      gpa,
      companyName,
      companyAddress,
      contactPerson,
      phone,
      website,
      department,
      position
    } = body

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'อีเมลนี้ถูกใช้งานแล้ว' },
        { status: 400 }
      )
    }

    // Create user data based on role
    const userData: any = {
      name,
      email,
      password, // In production, hash the password
      role: role as UserRole
    }

    // Add role-specific fields
    if (role === 'STUDENT') {
      userData.studentId = studentId
      userData.major = major
      userData.year = year ? parseInt(year) : null
      userData.gpa = gpa ? parseFloat(gpa) : null
    } else if (role === 'COMPANY') {
      userData.companyName = companyName
      userData.companyAddress = companyAddress
      userData.contactPerson = contactPerson
      userData.phone = phone
      userData.website = website
    } else if (role === 'ADMIN') {
      userData.department = department
      userData.position = position
    }

    const user = await prisma.user.create({
      data: userData
    })

    return NextResponse.json(
      { message: 'สมัครสมาชิกสำเร็จ', user: { id: user.id, email: user.email, role: user.role } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' },
      { status: 500 }
    )
  }
}