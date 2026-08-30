import { ParsedJobQuery, ShiftType } from "@/types";

const TRADE_KEYWORDS: Record<string, string[]> = {
  "Electrician": ["electrician", "electrical", "wiring", "wireman", "panel", "lineman", "motor", "generator"],
  "Plumber": ["plumber", "plumbing", "pipe", "sanitary", "fittings", "drainage", "leakage"],
  "Driver": ["driver", "driving", "chauffeur", "heavy vehicle", "truck", "commercial vehicle", "delivery driver"],
  "Technician": ["technician", "ac technician", "lift technician", "maintenance", "refrigeration", "hvac", "solar"],
  "Welder": ["welder", "welding", "tig", "mig", "arc welding", "fabricator", "fabrication"],
  "Carpenter": ["carpenter", "carpentry", "woodwork", "furniture", "shuttering"],
  "Warehouse Executive": ["warehouse", "inventory", "picker", "packer", "sorter", "loader", "logistics", "forklift"],
  "Delivery Executive": ["delivery", "courier", "rider", "biker", "field executive"],
  "Machine Operator": ["machine operator", "cnc", "lathe", "milling", "die maker", "plant operator"],
  "Construction Worker": ["construction", "mason", "bar bender", "concrete", "site worker", "civil"]
};

const INDIAN_CITIES = [
  "Hyderabad", "Bengaluru", "Bangalore", "Vijayawada", "Chennai", "Mumbai",
  "Delhi", "Pune", "Kolkata", "Ahmedabad", "Visakhapatnam", "Vizag", "Guntur", "Warangal", "Coimbatore", "Noida", "Gurugram"
];

export function parseNaturalLanguageQuery(query: string): ParsedJobQuery {
  const text = query.toLowerCase();
  const result: ParsedJobQuery = { rawQuery: query };

  // 1. Detect Trade / Skill
  for (const [trade, keywords] of Object.entries(TRADE_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) {
      result.skill = trade;
      break;
    }
  }

  // 2. Detect City / Location
  for (const city of INDIAN_CITIES) {
    if (text.includes(city.toLowerCase())) {
      result.location = city === "Bangalore" ? "Bengaluru" : city === "Vizag" ? "Visakhapatnam" : city;
      break;
    }
  }

  // 3. Detect Salary (e.g. 20000, 20k, 25,000, above 30000)
  const salaryKMatch = text.match(/(\d+)\s*k/i);
  if (salaryKMatch) {
    result.minSalary = parseInt(salaryKMatch[1], 10) * 1000;
  } else {
    const salaryNumMatch = text.match(/(?:above|>|more than|min|minimum|paying|salary)?\s*(?:₹|rs\.?|inr)?\s*(\d{2,3}[,\d]*00)/i);
    if (salaryNumMatch) {
      const cleanNum = salaryNumMatch[1].replace(/,/g, "");
      result.minSalary = parseInt(cleanNum, 10);
    }
  }

  // 4. Detect Shift
  if (text.includes("night") || text.includes("night shift")) {
    result.shift = "NIGHT";
  } else if (text.includes("day") || text.includes("day shift")) {
    result.shift = "DAY";
  } else if (text.includes("rotational")) {
    result.shift = "ROTATIONAL";
  }

  // 5. Detect Experience
  const expMatch = text.match(/(\d+)\s*(?:years?|yrs?)/i);
  if (expMatch) {
    result.experienceYears = parseInt(expMatch[1], 10);
  }

  return result;
}
