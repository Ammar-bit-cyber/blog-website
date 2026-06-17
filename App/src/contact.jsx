import Header from './components/header'
import Footer from './components/footer'
import './App.css'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { animatePageContent } from './animations/gsapEffects'

function Contact() {
  const mainRef = useRef(null)

  useGSAP(
    () => {
      if (mainRef.current) animatePageContent(mainRef.current)
    },
    { scope: mainRef }
  )

  return (
    <>
      <Header />

      <main className="homeHero contactPage" ref={mainRef}>
        <p className="subTitle">
          Please do not contact me at the moment; I am currently occupied.
        </p>
      </main>
      <Footer />
    </>
  )
}

export default Contact
