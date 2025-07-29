import { PrismaClient, UserRole, InternshipStatus, ApplicationStatus } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const student1 = await prisma.user.create({
    data: {
      email: "student1@example.com",
      name: "สมชาย ใจดี",
      password: "password123",
      role: UserRole.STUDENT,
      studentId: "6400000001",
      major: "วิศวกรรมคอมพิวเตอร์",
      year: 3,
      gpa: 3.5
    }
  })

  const company1 = await prisma.user.create({
    data: {
      email: "company1@example.com",
      name: "บริษัท เทคโนโลยี จำกัด",
      password: "password123",
      role: UserRole.COMPANY,
      companyName: "บริษัท เทคโนโลยี จำกัด",
      companyAddress: "123 ถนนเทคโนโลยี กรุงเทพฯ 10400",
      contactPerson: "คุณจอห์น โด",
      phone: "02-123-4567",
      website: "https://techcompany.com"
    }
  })

  const admin1 = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "อาจารย์ผู้ดูแล",
      password: "password123",
      role: UserRole.ADMIN,
      department: "ภาควิชาวิศวกรรมคอมพิวเตอร์",
      position: "อาจารย์"
    }
  })

  console.log("Seed data created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
