import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const CITIES = [
  { city: "Bangalore", state: "Karnataka" },
  { city: "Delhi", state: "Delhi" },
  { city: "Mumbai", state: "Maharashtra" },
  { city: "Pune", state: "Maharashtra" },
  { city: "Hyderabad", state: "Telangana" },
  { city: "Chennai", state: "Tamil Nadu" },
  { city: "Kolkata", state: "West Bengal" },
];

const COLLEGE_NAMES = [
  "National Institute of Technology",
  "Indian Institute of Information Technology",
  "College of Engineering",
  "Institute of Technology and Science",
  "School of Engineering and Applied Science",
  "Institute of Advanced Studies",
  "College of Computer Science",
  "University Institute of Technology",
];

const COURSES = [
  { name: "Computer Science Engineering", duration: "4 years" },
  { name: "Electronics and Communication", duration: "4 years" },
  { name: "Mechanical Engineering", duration: "4 years" },
  { name: "Information Technology", duration: "4 years" },
  { name: "Civil Engineering", duration: "4 years" },
];

const EXAMS = ["JEE", "BITSAT", "State-CET"];
const CATEGORIES = ["General", "OBC", "SC", "ST"];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

function pick<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)]!;
}

async function main() {
  console.log("Clearing existing data...");
  await prisma.cutoffRecord.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  console.log("Seeding colleges...");

for (let i = 0; i < 40; i++) {
      console.log(`Creating college ${i + 1}/40...`);
    const location = pick(CITIES);
    const namePrefix = pick(COLLEGE_NAMES);

    const college = await prisma.college.create({
      data: {
        name: `${namePrefix} ${location.city} ${i + 1}`,
        city: location.city,
        state: location.state,
        fees: randomInt(80000, 500000),
        rating: randomFloat(2.5, 5.0),
      },
    });

    // Courses (2-4 per college)
    const numCourses = randomInt(2, 4);
    const shuffledCourses = [...COURSES].sort(() => Math.random() - 0.5).slice(0, numCourses);
    for (const course of shuffledCourses) {
      await prisma.course.create({
        data: {
          collegeId: college.id,
          name: course.name,
          duration: course.duration,
          fees: randomInt(60000, 400000),
        },
      });
    }

    // Placements (last 3 years)
    for (const year of [2023, 2024, 2025]) {
      await prisma.placement.create({
        data: {
          collegeId: college.id,
          year,
          avgPackage: randomFloat(3, 15),
          highestPackage: randomFloat(15, 50),
          placementRate: randomFloat(60, 98),
        },
      });
    }

    // Reviews (2-5 per college)
    const numReviews = randomInt(2, 5);
    for (let r = 0; r < numReviews; r++) {
      await prisma.review.create({
        data: {
          collegeId: college.id,
          author: `Student${randomInt(1, 999)}`,
          rating: randomFloat(2.5, 5.0),
          comment: pick([
            "Great faculty and infrastructure.",
            "Good placements but average hostel facilities.",
            "Highly recommend for CSE branch.",
            "Campus life is decent, labs need upgrades.",
            "Placement cell is very supportive.",
          ]),
        },
      });
    }

    // Cutoff records (for predictor)
    for (const exam of EXAMS) {
      for (const category of CATEGORIES) {
        await prisma.cutoffRecord.create({
          data: {
            collegeId: college.id,
            exam,
            category,
            closingRank: randomInt(500, 150000),
          },
        });
      }
    }
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
   await prisma.$disconnect();
  });