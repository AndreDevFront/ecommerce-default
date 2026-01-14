import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";

interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
