import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const siteConfig = {
  name: "Seattle Shaadi",
  description: "Seattle's premier wedding planning company specializing in luxurious, culturally-rich South Asian and Indian weddings. Let us craft your dream day.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://seattleshaadi.com",
};
