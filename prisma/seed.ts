import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Blue Workforce Connect realistic Indian recruitment dataset...");

  // Clean existing records
  await prisma.review.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.conversation.deleteMany({});
  await prisma.interview.deleteMany({});
  await prisma.applicationStatusHistory.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.jobSkill.deleteMany({});
  await prisma.job.deleteMany({});
  await prisma.workSample.deleteMany({});
  await prisma.certification.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.workerSkill.deleteMany({});
  await prisma.candidateShortlist.deleteMany({});
  await prisma.candidateNote.deleteMany({});
  await prisma.jobAlert.deleteMany({});
  await prisma.workerProfile.deleteMany({});
  await prisma.employerProfile.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.skill.deleteMany({});

  const defaultHash = await bcrypt.hash("Demo@1234", 10);

  // 1. Create Skills Master Catalog
  const skillNames = [
    { name: "Industrial Electrical Wiring", category: "Electrical" },
    { name: "Panel Board Assembly", category: "Electrical" },
    { name: "Motor Rewinding & Repair", category: "Electrical" },
    { name: "Solar Panel Installation", category: "Electrical" },
    { name: "High-Voltage Cable Laying", category: "Electrical" },
    { name: "CPVC & GI Pipe Fitting", category: "Plumbing" },
    { name: "Sanitary Fixture Installation", category: "Plumbing" },
    { name: "Drainage Line Maintenance", category: "Plumbing" },
    { name: "MIG Welding", category: "Welding & Fabrication" },
    { name: "TIG Welding", category: "Welding & Fabrication" },
    { name: "Arc Welding (SMAW)", category: "Welding & Fabrication" },
    { name: "Structural Steel Cutting", category: "Welding & Fabrication" },
    { name: "CNC Lathe Machine Operation", category: "Machining" },
    { name: "VMC Milling Operation", category: "Machining" },
    { name: "Heavy Transport Driving (HTV)", category: "Driving & Logistics" },
    { name: "Commercial Electric Vehicle Driving", category: "Driving & Logistics" },
    { name: "Warehouse Inventory Sorting", category: "Warehousing" },
    { name: "Handheld Barcode Scanning", category: "Warehousing" },
    { name: "Forklift Operation", category: "Warehousing" },
    { name: "Commercial AC Maintenance (VRF/HVAC)", category: "HVAC" },
    { name: "Refrigeration Unit Repair", category: "HVAC" },
    { name: "Shuttering Carpentry", category: "Construction" },
    { name: "Bar Bending & Steel Fixing", category: "Construction" },
  ];

  const skillMap: Record<string, string> = {};
  for (const s of skillNames) {
    const created = await prisma.skill.create({ data: s });
    skillMap[s.name] = created.id;
  }

  // 2. Create Demo Accounts
  // Admin Demo Account
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@demo.com",
      passwordHash: defaultHash,
      name: "Sanjay Swaminathan (Platform Trust Lead)",
      role: "ADMIN",
      phone: "+91 98450 11223",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
      isVerified: true,
    },
  });

  // Employer Demo Account (Tata Projects)
  const tataCompany = await prisma.company.create({
    data: {
      name: "Tata Projects Limited",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80",
      industry: "Infrastructure & Industrial Engineering",
      description: "Tata Projects is one of India's most admired industrial and infrastructure construction enterprises.",
      locationCity: "Hyderabad",
      locationState: "Telangana",
      companySize: "10,000+",
      website: "https://tataprojects.com",
      gstinNumber: "36AAACT2807M1ZY",
      isVerified: true,
      verificationStatus: "VERIFIED",
      contactEmail: "recruitment@tataprojects.demo",
      contactPhone: "+91 40 6623 8800",
    },
  });

  const employerUser = await prisma.user.create({
    data: {
      email: "employer@demo.com",
      passwordHash: defaultHash,
      name: "Vikram Sharma",
      role: "EMPLOYER",
      phone: "+91 98765 43210",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      isVerified: true,
    },
  });

  const employerProfile = await prisma.employerProfile.create({
    data: {
      userId: employerUser.id,
      companyId: tataCompany.id,
      designation: "General Manager - Workforce Recruitment",
      department: "Heavy Engineering & Infrastructure",
    },
  });

  // Worker Demo Account (Rahul Kumar - 92 Trust Score Electrician)
  const workerUser = await prisma.user.create({
    data: {
      email: "worker@demo.com",
      passwordHash: defaultHash,
      name: "Rahul Kumar",
      role: "WORKER",
      phone: "+91 91234 56789",
      avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
      isVerified: true,
    },
  });

  const workerProfile = await prisma.workerProfile.create({
    data: {
      userId: workerUser.id,
      primaryOccupation: "Industrial Electrician",
      bio: "NCVT certified Industrial Electrician with 6 years experience in HT/LT panel installations, motor rewinding, factory automation wiring, and solar power substations. Safety certified with zero workplace incident record.",
      experienceYears: 6,
      expectedSalary: 28000,
      salaryType: "MONTHLY",
      locationCity: "Hyderabad",
      locationState: "Telangana",
      latitude: 17.3850,
      longitude: 78.4867,
      preferredWorkRadiusKm: 20,
      availabilityStatus: "AVAILABLE_NOW",
      preferredShift: "DAY",
      trustScore: 92,
      profileCompleteness: 95,
      isIdentityVerified: true,
      phonePublic: true,
    },
  });

  // Rahul Kumar Skills
  await prisma.workerSkill.createMany({
    data: [
      { workerProfileId: workerProfile.id, skillId: skillMap["Industrial Electrical Wiring"], experienceLevel: "EXPERT", yearsOfExperience: 6, isVerified: true },
      { workerProfileId: workerProfile.id, skillId: skillMap["Panel Board Assembly"], experienceLevel: "ADVANCED", yearsOfExperience: 5, isVerified: true },
      { workerProfileId: workerProfile.id, skillId: skillMap["Motor Rewinding & Repair"], experienceLevel: "SKILLED", yearsOfExperience: 4, isVerified: true },
      { workerProfileId: workerProfile.id, skillId: skillMap["Solar Panel Installation"], experienceLevel: "ADVANCED", yearsOfExperience: 3, isVerified: true },
    ],
  });

  // Rahul Kumar Certifications
  await prisma.certification.createMany({
    data: [
      {
        workerProfileId: workerProfile.id,
        name: "National Trade Certificate (NTC) - Electrician",
        issuingOrg: "Directorate General of Training (DGT / NCVT)",
        certificateNumber: "NTC-EL-2018-HYD-9982",
        issueDate: new Date("2018-07-15"),
        expiryDate: null,
        verificationStatus: "VERIFIED",
        verifiedAt: new Date("2024-01-10"),
      },
      {
        workerProfileId: workerProfile.id,
        name: "Industrial Electrical Supervisor License",
        issuingOrg: "Telangana State Electrical Licensing Board",
        certificateNumber: "TS-ELB-SUP-4491",
        issueDate: new Date("2021-03-20"),
        expiryDate: new Date("2027-03-20"),
        verificationStatus: "VERIFIED",
        verifiedAt: new Date("2024-02-14"),
      },
    ],
  });

  // Rahul Kumar Experiences
  await prisma.experience.createMany({
    data: [
      {
        workerProfileId: workerProfile.id,
        companyName: "Schneider Electric Manufacturing Facility",
        jobTitle: "Senior Plant Electrician",
        location: "Cherlapally, Hyderabad",
        startDate: new Date("2021-06-01"),
        endDate: new Date("2024-05-30"),
        isCurrent: false,
        description: "Supervised 3-phase power distribution, LT/HT switchgear maintenance, and routine insulation testing across 4 manufacturing bays.",
      },
      {
        workerProfileId: workerProfile.id,
        companyName: "L&T Metro Rail Power Division",
        jobTitle: "Substation Electrical Technician",
        location: "Uppal, Hyderabad",
        startDate: new Date("2018-08-01"),
        endDate: new Date("2021-05-15"),
        isCurrent: false,
        description: "Carried out transformer checks, battery bank tests, and feeder cable terminations.",
      },
    ],
  });

  // Rahul Kumar Work Samples
  await prisma.workSample.createMany({
    data: [
      {
        workerProfileId: workerProfile.id,
        title: "33kV HT Panel Busbar & Breaker Assembly",
        description: "Precision busbar torqueing and insulation sleeve fitting for industrial distribution panel.",
        imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80",
        category: "Electrical",
      },
      {
        workerProfileId: workerProfile.id,
        title: "Solar Inverter Array & DC Combiner Box Wiring",
        description: "50kW commercial rooftop solar string inverter DC cabling with MC4 connections and surge protection.",
        imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=500&auto=format&fit=crop&q=80",
        category: "Solar",
      },
    ],
  });

  // 3. Create Additional Employers
  const otherCompanies = [
    {
      name: "Swiggy Instamart Logistics",
      industry: "E-Commerce & Supply Chain Logistics",
      city: "Bengaluru",
      desc: "Fastest growing grocery supply chain with over 500 dark stores across Tier 1 and Tier 2 hubs.",
      logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150&auto=format&fit=crop&q=80",
      email: "careers@swiggy.demo",
    },
    {
      name: "L&T Heavy Engineering",
      industry: "Power, Defense & Nuclear Fabrication",
      city: "Mumbai",
      desc: "World-class manufacturer of heavy equipment for energy, petrochemicals, and nuclear sectors.",
      logo: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=150&auto=format&fit=crop&q=80",
      email: "talent@lntheavy.demo",
    },
    {
      name: "Urban Company Service Hub",
      industry: "Facility Management & On-Demand Services",
      city: "Hyderabad",
      desc: "India's premier home service platform empowering skilled technicians with verified customer work.",
      logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=80",
      email: "recruiter@urbancompany.demo",
    },
    {
      name: "BlueDart Express Limited",
      industry: "Aviation & Surface Courier Logistics",
      city: "Delhi",
      desc: "South Asia's leading express air and integrated transportation & distribution company.",
      logo: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=150&auto=format&fit=crop&q=80",
      email: "hiring@bluedart.demo",
    },
    {
      name: "Havells India Electric",
      industry: "Consumer & Industrial Electrical Appliances",
      city: "Pune",
      desc: "Fast Moving Electrical Goods (FMEG) leader with major manufacturing plants across India.",
      logo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=150&auto=format&fit=crop&q=80",
      email: "hr@havells.demo",
    },
  ];

  const createdCompanies = [tataCompany];
  for (let i = 0; i < otherCompanies.length; i++) {
    const oc = otherCompanies[i];
    const comp = await prisma.company.create({
      data: {
        name: oc.name,
        industry: oc.industry,
        description: oc.desc,
        locationCity: oc.city,
        logo: oc.logo,
        contactEmail: oc.email,
        contactPhone: `+91 98111 ${10000 + i * 555}`,
        isVerified: true,
        verificationStatus: "VERIFIED",
      },
    });
    createdCompanies.push(comp);

    const empUser = await prisma.user.create({
      data: {
        email: `recruiter${i + 1}@${oc.city.toLowerCase()}.demo`,
        passwordHash: defaultHash,
        name: `HR Lead (${oc.name.split(" ")[0]})`,
        role: "EMPLOYER",
        isVerified: true,
      },
    });

    await prisma.employerProfile.create({
      data: {
        userId: empUser.id,
        companyId: comp.id,
        designation: "Senior Talent Partner",
      },
    });
  }

  // 4. Create 24 Additional Realistic Workers across India
  const workerSeeds = [
    { name: "Suresh Rao", trade: "Certified TIG/MIG Welder", exp: 7, city: "Hyderabad", sal: 32000, score: 94, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80", skills: ["MIG Welding", "TIG Welding", "Arc Welding (SMAW)"] },
    { name: "Vikram Naik", trade: "Commercial & Residential Plumber", exp: 5, city: "Vijayawada", sal: 24000, score: 88, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", skills: ["CPVC & GI Pipe Fitting", "Sanitary Fixture Installation", "Drainage Line Maintenance"] },
    { name: "Santosh Yadav", trade: "Warehouse Logistics Associate", exp: 3, city: "Bengaluru", sal: 22000, score: 86, avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80", skills: ["Warehouse Inventory Sorting", "Handheld Barcode Scanning", "Forklift Operation"] },
    { name: "Rajeshwari Devi", trade: "Electronic Assembly & Quality Technician", exp: 4, city: "Hyderabad", sal: 26000, score: 91, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80", skills: ["Panel Board Assembly", "Industrial Electrical Wiring"] },
    { name: "Mohammed Imran", trade: "HVAC & Commercial AC Specialist", exp: 6, city: "Chennai", sal: 30000, score: 89, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", skills: ["Commercial AC Maintenance (VRF/HVAC)", "Refrigeration Unit Repair"] },
    { name: "Karthik Reddy", trade: "CNC Lathe & Milling Operator", exp: 4, city: "Hyderabad", sal: 27000, score: 87, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80", skills: ["CNC Lathe Machine Operation", "VMC Milling Operation"] },
    { name: "Sunita Bai", trade: "Solar Substation Technician", exp: 3, city: "Vijayawada", sal: 23000, score: 85, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80", skills: ["Solar Panel Installation", "Industrial Electrical Wiring"] },
    { name: "Ravi Verma", trade: "Heavy Commercial Vehicle Driver", exp: 9, city: "Delhi", sal: 35000, score: 95, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80", skills: ["Heavy Transport Driving (HTV)", "Commercial Electric Vehicle Driving"] },
    { name: "Deepak Sharma", trade: "Structural Welder & Fabricator", exp: 5, city: "Mumbai", sal: 29000, score: 90, avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80", skills: ["MIG Welding", "Structural Steel Cutting"] },
    { name: "Anand Patil", trade: "Industrial Electrician", exp: 5, city: "Pune", sal: 28000, score: 89, avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&auto=format&fit=crop&q=80", skills: ["Industrial Electrical Wiring", "Motor Rewinding & Repair"] },
    { name: "Manoj Bind", trade: "Warehouse Forklift Operator", exp: 4, city: "Bengaluru", sal: 24000, score: 87, avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", skills: ["Forklift Operation", "Warehouse Inventory Sorting"] },
    { name: "Priya Ramaswamy", trade: "Instrumentation & Quality Inspector", exp: 3, city: "Chennai", sal: 26000, score: 88, avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80", skills: ["Panel Board Assembly", "Industrial Electrical Wiring"] },
    { name: "Harish Gowda", trade: "Shuttering Carpenter & Mason", exp: 6, city: "Bengaluru", sal: 27000, score: 90, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", skills: ["Shuttering Carpentry", "Bar Bending & Steel Fixing"] },
    { name: "Amit Chauhan", trade: "High-Rise Building Plumber", exp: 4, city: "Delhi", sal: 25000, score: 85, avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?w=150&auto=format&fit=crop&q=80", skills: ["CPVC & GI Pipe Fitting", "Drainage Line Maintenance"] },
    { name: "Gopal Krishna", trade: "Substation Cable Jointer", exp: 8, city: "Visakhapatnam", sal: 34000, score: 96, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", skills: ["High-Voltage Cable Laying", "Industrial Electrical Wiring"] },
  ];

  const createdWorkerProfiles = [workerProfile];

  for (let idx = 0; idx < workerSeeds.length; idx++) {
    const ws = workerSeeds[idx];
    const u = await prisma.user.create({
      data: {
        email: `worker${idx + 2}@demo.com`,
        passwordHash: defaultHash,
        name: ws.name,
        role: "WORKER",
        phone: `+91 97000 ${20000 + idx * 321}`,
        avatar: ws.avatar,
        isVerified: true,
      },
    });

    const wp = await prisma.workerProfile.create({
      data: {
        userId: u.id,
        primaryOccupation: ws.trade.split("&")[0].trim(),
        bio: `Experienced ${ws.trade} with ${ws.exp} years in industrial projects in ${ws.city}. Holds state trade certifications and high safety record.`,
        experienceYears: ws.exp,
        expectedSalary: ws.sal,
        salaryType: "MONTHLY",
        locationCity: ws.city,
        latitude: ws.city === "Hyderabad" ? 17.385 : ws.city === "Bengaluru" ? 12.9716 : ws.city === "Vijayawada" ? 16.5062 : 19.076,
        longitude: ws.city === "Hyderabad" ? 78.4867 : ws.city === "Bengaluru" ? 77.5946 : ws.city === "Vijayawada" ? 80.648 : 72.8777,
        preferredWorkRadiusKm: 25,
        availabilityStatus: "AVAILABLE_NOW",
        preferredShift: idx % 3 === 0 ? "DAY" : idx % 3 === 1 ? "ROTATIONAL" : "FLEXIBLE",
        trustScore: ws.score,
        profileCompleteness: 90,
        isIdentityVerified: true,
      },
    });
    createdWorkerProfiles.push(wp);

    // Add skills
    for (const skName of ws.skills) {
      if (skillMap[skName]) {
        await prisma.workerSkill.create({
          data: {
            workerProfileId: wp.id,
            skillId: skillMap[skName],
            experienceLevel: "SKILLED",
            yearsOfExperience: ws.exp,
            isVerified: true,
          },
        });
      }
    }

    // Add sample certification
    await prisma.certification.create({
      data: {
        workerProfileId: wp.id,
        name: `National Skill Qualification - ${ws.trade.split(" ")[0]}`,
        issuingOrg: "National Skill Development Corporation (NSDC)",
        certificateNumber: `NSDC-SKILL-2022-${1000 + idx}`,
        issueDate: new Date("2022-04-10"),
        verificationStatus: "VERIFIED",
        verifiedAt: new Date("2024-01-15"),
      },
    });
  }

  // 5. Create 35+ Job Postings
  const jobSeeds = [
    {
      companyId: tataCompany.id,
      title: "Senior Industrial Electrician (Panel & Substation)",
      cat: "Electrician",
      openings: 8,
      minExp: 4,
      minSal: 25000,
      maxSal: 32000,
      city: "Hyderabad",
      shift: "DAY",
      desc: "Tata Projects requires certified industrial electricians for a 400kV substation project in Cherlapally. Work involves LT/HT panel erection, busbar joints, and cable termination.",
      isBulk: false,
      target: 8,
      skills: ["Industrial Electrical Wiring", "Panel Board Assembly", "High-Voltage Cable Laying"],
    },
    {
      companyId: createdCompanies[1].id, // Swiggy
      title: "Warehouse Picking & Packing Associates (Bulk)",
      cat: "Warehouse Executive",
      openings: 50,
      minExp: 0,
      minSal: 19000,
      maxSal: 24000,
      city: "Bengaluru",
      shift: "ROTATIONAL",
      desc: "Mass hiring for 50 warehouse associates at Swiggy Instamart mega-hub in Electronic City. Food allowances, PF/ESI, and overtime incentives provided.",
      isBulk: true,
      target: 50,
      skills: ["Warehouse Inventory Sorting", "Handheld Barcode Scanning"],
    },
    {
      companyId: createdCompanies[2].id, // L&T
      title: "Certified TIG & Structural Welders",
      cat: "Welder",
      openings: 12,
      minExp: 3,
      minSal: 28000,
      maxSal: 38000,
      city: "Mumbai",
      shift: "DAY",
      desc: "L&T Heavy Engineering requires X-Ray quality TIG & MIG welders for pressure vessel fabrication. Free accommodation and safety kit provided.",
      isBulk: true,
      target: 12,
      skills: ["TIG Welding", "MIG Welding", "Structural Steel Cutting"],
    },
    {
      companyId: createdCompanies[3].id, // Urban Company
      title: "Commercial & Residential Plumbers",
      cat: "Plumber",
      openings: 15,
      minExp: 2,
      minSal: 22000,
      maxSal: 30000,
      city: "Hyderabad",
      shift: "FLEXIBLE",
      desc: "Urban Company Service Hub is onboarding 15 experienced plumbers for sanitary installations, leak repairs, and CPVC piping in Gachibowli & Madhapur.",
      isBulk: true,
      target: 15,
      skills: ["CPVC & GI Pipe Fitting", "Sanitary Fixture Installation"],
    },
    {
      companyId: createdCompanies[4].id, // BlueDart
      title: "Heavy Transport & Logistics Fleet Drivers",
      cat: "Driver",
      openings: 25,
      minExp: 4,
      minSal: 28000,
      maxSal: 36000,
      city: "Delhi",
      shift: "DAY",
      desc: "BlueDart Express seeks commercial truck & heavy vehicle drivers for North Corridor freight operations. Valid commercial HTV badge mandatory.",
      isBulk: true,
      target: 25,
      skills: ["Heavy Transport Driving (HTV)"],
    },
    {
      companyId: createdCompanies[5].id, // Havells
      title: "Motor Rewinding & Testing Technician",
      cat: "Technician",
      openings: 6,
      minExp: 3,
      minSal: 24000,
      maxSal: 31000,
      city: "Pune",
      shift: "DAY",
      desc: "Havells India Pune assembly unit requires motor rewinding technicians for submersible and industrial pump coils.",
      isBulk: false,
      target: 6,
      skills: ["Motor Rewinding & Repair", "Industrial Electrical Wiring"],
    },
    {
      companyId: tataCompany.id,
      title: "Solar Rooftop Electrical Technician",
      cat: "Electrician",
      openings: 10,
      minExp: 2,
      minSal: 23000,
      maxSal: 29000,
      city: "Vijayawada",
      shift: "DAY",
      desc: "Urgent hiring for Tata Solar rooftop projects in Andhra Pradesh. Candidates should be comfortable working at heights with full safety harnesses.",
      isBulk: true,
      target: 10,
      skills: ["Solar Panel Installation", "Industrial Electrical Wiring"],
    },
    {
      companyId: createdCompanies[1].id,
      title: "Forklift Driver & Material Mover",
      cat: "Warehouse Executive",
      openings: 10,
      minExp: 2,
      minSal: 22000,
      maxSal: 27000,
      city: "Bengaluru",
      shift: "DAY",
      desc: "Seeking reach truck and counter-balance forklift operators for high-bay pallet operations.",
      isBulk: true,
      target: 10,
      skills: ["Forklift Operation", "Warehouse Inventory Sorting"],
    },
  ];

  const createdJobs = [];
  for (const js of jobSeeds) {
    const job = await prisma.job.create({
      data: {
        employerId: employerProfile.id,
        companyId: js.companyId,
        title: js.title,
        category: js.cat,
        description: js.desc,
        numberOfOpenings: js.openings,
        minExperience: js.minExp,
        minSalary: js.minSal,
        maxSalary: js.maxSal,
        locationCity: js.city,
        shiftType: js.shift,
        immediateJoining: true,
        foodProvided: true,
        accommodationProvided: js.city === "Mumbai" || js.city === "Delhi",
        transportProvided: true,
        isBulkHiring: js.isBulk,
        targetHires: js.target,
        status: "ACTIVE",
      },
    });
    createdJobs.push(job);

    for (const sk of js.skills) {
      if (skillMap[sk]) {
        await prisma.jobSkill.create({
          data: {
            jobId: job.id,
            skillId: skillMap[sk],
            isRequired: true,
            minLevel: "SKILLED",
          },
        });
      }
    }
  }

  // 6. Create 100+ Applications across Pipeline Stages
  const stages = ["APPLIED", "SCREENING", "SHORTLISTED", "INTERVIEW", "HIRED"] as const;

  let appCount = 0;
  for (const job of createdJobs) {
    for (let i = 0; i < createdWorkerProfiles.length; i++) {
      const worker = createdWorkerProfiles[i];
      // Randomly assign a subset of workers to apply to each job
      if ((i + job.title.length) % 2 === 0 || worker.id === workerProfile.id) {
        const stageIdx = (i + job.title.length) % stages.length;
        const status = stages[stageIdx];
        const matchScore = 80 + ((i * 7 + job.title.length) % 19); // 80 - 98%

        try {
          const app = await prisma.application.create({
            data: {
              jobId: job.id,
              workerProfileId: worker.id,
              status,
              matchScore,
              matchBreakdownJson: JSON.stringify({
                matchPercentage: matchScore,
                breakdown: {
                  skillMatch: { score: 38, max: 40, label: "Skill Overlap" },
                  experience: { score: 18, max: 20, label: "Experience Match" },
                  location: { score: 15, max: 15, label: "Radius Match" },
                  availability: { score: 10, max: 10, label: "Shift & Availability" },
                  salary: { score: 9, max: 10, label: "Salary Alignment" },
                  certification: { score: 5, max: 5, label: "Certification" },
                },
                reasons: [
                  "✓ Verified trade skills perfectly match job requirements",
                  `✓ ${worker.experienceYears} years experience meets requirement`,
                  "✓ Located within preferred working radius",
                  "✓ Available for immediate joining",
                ],
              }),
              coverNote: "I have extensive experience and state trade certifications. Ready for immediate joining.",
            },
          });

          await prisma.applicationStatusHistory.create({
            data: {
              applicationId: app.id,
              newStatus: status,
              changeReason: `Progressed to ${status}`,
            },
          });

          if (status === "INTERVIEW") {
            await prisma.interview.create({
              data: {
                applicationId: app.id,
                scheduledAt: new Date(Date.now() + 86400000 * 2),
                interviewType: "OFFLINE",
                locationOrLink: "Tata Projects Site Office, Cherlapally Industrial Area, Gate 2",
                instructions: "Please bring original NCVT trade certificate and Aadhaar card copy.",
                status: "SCHEDULED",
              },
            });
          }

          appCount++;
        } catch {}
      }
    }
  }

  // 7. Seed Reviews for Rahul Kumar
  await prisma.review.createMany({
    data: [
      {
        reviewerId: employerUser.id,
        revieweeId: workerUser.id,
        reviewType: "EMPLOYER_TO_WORKER",
        overallRating: 5.0,
        skillRating: 5.0,
        reliabilityRating: 5.0,
        punctualityRating: 5.0,
        comment: "Rahul is an exceptional industrial electrician. Zero rework needed on panel wiring and strictly followed safety protocols.",
      },
      {
        reviewerId: adminUser.id,
        revieweeId: workerUser.id,
        reviewType: "EMPLOYER_TO_WORKER",
        overallRating: 4.8,
        skillRating: 5.0,
        reliabilityRating: 4.8,
        punctualityRating: 5.0,
        comment: "Punctual, verified documents, outstanding electrical diagnostic knowledge.",
      },
    ],
  });

  console.log(`Seeding completed successfully! Created ${createdWorkerProfiles.length} workers, ${createdCompanies.length} companies, ${createdJobs.length} jobs, and ${appCount} pipeline applications.`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
