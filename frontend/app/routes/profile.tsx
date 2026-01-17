import type { Route } from "./+types/login";
import { ProfilePage } from "~/Profil/Profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - SportSee" },
    { name: "description", content: "ProfilePage" },
  ];
}

export default function Profile() {
  return <ProfilePage />;
}
