'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  GraduationCap,
  Building2,
  Users,
  Home,
  FileText,
  Briefcase,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  ClipboardList,
  MessageSquare,
  Calendar
} from 'lucide-react'
import { UserRole } from '@/types'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const studentMenuItems = [
    { name: 'หน้าหลัก', href: '/dashboard', icon: Home },
    { name: 'ประกาศฝึกงาน', href: '/dashboard/internships', icon: Briefcase },
    { name: 'ใบสมัครของฉัน', href: '/dashboard/applications', icon: FileText },
    { name: 'รายงานความคืบหน้า', href: '/dashboard/progress-reports', icon: ClipboardList },
    { name: 'โปรไฟล์', href: '/dashboard/profile', icon: User },
  ]

  const companyMenuItems = [
    { name: 'หน้าหลัก', href: '/dashboard', icon: Home },
    { name: 'ประกาศฝึกงาน', href: '/dashboard/internships', icon: Briefcase },
    { name: 'ใบสมัครที่ได้รับ', href: '/dashboard/applications', icon: FileText },
    { name: 'นักศึกษาฝึกงาน', href: '/dashboard/interns', icon: Users },
    { name: 'โปรไฟล์บริษัท', href: '/dashboard/profile', icon: Building2 },
  ]

  const adminMenuItems = [
    { name: 'หน้าหลัก', href: '/dashboard', icon: Home },
    { name: 'จัดการนักศึกษา', href: '/dashboard/students', icon: GraduationCap },
    { name: 'จัดการบริษัท', href: '/dashboard/companies', icon: Building2 },
    { name: 'ประกาศฝึกงาน', href: '/dashboard/internships', icon: Briefcase },
    { name: 'ใบสมัครทั้งหมด', href: '/dashboard/applications', icon: FileText },
    { name: 'รายงาน', href: '/dashboard/reports', icon: BarChart3 },
    { name: 'ประกาศ', href: '/dashboard/announcements', icon: MessageSquare },
  ]

  const getMenuItems = () => {
    if (!session?.user?.role) return []
    
    switch (session.user.role) {
      case UserRole.STUDENT:
        return studentMenuItems
      case UserRole.COMPANY:
        return companyMenuItems
      case UserRole.ADMIN:
        return adminMenuItems
      default:
        return []
    }
  }

  const getRoleIcon = () => {
    if (!session?.user?.role) return Users
    
    switch (session.user.role) {
      case UserRole.STUDENT:
        return GraduationCap
      case UserRole.COMPANY:
        return Building2
      case UserRole.ADMIN:
        return Users
      default:
        return Users
    }
  }

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

  const menuItems = getMenuItems()
  const RoleIcon = getRoleIcon()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <RoleIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-lg font-semibold">ระบบจัดการฝึกงาน</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <div className="flex items-center">
              <RoleIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-lg font-semibold">ระบบจัดการฝึกงาน</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="flex items-center gap-x-4">
                <span className="text-sm text-gray-700">
                  {session?.user?.name} ({getRoleName()})
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-x-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4" />
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}