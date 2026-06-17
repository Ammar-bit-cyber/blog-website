import Header from './components/header'
import Footer from './components/footer'
import './App.css'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { animatePageContent } from './animations/gsapEffects'


function About() {
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
                This website is a modern, thoughtfully crafted blog platform designed for clarity and engagement. It delivers smooth navigation, fast loading, and beautifully structured content that keeps readers interested. With dynamic routing and a clean interface, it offers a seamless reading experience. Built with scalable architecture, it’s not just a blog—it’s a foundation for creating, sharing, and growing meaningful digital content.

                </p>

 </main>
        <Footer />
        </>
    )
  }
  
  export default About


