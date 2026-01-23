import { sessionExist } from "~/providers/userProvider";
import type { Route } from "./+types/login";
import { ProfilePage } from "~/Profile/Profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Profile - SportSee" },
    { name: "description", content: "ProfilePage" },
  ];
}
export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("cookie");
   const token = sessionExist && sessionStorage.getItem("token")

  return {
    token: cookieHeader?.replace("token=","") || token,
  };
}


export default function Profile() {
  return <ProfilePage />;
}
