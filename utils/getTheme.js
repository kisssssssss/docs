import { cookies } from "next/headers";

export default function getTheme() {
  const theme = cookies().get("theme")?.value || "null";

  return [["sky"].includes(theme), theme];
}
