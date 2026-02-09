"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AccountNavigation() {
  const pathname = usePathname();
  return (
    <div id="wd-account-navigation list-group fs-5 rounded-0">
      <Link
        href="signin"
        id="signin"
        className={
          pathname === "/account/signin"
            ? "list-group-item active border-0"
            : "list-group-item text-danger border-0"
        }
      >
        Signin
      </Link>
      <br />
      <Link
        href="signup"
        id="singup"
        className={
          pathname === "/account/signup"
            ? "list-group-item active border-0"
            : "list-group-item text-danger border-0"
        }
      >
        Signup
      </Link>
      <br />
      <Link
        href="profile"
        id="profile"
        className={
          pathname === "/account/profile"
            ? "list-group-item active border-0"
            : "list-group-item text-danger border-0"
        }
      >
        Profile
      </Link>
      <br />
    </div>
  );
}
