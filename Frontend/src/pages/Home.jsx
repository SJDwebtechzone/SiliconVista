import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";

import Footer from '../Components/Footer.jsx';
import HeroCarousel from '../Components/HeroCarousel.jsx';

import descImage from '../assets/desImg.webp';



const Home = () => {

  const [activeIndex , setActiveIndex] = useState(null);

  const faqs = [
  {
    question: "What is VLSI ?",
    answer:
      "VLSI is the technology used to design integrated circuits with millions of transistors."
  },
  {
    question: "Who can study VLSI ?",
    answer:
      "ECE, EEE, CSE students, freshers, and working professionals can study VLSI."
  },
  {
    question: "What is the role of a VLSI Design Engineer ?",
    answer: 
    "A VLSI Design Engineer designs, verifies, and implements chip-level circuits using industry tools for processors, SoCs, and ICs."
  },
  {
    question: "Is VLSI a good career ?",
    answer: "Yes, VLSI is a high-demand, future-proof career with strong growth opportunities and competitive salaries in the global semiconductor industry."
  },
  {
    question: "Is VLSI course useful for ECE / EEE students ?",
    answer: "Yes, VLSI courses align closely with ECE/EEE core subjects and open doors to core electronics and semiconductor design roles."
  },
  {
    question: "Do I need coding knowledge to learn VLSI ?",
    answer: "Basic programming knowledge is helpful, but not mandatory; required coding concepts are covered during the course."
  },
  {
    question: "What is verification VLSI design ?",
    answer: "Verification in VLSI is the process of validating the functionality of a chip design to ensure it performs correctly according to specifications, using simulation, testbenches, and verification methodologies like UVM before fabrication."
  }

  ];



  return (
    <div className='homeDiv'>

      <Helmet>
          <script type="application/ld+json">
            {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is VLSI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VLSI is the process of creating integrated circuits by combining millions of MOS transistors into a single chip."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who can study VLSI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ECE, EEE, CSE students, fresh graduates, and working professionals can study VLSI and semiconductor courses."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is VLSI a good career?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VLSI is a highly rewarding and future-proof career with strong industry demand, excellent packages, and global opportunities."
                  }
                }
              ]
            }
            `}
          </script>
      </Helmet>


      <Helmet>
          <title>SiliconVista – Online VLSI Training Institute | Hands-On Chip Design & Verification</title>

          <meta 
            name="description" 
            content="SiliconVista offers real-time VLSI training, Design Verification courses, and internship programs with expert 1-on-1 mentoring to build your semiconductor career."
          />

          <meta name="keywords" content="
              vlsi online training,
              vlsi course online,
              vlsi design verification course,
              best vlsi institute in india,
              vlsi internship program,
              systemverilog course online,
              uvm training online,
              online semiconductor courses,
              chip design training,
              vlsi training for freshers,
              vlsi training in chennai,
              vlsi coaching online,
              vlsi hands-on course,
              learn vlsi online from scratch,
              vlsi design engineer course,
              beginner vlsi course,
              vlsi placement training,
              semiconductor online training,
              advanced vlsi verification course,
              real-time vlsi projects,
              mentor-led vlsi training,
              industry-oriented vlsi training,
              chip verification online course,
              vlsi classes for ece students,
              vlsi training platform,
              best vlsi coaching institute,
              online vlsi certification course,
              vlsi design verification online training
          " />

          <link rel="canonical" href="https://siliconvista.in/" />

          {/* OpenGraph */}
          <meta property="og:title" content="SiliconVista – Online VLSI Training Institute" />
          <meta property="og:description" content="Learn VLSI with real-time tools, hands-on projects, and expert mentoring. Build your semiconductor career with SiliconVista." />
          <meta property="og:image" content="https://siliconvista.in/og-home.png" />
          <meta property="og:url" content="https://siliconvista.in/" />
          <meta property="og:type" content="website" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="SiliconVista – Online VLSI Training Institute" />
          <meta name="twitter:description" content="Hands-on VLSI courses built for your semiconductor career growth." />
          <meta name="twitter:image" content="https://siliconvista.in/og-home.png" />

      </Helmet>


    <HeroCarousel />

      <div className='descDiv'>
      <div className="descContent">
        <h1>Why You Need to Choose Us?</h1>

        <p id='descPara'>
          <b>SiliconVista offers Design Verification Courses </b> and bridge the gap between academic knowledge and real-world semiconductor
          industry requirements. Our VLSI programs are designed by industry experts
          to make you job-ready, not just certificate-ready.
        </p>

        <ul>
          <li>Industry-oriented aligned with VLSI curriculum</li>
          <li>Hands-on projects with real tools</li>
          <li>Internship & real-time exposure</li>
          <li>Expert mentors from semiconductor industry</li>
          <li>Offers Advanced VLSI Design Verification</li>
          <li>Courses for freshers & professionals</li>
          <li>Our real-time, hands-on training combined with individual one-on-one mentoring ensures you understand every concept deeply and progress with confidence.</li>
        </ul>

      <div className="descCards">

        <div className="descCard">
          <h3>Government Certified</h3>
          <p>Trusted certification that adds strong value to your resume.</p>
        </div>

        <div className="descCard">
          <h3>Hands-On Experience</h3>
          <p>Work with real industry tools and practical design flows.</p>
        </div>

        <div className="descCard">
          <h3>Real-Time VLSI Projects</h3>
          <p>Gain experience through practical verification & design projects.</p>
        </div>

      </div>


      </div>

      <div className='descImage'>
        <img src={descImage} alt="VLSI design verification training illustration"></img>
      </div>

      </div>

      <div className='discountDiv' id='internship'>
        <div className='discountWords'>
          <h1>Internship Program</h1>

          <p>
            We don’t just train — we provide real industry exposure.
            Our students get the opportunity to work on practical VLSI
            projects under the guidance of experienced semiconductor professionals.
          </p>

          <ul>
            <li>Internship on live VLSI projects</li>
            <li>Mentorship from working VLSI engineers</li>
            <li>Internship certificate upon completion</li>
            <li>Internship aligned with placement preparation</li>
          </ul>
        </div>

        <div className='discountPercentage'>
            <h2>Industry-Backed</h2>
            <h1>VLSI Internship</h1>
            <p>Hands-on | Mentor-Led | Real Projects</p>
        </div>
      </div>

      <div className='faqDiv'>
        <h1>Have Doubts ?</h1>
        <h2>Read Our FAQs</h2>

        <div className='faqContent'>
          {faqs.map((faq , index) => (
            <div key={index} className='faqItem'>
              <button 
              className='morebtn'
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >{activeIndex === index ? "-" : "+"}</button>

              <label className='question'>{faq.question}</label>

              <p className = {`answer ${activeIndex === index ? "active" : ""}`}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
