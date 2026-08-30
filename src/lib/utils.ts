import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(amount: number, type: "MONTHLY" | "DAILY" | "HOURLY" = "MONTHLY"): string {
  if (!amount || amount <= 0) return "Not disclosed";
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

  if (type === "DAILY") return `${formatted}/day`;
  if (type === "HOURLY") return `${formatted}/hr`;
  return `${formatted}/month`;
}

export function formatSalaryRange(min: number, max: number, type: "MONTHLY" | "DAILY" | "HOURLY" = "MONTHLY"): string {
  if (!min && !max) return "Competitive Pay";
  const minF = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(min);
  const maxF = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(max);

  if (type === "DAILY") return `₹${minF} - ₹${maxF}/day`;
  if (type === "HOURLY") return `₹${minF} - ₹${maxF}/hr`;
  return `₹${minF} - ₹${maxF}/mo`;
}

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Radius of earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function getRelativeTimeString(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHours = Math.floor(diffInMin / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 30) return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  if (diffInDays > 0) return `${diffInDays}d ago`;
  if (diffInHours > 0) return `${diffInHours}h ago`;
  if (diffInMin > 0) return `${diffInMin}m ago`;
  return "Just now";
}
