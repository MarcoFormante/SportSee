import { sessionExist } from "~/providers/userProvider";
import type { Route } from "./+types/login";
import { DashboardPage } from "~/Dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - SportSee" },
    { name: "description", content: "Dashboard - SportSee" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("cookie");
  const token = sessionExist && sessionStorage.getItem("token")
  
  return {
    token: cookieHeader?.replace("token=","") || token ,
  };
}

export default function Dashboard() {
  return <DashboardPage />;
}
