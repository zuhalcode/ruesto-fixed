import LandingPage from "@components/home/templates/LandingPage";
import About from "@components/home/templates/About";
import Features from "@components/home/templates/Features";
import Contact from "@components/home/templates/Contact";
import Testimonial from "@components/home/templates/Testimonial";
import RootLayout from "@components/UI/templates/RootLayout";

export default function Home() {
  return (
    <RootLayout>
      <LandingPage />
      <About />
      <Features />
      <Contact />
      <Testimonial />
    </RootLayout>
  );
}
