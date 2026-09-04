import { LoginForm } from "./LoginForm";

export const metadata = { title: "admin · buidlers" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="min-h-screen bg-[#10100F] flex items-center justify-center p-6">
      <LoginForm next={next ?? "/admin"} />
    </div>
  );
}
