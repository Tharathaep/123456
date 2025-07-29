import Link from 'next/link'
import { GraduationCap, Building2, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                ระบบจัดการฝึกงาน
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            ยินดีต้อนรับสู่ระบบจัดการฝึกงาน
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ระบบที่ออกแบบมาเพื่อเชื่อมต่อนักศึกษา บริษัท และอาจารย์ 
            ให้สามารถจัดการกระบวนการฝึกงานได้อย่างมีประสิทธิภาพ
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student Feature */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h3 className="ml-3 text-xl font-semibold text-gray-900">
                นักศึกษา
              </h3>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li>• สมัครบัญชีและแก้ไขโปรไฟล์</li>
              <li>• ดูประกาศฝึกงานจากบริษัท</li>
              <li>• สมัครฝึกงานและแนบเอกสาร</li>
              <li>• ติดตามสถานะการสมัคร</li>
              <li>• บันทึกรายงานความคืบหน้า</li>
            </ul>
          </div>

          {/* Company Feature */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-green-600" />
              <h3 className="ml-3 text-xl font-semibold text-gray-900">
                บริษัท
              </h3>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li>• ลงประกาศรับนักศึกษาฝึกงาน</li>
              <li>• ดูใบสมัครที่ส่งเข้ามา</li>
              <li>• อนุมัติหรือปฏิเสธใบสมัคร</li>
              <li>• แสดงรายละเอียดบริษัท</li>
              <li>• ติดตามนักศึกษาฝึกงาน</li>
            </ul>
          </div>

          {/* Admin Feature */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-purple-600" />
              <h3 className="ml-3 text-xl font-semibold text-gray-900">
                อาจารย์/เจ้าหน้าที่
              </h3>
            </div>
            <ul className="text-gray-600 space-y-2">
              <li>• ดูรายการนักศึกษาทั้งหมด</li>
              <li>• ตรวจสอบใบสมัครและสถานะ</li>
              <li>• อนุมัติ แก้ไข หรือลบข้อมูล</li>
              <li>• ออกรายงานการฝึกงาน</li>
              <li>• จัดการระบบโดยรวม</li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            เริ่มต้นใช้งานระบบ
          </h3>
          <p className="text-gray-600 mb-8">
            เลือกบทบาทของคุณและเริ่มต้นใช้งานระบบจัดการฝึกงาน
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/auth/signup?role=student"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
            >
              สมัครเป็นนักศึกษา
            </Link>
            <Link
              href="/auth/signup?role=company"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700"
            >
              สมัครเป็นบริษัท
            </Link>
            <Link
              href="/auth/signin"
              className="bg-gray-600 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 ระบบจัดการฝึกงาน. สงวนลิขสิทธิ์.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}