'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { UserRole } from '@/types'
import {
  GraduationCap,
  Building2,
  FileText,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp
} from 'lucide-react'

interface DashboardStats {
  totalApplications?: number
  pendingApplications?: number
  approvedApplications?: number
  rejectedApplications?: number
  totalInternships?: number
  activeInterns?: number
  totalStudents?: number
  totalCompanies?: number
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchStats()
    }
  }, [session])

  const getRoleName = () => {
    if (!session?.user?.role) return 'ผู้ใช้'
    
    switch (session.user.role) {
      case UserRole.STUDENT:
        return 'นักศึกษา'
      case UserRole.COMPANY:
        return 'บริษัท'
      case UserRole.ADMIN:
        return 'อาจารย์/เจ้าหน้าที่'
      default:
        return 'ผู้ใช้'
    }
  }

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ยินดีต้อนรับ, {session?.user?.name}</h1>
        <p className="text-gray-600">จัดการการฝึกงานของคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ใบสมัครทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">รอการตรวจสอบ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">อนุมัติแล้ว</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approvedApplications || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ไม่ผ่าน</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejectedApplications || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการล่าสุด</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">ดูประกาศฝึกงานใหม่</p>
              <p className="text-sm text-gray-600">มีประกาศฝึกงานใหม่ที่ตรงกับโปรไฟล์ของคุณ</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
              ดูประกาศ
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCompanyDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ยินดีต้อนรับ, {session?.user?.name}</h1>
        <p className="text-gray-600">จัดการประกาศฝึกงานและใบสมัคร</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ประกาศฝึกงาน</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInternships || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ใบสมัครทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">รอการตรวจสอบ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingApplications || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">นักศึกษาฝึกงาน</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeInterns || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการล่าสุด</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">มีใบสมัครใหม่</p>
              <p className="text-sm text-gray-600">มีนักศึกษาส่งใบสมัครเข้ามาใหม่</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
              ดูใบสมัคร
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ยินดีต้อนรับ, {session?.user?.name}</h1>
        <p className="text-gray-600">จัดการระบบการฝึกงาน</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">นักศึกษาทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">บริษัททั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCompanies || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ประกาศฝึกงาน</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInternships || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ใบสมัครทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalApplications || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">สถิติการสมัคร</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">รอการตรวจสอบ</span>
              <span className="font-semibold text-yellow-600">{stats.pendingApplications || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">อนุมัติแล้ว</span>
              <span className="font-semibold text-green-600">{stats.approvedApplications || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ไม่ผ่าน</span>
              <span className="font-semibold text-red-600">{stats.rejectedApplications || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการล่าสุด</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">มีใบสมัครใหม่</p>
                <p className="text-sm text-gray-600">รอการตรวจสอบ</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                ตรวจสอบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      {session?.user?.role === UserRole.STUDENT && renderStudentDashboard()}
      {session?.user?.role === UserRole.COMPANY && renderCompanyDashboard()}
      {session?.user?.role === UserRole.ADMIN && renderAdminDashboard()}
    </DashboardLayout>
  )
}