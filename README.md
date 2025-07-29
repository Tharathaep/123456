# ระบบจัดการฝึกงาน (Internship Management System)

ระบบจัดการฝึกงานแบบครบวงจรสำหรับนักศึกษา บริษัท และอาจารย์/เจ้าหน้าที่

## 🚀 ฟีเจอร์หลัก

### 👨‍🎓 นักศึกษา
- สมัครบัญชีและเข้าสู่ระบบ
- แก้ไขโปรไฟล์ (เรซูเม่, สาขา, ปีที่ศึกษา)
- ดูประกาศฝึกงานจากบริษัท
- สมัครฝึกงานและแนบเอกสาร
- ติดตามสถานะ (รอตรวจสอบ / อนุมัติ / ไม่ผ่าน)
- บันทึกรายงานความคืบหน้า / ปฏิบัติงาน

### 🏢 บริษัท
- สมัครบัญชีและเข้าสู่ระบบ
- ลงประกาศรับนักศึกษาฝึกงาน
- ดูใบสมัครที่ส่งเข้ามา
- อนุมัติ / ปฏิเสธใบสมัคร
- แสดงรายละเอียดบริษัท / ผู้ประสานงาน

### 🧑‍🏫 อาจารย์ / เจ้าหน้าที่
- เข้าสู่ระบบ (แบบจัดการ)
- ดูรายการนักศึกษาทั้งหมด
- ตรวจสอบใบสมัคร / สถานะ
- อนุมัติ / แก้ไข / ลบ
- ออกรายงานการฝึกงาน (PDF / Excel)

### 📊 Dashboard แยกตามบทบาท
- **นักศึกษา**: กราฟแสดงจำนวนใบสมัคร, สถานะล่าสุด, บริษัทที่สมัคร
- **บริษัท**: จำนวนผู้สมัคร, สถานะใบสมัคร, ประวัตินักศึกษาที่รับแล้ว
- **อาจารย์**: สรุปจำนวนนักศึกษาฝึกงาน, บริษัทที่ร่วมโครงการ, การประเมินผล

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (Prisma ORM)
- **Authentication**: NextAuth.js
- **UI Components**: Lucide React Icons
- **Charts**: Recharts

## 📦 การติดตั้ง

### ข้อกำหนดเบื้องต้น
- Node.js 18+ 
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **Clone โปรเจค**
```bash
git clone <repository-url>
cd internship-management-system
```

2. **ติดตั้ง Dependencies**
```bash
npm install
```

3. **ตั้งค่าฐานข้อมูล**
```bash
npx prisma generate
npx prisma db push
```

4. **เพิ่มข้อมูลตัวอย่าง**
```bash
npx tsx src/scripts/seed.ts
```

5. **รันแอปพลิเคชัน**
```bash
npm run dev
```

6. **เปิดเบราว์เซอร์**
```
http://localhost:3000
```

## 👥 บัญชีทดสอบ

### นักศึกษา
- Email: `student1@example.com`
- Password: `password123`

### บริษัท
- Email: `company1@example.com`
- Password: `password123`

### อาจารย์/เจ้าหน้าที่
- Email: `admin@example.com`
- Password: `password123`

## 📁 โครงสร้างโปรเจค

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utilities and configurations
├── scripts/               # Database scripts
└── types/                 # TypeScript type definitions
```

## 🔧 การพัฒนา

### รันในโหมด Development
```bash
npm run dev
```

### Build สำหรับ Production
```bash
npm run build
npm start
```

### ตรวจสอบ TypeScript
```bash
npm run type-check
```

### ตรวจสอบ ESLint
```bash
npm run lint
```

## 📊 ฐานข้อมูล

ระบบใช้ Prisma ORM กับ SQLite database โดยมีโมเดลหลักดังนี้:

- **User**: ผู้ใช้งาน (นักศึกษา, บริษัท, อาจารย์)
- **Internship**: ประกาศฝึกงาน
- **Application**: ใบสมัครฝึกงาน
- **ProgressReport**: รายงานความคืบหน้า
- **Evaluation**: การประเมินผล
- **Announcement**: ประกาศ

## 🔐 การรักษาความปลอดภัย

- ใช้ NextAuth.js สำหรับ Authentication
- Middleware สำหรับป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต
- Validation ข้อมูลทั้ง Frontend และ Backend
- SQL Injection Protection ผ่าน Prisma ORM

## 📝 License

MIT License

## 🤝 การสนับสนุน

หากมีคำถามหรือต้องการความช่วยเหลือ กรุณาสร้าง Issue ใน GitHub repository