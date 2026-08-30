interface GeneratedJobDescription {
  title: string;
  category: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  safetyGear: string[];
  suggestedSalaryMin: number;
  suggestedSalaryMax: number;
}

export function generateJobDescription(prompt: string): GeneratedJobDescription {
  const p = prompt.toLowerCase();

  if (p.includes("electrician") || p.includes("wiring") || p.includes("solar") || p.includes("panel")) {
    return {
      title: "Industrial & Commercial Electrician",
      category: "Electrician",
      description: "We are hiring skilled and certified Electricians for industrial wiring, panel installation, motor maintenance, and electrical diagnostics. Candidates should have prior experience in commercial or factory electrical layouts.",
      responsibilities: [
        "Read and interpret electrical circuit blueprints and technical schematics.",
        "Install, maintain, and repair electrical control systems, wiring, and lighting fixtures.",
        "Perform preventive maintenance on industrial motors, transformers, and switchboards.",
        "Troubleshoot electrical faults using multi-meters, insulation testers, and diagnostic tools.",
        "Ensure all installations comply with National Electrical Code and company safety standards."
      ],
      requiredSkills: ["Industrial Wiring", "Panel Board Installation", "Motor Maintenance", "Fault Diagnostics", "Safety Compliance"],
      safetyGear: ["Safety Helmet", "Insulated Rubber Gloves (11kV)", "Steel Toe Boots", "Safety Goggles"],
      suggestedSalaryMin: 22000,
      suggestedSalaryMax: 32000
    };
  }

  if (p.includes("warehouse") || p.includes("picker") || p.includes("packer") || p.includes("logistics") || p.includes("loader")) {
    return {
      title: "Warehouse Operations Executive",
      category: "Warehouse Executive",
      description: "Fast-growing supply chain hub seeks dependable Warehouse Associates for picking, packing, scanning, inventory sorting, and loading/unloading shipments.",
      responsibilities: [
        "Accurately pick, scan, and pack outgoing orders using handheld barcode scanners.",
        "Inspect received consignments for quality and update warehouse inventory records.",
        "Operate pallet jacks and material handling equipment safely.",
        "Sort merchandise by zone, batch, and route for timely dispatch.",
        "Maintain clean, organized, and accident-free warehouse staging areas."
      ],
      requiredSkills: ["Inventory Sorting", "Barcode Scanning", "Order Packing", "Pallet Handling", "Quality Check"],
      safetyGear: ["High-Visibility Vest", "Safety Shoes", "Grip Gloves"],
      suggestedSalaryMin: 18000,
      suggestedSalaryMax: 26000
    };
  }

  if (p.includes("plumb") || p.includes("pipe") || p.includes("sanitary")) {
    return {
      title: "Commercial & Residential Plumber",
      category: "Plumber",
      description: "Looking for experienced Plumbers for installation, maintenance, and emergency repair of high-pressure water lines, sanitary fittings, and commercial drainage systems.",
      responsibilities: [
        "Install, repair, and maintain CPVC, UPVC, and GI piping networks.",
        "Assemble and test valves, pumps, drainage joints, and commercial sanitary fixtures.",
        "Inspect drainage systems and resolve complex blockages and pressure issues.",
        "Perform hydrostatic pressure tests to verify leak-proof pipeline installations."
      ],
      requiredSkills: ["Piping Installation (CPVC/GI)", "Sanitary Fitting", "Leak Detection", "Pressure Testing", "Drainage Systems"],
      safetyGear: ["Waterproof Boots", "Heavy Duty Gloves", "Safety Goggles"],
      suggestedSalaryMin: 20000,
      suggestedSalaryMax: 28000
    };
  }

  if (p.includes("weld") || p.includes("fabricat") || p.includes("mig") || p.includes("tig")) {
    return {
      title: "Certified Welder & Metal Fabricator",
      category: "Welder",
      description: "Heavy manufacturing and infrastructure facility requires precision Welders proficient in MIG, TIG, and Arc welding techniques for structural steel fabrication.",
      responsibilities: [
        "Fabricate, cut, and join steel plates, girders, and structural components.",
        "Operate MIG, TIG, and Shielded Metal Arc Welding (SMAW) equipment.",
        "Inspect weld beads for porosity, penetration, and structural integrity.",
        "Maintain strict adherence to industrial welding safety protocols."
      ],
      requiredSkills: ["MIG Welding", "TIG Welding", "Arc Welding", "Metal Fabrication", "Blueprint Reading"],
      safetyGear: ["Auto-Darkening Welding Helmet", "Leather Welding Jacket & Gloves", "Steel Toe Boots"],
      suggestedSalaryMin: 24000,
      suggestedSalaryMax: 35000
    };
  }

  // Default / General Skilled
  return {
    title: "Skilled Technical Specialist",
    category: "Technician",
    description: `Urgent requirement based on requirement: "${prompt}". Seeking dedicated professionals with demonstrated trade expertise, disciplined work ethic, and focus on safety.`,
    responsibilities: [
      "Execute specialized trade tasks in accordance with engineering and supervisor guidelines.",
      "Inspect machinery, tools, and materials before initiating shift operations.",
      "Troubleshoot operational issues promptly to minimize downtime.",
      "Adhere strictly to personal safety standards and workplace protocols."
    ],
    requiredSkills: ["Trade Operations", "Equipment Handling", "Preventive Maintenance", "Safety Protocols"],
    safetyGear: ["Standard PPE", "Safety Shoes", "Protective Gloves"],
    suggestedSalaryMin: 20000,
    suggestedSalaryMax: 30000
  };
}
