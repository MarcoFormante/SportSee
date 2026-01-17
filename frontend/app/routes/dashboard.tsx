import type { Route } from "./+types/login";
import { DashboardPage } from "~/Dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - SportSee" },
    { name: "description", content: "Dashboard - SportSee" },
  ];
}

export default function Dashboard() {
  return <DashboardPage />;
}
