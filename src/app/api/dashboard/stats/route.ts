import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { UserRole, ApplicationStatus } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const userRole = session.user.role

    let stats: any = {}

    if (userRole === UserRole.STUDENT) {
      // Student stats
      const applications = await prisma.application.findMany({
        where: { studentId: userId },
        include: { internship: true }
      })

      stats = {
        totalApplications: applications.length,
        pendingApplications: applications.filter(app => app.status === ApplicationStatus.PENDING).length,
        approvedApplications: applications.filter(app => app.status === ApplicationStatus.APPROVED).length,
        rejectedApplications: applications.filter(app => app.status === ApplicationStatus.REJECTED).length,
      }
    } else if (userRole === UserRole.COMPANY) {
      // Company stats
      const internships = await prisma.internship.findMany({
        where: { companyId: userId },
        include: {
          applications: true
        }
      })

      const allApplications = internships.flatMap(internship => internship.applications)

      stats = {
        totalInternships: internships.length,
        totalApplications: allApplications.length,
        pendingApplications: allApplications.filter(app => app.status === ApplicationStatus.PENDING).length,
        approvedApplications: allApplications.filter(app => app.status === ApplicationStatus.APPROVED).length,
        activeInterns: allApplications.filter(app => app.status === ApplicationStatus.APPROVED).length,
      }
    } else if (userRole === UserRole.ADMIN) {
      // Admin stats
      const [
        totalStudents,
        totalCompanies,
        totalInternships,
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications
      ] = await Promise.all([
        prisma.user.count({ where: { role: UserRole.STUDENT } }),
        prisma.user.count({ where: { role: UserRole.COMPANY } }),
        prisma.internship.count(),
        prisma.application.count(),
        prisma.application.count({ where: { status: ApplicationStatus.PENDING } }),
        prisma.application.count({ where: { status: ApplicationStatus.APPROVED } }),
        prisma.application.count({ where: { status: ApplicationStatus.REJECTED } })
      ])

      stats = {
        totalStudents,
        totalCompanies,
        totalInternships,
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        activeInterns: approvedApplications
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' },
      { status: 500 }
    )
  }
}