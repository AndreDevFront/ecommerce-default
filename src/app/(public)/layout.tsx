import { Header } from "@/components/header";

interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
