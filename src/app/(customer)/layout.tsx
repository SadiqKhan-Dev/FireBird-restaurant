import { CustomerLayout as Layout } from "@/components/layout";

export default function CustomerAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
