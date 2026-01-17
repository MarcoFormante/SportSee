import type { Route } from "./+types/login";
import { LoginPage } from "~/Login/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - SportSee" },
    { name: "description", content: "SportSee" },
  ];
}

export default function Login() {
  return <LoginPage />;
}
