import { PrismaClient, UserRole, InternshipStatus, ApplicationStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const student1 = await prisma.user.create({
    data: {
      email: 'student1@example.com',
      name: 'สมชาย ใจดี',
      password: 'password123',
      role: UserRole.STUDENT,
      studentId: '6400000001',
      major: 'วิศวกรรมคอมพิวเตอร์',
      year: 3,
      gpa: 3.5
    }
  })

  const student2 = await prisma.user.create({
    data: {
      email: 'student2@example.com',
      name: 'สมหญิง รักเรียน',
      password: 'password123',
      role: UserRole.STUDENT,
      studentId: '6400000002',
      major: 'วิศวกรรมคอมพิวเตอร์',
      year: 4,
      gpa: 3.8
    }
  })

  const company1 = await prisma.user.create({
    data: {
      email: 'company1@example.com',
      name: 'บริษัท เทคโนโลยี จำกัด',
      password: 'password123',
      role: UserRole.COMPANY,
      companyName: 'บริษัท เทคโนโลยี จำกัด',
      companyAddress: '123 ถนนเทคโนโลยี กรุงเทพฯ 10400',
      contactPerson: 'คุณจอห์น โด',
      phone: '02-123-4567',
      website: 'https://techcompany.com'
    }
  })

  const company2 = await prisma.user.create({
    data: {
      email: 'company2@example.com',
      name: 'บริษัท ซอฟต์แวร์ จำกัด',
      password: 'password123',
      role: UserRole.COMPANY,
      companyName: 'บริษัท ซอฟต์แวร์ จำกัด',
      companyAddress: '456 ถนนซอฟต์แวร์ กรุงเทพฯ 10500',
      contactPerson: 'คุณเจน สมิธ',
      phone: '02-987-6543',
      website: 'https://softwarecompany.com'
    }
  })

  const admin1 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'อาจารย์ผู้ดูแล',
      password: 'password123',
      role: UserRole.ADMIN,
      department: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
      position: 'อาจารย์'
    }
  })

  // Create sample internships
  const internship1 = await prisma.internship.create({
    data: {
      title: 'นักศึกษาฝึกงานด้าน Frontend Development',
      description: 'รับนักศึกษาฝึกงานเพื่อพัฒนาเว็บแอปพลิเคชันด้วย React และ TypeScript',
      requirements: 'มีความรู้พื้นฐาน HTML, CSS, JavaScript และ React',
      duration: '3 เดือน',
      stipend: '15,000 บาท/เดือน',
      location: 'กรุงเทพฯ',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      maxApplicants: 5,
      status: InternshipStatus.ACTIVE,
      companyId: company1.id
    }
  })

  const internship2 = await prisma.internship.create({
    data: {
      title: 'นักศึกษาฝึกงานด้าน Backend Development',
      description: 'รับนักศึกษาฝึกงานเพื่อพัฒนา API และฐานข้อมูล',
      requirements: 'มีความรู้พื้นฐาน Node.js, Express, และฐานข้อมูล SQL',
      duration: '3 เดือน',
      stipend: '18,000 บาท/เดือน',
      location: 'กรุงเทพฯ',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      maxApplicants: 3,
      status: InternshipStatus.ACTIVE,
      companyId: company2.id
    }
  })

  // Create sample applications
  const application1 = await prisma.application.create({
    data: {
      coverLetter: 'ผมมีความสนใจในการพัฒนาเว็บแอปพลิเคชันและต้องการเรียนรู้เทคโนโลยีใหม่ๆ',
      resume: 'https://example.com/resume1.pdf',
      transcript: 'https://example.com/transcript1.pdf',
      status: ApplicationStatus.PENDING,
      studentId: student1.id,
      internshipId: internship1.id
    }
  })

  const application2 = await prisma.application.create({
    data: {
      coverLetter: 'ดิฉันมีความรู้พื้นฐานด้าน Backend Development และต้องการพัฒนาทักษะ',
      resume: 'https://example.com/resume2.pdf',
      transcript: 'https://example.com/transcript2.pdf',
      status: ApplicationStatus.APPROVED,
      studentId: student2.id,
      internshipId: internship2.id
    }
  })

  // Create sample progress reports
  await prisma.progressReport.create({
    data: {
      week: 1,
      title: 'รายงานความคืบหน้าสัปดาห์ที่ 1',
      content: 'เรียนรู้โครงสร้างโปรเจคและเทคโนโลยีที่ใช้',
      hoursWorked: 40,
      challenges: 'ต้องเรียนรู้เทคโนโลยีใหม่หลายตัวพร้อมกัน',
      achievements: 'เข้าใจโครงสร้างโปรเจคและเริ่มเขียนโค้ดได้',
      nextWeekPlan: 'เริ่มพัฒนา feature ใหม่',
      studentId: student2.id,
      applicationId: application2.id
    }
  })

  // Create sample announcements
  await prisma.announcement.create({
    data: {
      title: 'เปิดรับสมัครฝึกงานภาคฤดูร้อน 2567',
      content: 'บริษัทต่างๆ เริ่มเปิดรับสมัครนักศึกษาฝึกงานแล้ว กรุณาตรวจสอบประกาศใหม่',
      type: 'GENERAL',
      priority: 'HIGH',
      isActive: true
    }
  })

  await prisma.announcement.create({
    data: {
      title: 'กำหนดส่งรายงานความคืบหน้า',
      content: 'นักศึกษาที่กำลังฝึกงานกรุณาส่งรายงานความคืบหน้าภายในวันที่ 15 ของทุกเดือน',
      type: 'STUDENT',
      priority: 'NORMAL',
      isActive: true
    }
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })