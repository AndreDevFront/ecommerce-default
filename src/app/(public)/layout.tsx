import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { ReactQueryProvider } from "@/providers/query-provider";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <ReactQueryProvider>
        <Header />
        {children}
        <Footer />
      </ReactQueryProvider>
    </>
  );
}
