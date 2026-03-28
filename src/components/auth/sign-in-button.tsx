"use client";

import { signIn } from "next-auth/react";

type SignInButtonProps = {
  callbackUrl?: string;
  className?: string;
};

export function SignInButton({
  callbackUrl = "/",
  className,
}: SignInButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => signIn("github", { callbackUrl })}
    >
      使用 GitHub 登录
    </button>
  );
}
