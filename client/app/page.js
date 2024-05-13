"use client";
import styles from "./page.module.css";
import { Router } from "next/navigation";
import Link from "next/link";
import FancyCard from "@/components/ui/FancyCard/FancyCard";

export default function Home() {
  return (
    <div>
      <FancyCard />
    </div>
  );
}
