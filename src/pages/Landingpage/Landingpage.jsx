import { Footer, Header } from "../../components"
import { Primarybtn } from "../../components/Button"

import "./landingpage.css"

import mobileIllustrationImg from "../../assets/mobile-illustration.png"
import mobileIllustrationLargeImg from "../../assets/mobile-illustration-large.png"
import testimonialLarge from "../../assets/testimonial-large.png"
import testimonialSmall from "../../assets/testimonial-small.png"

import { FaArrowRight } from "react-icons/fa6";

function Landingpage() {
  return (
    <>
      <Header className="bg-clr-accent-600" btnPath="/signup" btnText="Get Started" />
      <main id="main" className="bg-clr-accent-600 container homepage">
        <section className="hero flex-container">
          <div className="hero__details">
            <h1 className="hero__title">
              Keep Your Files Safe, Accessible, and Organized
            </h1>
            <p className="hero__desc">
              Experience seamless cloud storage solutions designed to 
              safeguard your digital assets, ensure easy accessibility, 
              and keep your files impeccably organized. Join us today.
            </p>
            <Primarybtn path="/signup" text="Try Cloud Keep For Free" icon={<FaArrowRight />} />
          </div>
          <picture className="hero__img">
            <source media="(min-width: 1200px)" srcSet={mobileIllustrationLargeImg} width="526.17" height="550" />
            <img src={mobileIllustrationImg} width="367" height="550" />
          </picture>
        </section>
        <section className="stats">
          <ul className="stats__container">
            <li className="stats__item flex-container">
              <h2 className="item__title">2K+</h2>
              <p className="item__subtitle">Daily Users</p>
            </li>
            <li className="stats__item flex-container">
              <h2 className="item__title">98%</h2>
              <p className="item__subtitle">Satisfaction Rate</p>
            </li>
            <li className="stats__item flex-container">
              <h2 className="item__title">5M+</h2>
              <p className="item__subtitle">Files Stored</p>
            </li>
          </ul>
        </section>
        <section className="testimonial">
          <picture className="testimonial__img">
            <source srcSet={testimonialLarge} media="(min-width: 600px)" width="527.56" height="700" />
            <img src={testimonialSmall} alt="" width="263.75" height="350" />
          </picture>
          <div className="testimonial__detail">
            <h2 className="testimonial__title">
              Why Cloud Keep Is Perfect for You
            </h2>
            <p className="testimonial__desc">
              Discover the perfect solution for seamless file management. 
              Our website offers intuitive design and powerful features, making it the 
              ideal choice for streamlining your workflow and boosting productivity.
            </p>
            <p className="testimonial__name">
              Sandeep Sharma
            </p>
            <p className="testimonial__work">
              The Developer
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Landingpage