"use client"
import Image from "next/image";
import pageLanguage from "@/app/page.json"
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Cookies from 'js-cookie'
import { FaChartLine, FaCode, FaRegDotCircle, FaSearch, FaUsers } from "react-icons/fa";
import { useContext, useState, useRef, useEffect } from "react";
import { LanguageData } from "./context";
import Testimonial from "@/components/testimonials";
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import { useGetJobsQuery } from "./api/general";
import { UserData } from "./tokenContext";
import { toast, ToastContainer } from "react-toastify";
import { FaArrowTrendUp, FaToolbox } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from 'typewriter-effect';
import { GrUserWorker } from "react-icons/gr";
import { BsBuildingsFill } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import Team from "@/components/team";
import HowItWorks from "@/components/howItWorks";
import Industries from "@/components/industries";
import Video from "@/components/video";
import StoryPoint from "@/components/storyPoint";
import WhyUs from "@/components/whyUs";

type LanguageContextType = [string, (language: string) => void];

export default function Home() {
  const { data } = useGetJobsQuery(null);
  const parallaxRef = useRef<any>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [ active, setActive ] = useContext(UserData)
  const token = Cookies.get('token');
    var tokenData: any;
    if(token){
      tokenData = JSON.parse(token);
  }

 const languageContext = useContext(LanguageData);

if (!languageContext) {
  throw new Error("LanguageData context is not provided!");
}
const jsonData: any = pageLanguage;

const isMobile = useMediaQuery({ maxWidth: 640 })

useEffect(() => {
  const container = parallaxRef.current?.container?.current;
  if (!container) return;

  const onScroll = () => {
    setIsScrolled(container.scrollTop > 40);
  };

  container.addEventListener("scroll", onScroll);
  console.log(isScrolled)
  return () => container.removeEventListener("scroll", onScroll);
}, []);

const [language, setLanguage] = languageContext;
  const target: any = jsonData[language]

  const industriesMarquee = [
    "High Tech", "Environmental Health", "Robotics", "Data Science", "Researchers",
    "Medical Fields", "Pharmaceutical", "Mechanical Engineering", "Electrical Engineering"
  ]

  const handleHire = () => {
    // if logged in and admin/employer
    if(active && (tokenData.data.type === 'employer' || tokenData.data.type === 'admin')){
        window.location.href = ('/candidates');
    }else{
        window.location.href = ('/login')
    }
  }

  return (
        <section className="w-full">
        <Navbar isScrolled={isScrolled} />
        <ToastContainer />
            <Parallax ref={parallaxRef} pages={isMobile ? 18 : 12.7} 
              style={{backgroundImage: "url('/images/abstract_background_with_a_low_poly_design_0107.jpg')" }}
              className="w-full bg-cover bg-center bg-no-repeat relative"
            >
              {/* Banner */}
              <ParallaxLayer offset={0} speed={0.2}>
                <div  
                  className="bg-cover bg-center bg-no-repeat w-screen opacity- h-screen flex flex-col justify-center items-center" 
                  style={{backgroundImage: "url('/images/abstract_background_with_a_low_poly_design_0107.jpg')" }}
                >
                </div>
              </ParallaxLayer>

              {/* marguee */}
              <ParallaxLayer offset={0} speed={0} className="flex items-end">
                <div className="marquee-wrapper bg-abstract sm:-rotate-2 sm:p-10 sm:bottom-10 sm:-translate-x-2 text-white p-8 sm:w-[105vw]">
                  <div className="marquee-track">
                    <span className="flex gap-20">
                      {industriesMarquee && industriesMarquee.map ((i, _) => <span key={_} className="flex gap-20 items-center">{i} <FaRegDotCircle className="max-sm:hidden" /></span>)} 
                    </span>
                    <span className="flex gap-10">
                      {industriesMarquee && industriesMarquee.map ((i, _) => <span key={_} className="flex gap-20 items-center">{i}  <FaRegDotCircle className="max-sm:hidden" /></span>)}
                    </span>
                  </div>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={0} speed={0.5} className="text-center flex items-center flex-col justify-center gap-8">
                <motion.p 
                  initial={{ opacity: 0, y: 100}}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    delay: 0.3
                  }}
                  viewport={{ once: true }}
                  className=" sm:max-w-[60%] font-black max-sm:px-10">
                    <span className="text-6xl max-sm:text-2xl">{target.h1}</span>
                    <div className="text-black text-6xl max-sm:text-2xl">
                      <Typewriter
                        options = {{
                          strings: [target.h1_add, target.h1_add2],
                          autoStart: true,
                          loop: true,
                          cursor: ""
                        }}
                      />
                    </div>
                  </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: -100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    delay: 0.5
                  }}
                className="text-xl font-bold max-sm:text-sm max-sm:px-10 sm:max-w-[55%]">
                  {target.p_banner}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    delay: 0.8
                  }}
                  className="flex sm:flex-row flex-col max-sm:justify-center max-sm:items-center gap-4">
                  <button
                    onClick={() => window.location.href = "/jobs"}
                    className="
                      btn-sweep
                      bg-white
                      relative
                      sm:px-8 px-10 py-5
                      w-fit
                      rounded-full
                      text-sm font-semibold tracking-wide
                      border border-black/20
                      transition-all duration-300 ease-out
                      hover:border-black
                      hover:shadow-lg
                      hover:-translate-y-[1px]
                      flex gap-2 items-center justify-center
                    "
                  >
                    <span>Find Jobs</span>
                    <FaArrowTrendUp className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={handleHire}
                    className="
                      btn-sweep
                      relative
                      sm:px-8 px-16 py-5
                      rounded-full
                      w-fit
                      text-sm font-semibold tracking-wide
                      bg-main text-white
                      transition-all duration-300 ease-out
                      hover:shadow-lg
                      hover:-translate-y-[1px]
                    "
                  >
                    <span>Hire Talents</span>
                  </button>
                </motion.div>
              </ParallaxLayer>

              <ParallaxLayer offset={1} speed={0} className="px-3 py-20 sm:px-20">
                  <Video />
              </ParallaxLayer>

              <ParallaxLayer offset={2} speed={0} className="relative max-sm:py-12">
                <WhyUs />
              </ParallaxLayer>

              <ParallaxLayer offset={isMobile ? 3.4 : 3} speed={0} className="max-sm:hidden">
                    <div className="sm:h-[65vh] relative w-full">
                        <Image 
                          src={"/images/reg.jpg"}
                          alt="Researchers"
                          fill
                          className="object-cover"
                        />
                    </div>
              </ParallaxLayer>

              <ParallaxLayer offset={isMobile ? 3.4 : 3} speed={0}>
                <motion.div
                  className="h-fit sm:h-[65vh] sm:bg-black/80 text-2xl sm:text-5xl px-5 py-16 sm:p-20 text-center font-bold text-main sm:text-white">
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      Research Employers <br /> Before You Apply
                    </motion.p>
                </motion.div>
              </ParallaxLayer>

              <ParallaxLayer offset={isMobile ? 3.99 : 3.5} speed={isMobile ? 0.3 : 0.3} className="flex sm:flex-row flex-col justify-center gap-20 max-sm:px-5">
                <div className="px-6 pt-10 pb-6 flex flex-col gap-5 w-full sm:w-[35%] sm:h-[83%] shadow-xl bg-white rounded-xl -translate-y-14 sm:-translate-y-40 transition-all duration-500 ease-out  hover:shadow-2xl">
                  <p className="text-4xl text-gray-500 w-20 h-20 bg-gray-100 shadow-lg rounded-full flex items-center justify-center mx-auto transition-transform duration-300 ease-out hover:scale-110">
                    <GrUserWorker />
                  </p>
                  <h2 className="text-center font-black text-xl sm:text-4xl">Overseas Talent</h2>
                  <p className="text-center text-sm">
                    Join over 100 workers who <br /> use IMMA HIRED to find flexible and temp to hire
                  </p>
                  <button 
                    onClick={() => window.location.href = "/jobs"}
                    className="
                      flex mx-auto items-center justify-center
                      w-fit
                      btn-sweep
                      relative
                      px-10 py-5
                      rounded-full
                      text-sm font-semibold tracking-wide
                      bg-main text-white
                      transition-all duration-300 ease-out
                      hover:shadow-lg
                      hover:-translate-y-[1px]">
                    Find Jobs
                  </button>
                  <div className="relative w-full h-[200px] sm:h-[80%] rounded-xl overflow-hidden transition-transform duration-500 ease-out hover:scale-105">
                    <Image
                      src={"/images/OJXL4E0.jpg"}
                      alt="Image"
                      fill
                      className="object-cover"
                    />
                  </div>

                </div>

                <div className="px-6 pt-10 pb-6 flex flex-col gap-5 w-full sm:w-[35%] h-[83%] shadow-xl bg-white rounded-xl -translate-y-28 sm:-translate-y-40 transition-all duration-500 ease-out  hover:shadow-2xl">
                  <p className="text-4xl text-gray-500 w-20 h-20 bg-gray-100 shadow-lg rounded-full flex items-center justify-center mx-auto transition-transform duration-300 ease-out hover:scale-110">
                    <BsBuildingsFill />
                  </p>
                  <h2 className="text-center font-black text-xl sm:text-4xl">For Organizations</h2>
                  <p className="text-center text-sm">Finding individuals who share your <br /> company&apos;s values and vision can contribute  to a cohesive</p>
                  <button 
                    onClick={handleHire}
                    className="
                      flex mx-auto items-center justify-center
                      w-fit
                      btn-sweep
                      relative
                      px-10 py-5
                      rounded-full
                      text-sm font-semibold tracking-wide
                      bg-main text-white
                      transition-all duration-300 ease-out
                      hover:shadow-lg
                      hover:-translate-y-[1px]
                  ">Hire Talents</button>
                  <div className="relative w-full h-[200px] sm:h-[80%] rounded-xl overflow-hidden transition-transform duration-500 ease-out hover:scale-105">
                    <Image 
                      src={"/images/3525444.jpg"}
                      alt="Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={ isMobile ? 4.59 : 4.1} className="max-sm:hidden">
                  <div className="relative grid grid-cols-1 sm:grid-cols-3 -translate-y-20 sm:gap-8 mt-20 sm:py-16">
                      {[
                        { value: "100+", label: "Daily Active Users" },
                        { value: "5K+", label: "Open Job Positions" },
                        { value: "10K+", label: "Success Stories Shared" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="
                            group
                            text-center
                            flex flex-col items-center
                            gap-2
                          "
                        >
                          <h1
                            className="
                              text-8xl font-black
                              tracking-tight
                              bg-clip-text text-transparent
                              bg-gradient-to-br from-main to-black
                              transition-transform duration-300
                              group-hover:-translate-y-1
                            "
                          >
                            {item.value}
                          </h1>
                          <span className="text-sm uppercase tracking-widest text-black/60">
                            {item.label}
                          </span>
                      </div>
                    ))}
                  </div>
              </ParallaxLayer>

              {/* Story */}
              <ParallaxLayer
                sticky={{ start: isMobile ? 5 : 4.5, end: isMobile ? 7 : 6.5 }}
                className="relative opacity-90"
              >
                <Image
                        src={'/images/pexels-jopwell-2422280.jpg'}
                        alt={`background image`}
                        fill
                        className="object-cover"
                      /> 
              </ParallaxLayer>

              <ParallaxLayer
                id="story"
                sticky={{ start: isMobile ? 5 : 4.5, end: isMobile ? 7 : 6.5 }}
                className="flex sm:items-center px-5 py-28 sm:p-40 backdrop-blur-2xl bg-black/60"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 18,
                    delay: 0.5,
                  }}
                  viewport={{ once: true }}
                  className="text-4xl sm:text-9xl text-gray-300 font-extrabold sm:leading-[90px]"
                >
                  <span className="text-5xl">OUR</span>  <br /> STORY
                </motion.h2>
              </ParallaxLayer>

              <ParallaxLayer sticky={{ start: isMobile ? 5.3 : 4.8, end: isMobile ? 5.3 : 4.8 }} speed={0.7} className="z-20 pointer-events-auto">
                <StoryPoint
                  index="01"
                  title="The Beginning"
                  insight="Built from lived experience, not assumptions."
                  text="IMMA HIRED was founded by Imma, a foreign expat in China, who was inspired by the struggles he faced—and saw others facing—in finding opportunities in a new land. After experiencing the frustration of navigating China&apos;s job market as an international talent, Imma wanted to create a platform that would give foreign professionals like Lisa, an MBA student, a place to thrive"
                />
              </ParallaxLayer>

              <ParallaxLayer sticky={{ start: isMobile ? 6.1 : 5.6, end: isMobile ? 6.1 : 5.6 }} speed={0.7} className="z-20 pointer-events-auto">
                <StoryPoint
                  index="02"
                  insight="Where opportunity meets the right talent without friction"
                  title="The Bridge"
                  text="IMMA HIRED is more than just a job portal; it&apos;s a bridge between foreign talent and employers who are searching for skilled candidates. Lisa uploaded her resume, and Mr. Zhang, an employer, discovered her profile—both achieving their goals."
                />
              </ParallaxLayer>

              <ParallaxLayer sticky={{ start: isMobile ? 6.9 : 6.4, end: isMobile ? 6.9 : 6.4 }} speed={0.7} className="z-20 pointer-events-auto">
                <StoryPoint
                  index="03"
                  title="The Belief"
                  insight="Success isn&apos;t luck. It&apos;s access."
                  text="Driven by the belief that everyone deserves a chance to succeed, IMMA HIRED helps talented individuals find meaningful careers and build a future in China, one success story at a time."
                />

                  <div className="relative grid grid-cols-1 sm:grid-cols-3 max-sm:-translate-y-10 gap-8 mt-20 sm:py-16 sm:hidden">
                      {[
                        { value: "100+", label: "Daily Active Users" },
                        { value: "5K+", label: "Open Job Positions" },
                        { value: "10K+", label: "Success Stories Shared" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="
                            group
                            text-center
                            flex flex-col items-center
                            gap-2
                          "
                        >
                          <h1
                            className="
                              text-4xl sm:text-5xl font-black
                              tracking-tight
                              bg-clip-text text-transparent
                              bg-gradient-to-br from-main to-white
                              transition-transform duration-300
                              group-hover:-translate-y-1
                            "
                          >
                            {item.value}
                          </h1>
                          <span className="text-sm uppercase tracking-widest text-white">
                            {item.label}
                          </span>
                      </div>
                    ))}
                  </div>
              </ParallaxLayer>

              {/* Industries + teams */}
              <ParallaxLayer offset={ isMobile ? 8 : 7.5} speed={0}>
                <Industries />

                <Team />
                
                <HowItWorks />
                
                <section className="py-20">
                    <Testimonial target={target} />
                </section>
              </ParallaxLayer>

              <ParallaxLayer offset={isMobile ? 17 : 11.7} speed={0} className="flex items-end">
                    <Footer />
              </ParallaxLayer>
            </Parallax>
        </section>
  );
}
