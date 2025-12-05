import Footer from "./(Home)/components/Footer"
import Header from "./(Home)/components/header"
import HeroSection from "./(Home)/components/HeroSection"
import Ready from "./(Home)/components/Ready"
import WhyChoose from "./(Home)/components/WhyChoose"

const page = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <WhyChoose />
      <Ready />
      <Footer />
      
    </div>
  )
}

export default page