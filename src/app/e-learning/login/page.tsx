import { Suspense } from "react";
import { LoginForm } from "@/components/elearning/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
