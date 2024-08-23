import BookCatalog from "@/components/bookCatalog";
import Hero from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
     <main>
      <Hero />
      <BookCatalog />
     </main>
  );
}
