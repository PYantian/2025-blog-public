import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "@/components/auth/sign-in-button";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          border: "1px solid rgba(127,127,127,.2)",
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
          先验证 GitHub 身份
        </h1>
        <p style={{ lineHeight: 1.7, opacity: 0.8, marginBottom: 20 }}>
          只有被允许的 GitHub 账号登录后，才能进入应用。
        </p>

        <SignInButton
          className="inline-flex items-center justify-center rounded-md px-4 py-2 border"
          callbackUrl="/"
        />
      </div>
    </main>
  );
}
