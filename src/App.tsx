import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import { IoLogoYoutube } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-white/60 to-white/5"
          style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
          onMouseEnter={(e) => {
            gsap.to(e.target, {
              rotateY: 25,
              rotateX: -25,
              y: -20,
              z: 40,
              duration: 0.4,
              ease: "power2.out"
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.target, {
              rotateY: 0,
              rotateX: 0,
              y: 0,
              z: 0,
              duration: 1.5,
              ease: "elastic.out(1, 0.3)"
            });
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};

const TiltCard = ({ stat }: { stat: { value: string, label: string } }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !contentRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center"
    });

    gsap.to(contentRef.current, {
      x: ((x - centerX) / centerX) * 15,
      y: ((y - centerY) / centerY) * 15,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !contentRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
    gsap.to(contentRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <div className="stat-card w-full h-full" style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)] h-full w-full cursor-pointer hover:shadow-[0_0_50px_rgba(250,204,21,0.1)] transition-colors duration-500"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-4 right-6 text-[9px] md:text-[10px] text-yellow-400/50 uppercase tracking-[0.2em] font-bold pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500 animate-pulse">
          Hover Me
        </div>
        <div ref={contentRef} className="flex flex-col items-center pointer-events-none" style={{ transform: "translateZ(40px)" }}>
          <span className="font-montserrat font-[800] text-4xl md:text-5xl lg:text-6xl text-neutral-400 mb-3 drop-shadow-[0_0_15px_rgba(163,163,163,0.15)]">
            {stat.value}
          </span>
          <span className="text-[11px] sm:text-xs md:text-sm font-bold text-white/70 uppercase tracking-[0.2em]">
            {stat.label}
          </span>
        </div>
      </div>
    </div>
  );
};

const socialLinks = [
  { Icon: BiLogoFacebook, url: "https://www.facebook.com/itzfizz.digital" },
  { Icon: BiLogoInstagram, url: "https://www.instagram.com/itzfizz_digital/" },
  { Icon: IoLogoYoutube, url: "https://www.youtube.com/@itzfizz_digital" },
  { Icon: BiLogoLinkedinSquare, url: "https://www.linkedin.com/company/itzfizz/" }
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(headerRef.current, { xPercent: -50 });
    gsap.set(".hero-heading-h1", { transformOrigin: "center center" });

    const loadTl = gsap.timeline();

    loadTl.fromTo(headerRef.current, { opacity: 0, y: -60 }, { opacity: 1, y: 0, duration: 1.8, ease: "expo.out" });
    loadTl.fromTo(gsap.utils.toArray(".nav-item"), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1.5, stagger: 0.08, ease: "power3.out" }, "-=1.4");
    loadTl.fromTo(".hero-heading-word", { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1.5, stagger: 0.2, ease: "power4.out" }, "-=1.2");

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=900",
        scrub: 1.2, 
      }
    });

    scrollTl.to(headerRef.current, {
      width: "100%",
      top: "0px",
      paddingTop: "1.2rem",
      paddingBottom: "1.2rem",
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "rgba(255,255,255,0)",
      boxShadow: "none",
      backdropFilter: "blur(0px)",
      ease: "power2.inOut"
    }, 0);

    scrollTl.to(".original-logo", { 
      opacity: 0, 
      y: -40, 
      ease: "power2.inOut" 
    }, 0);

    scrollTl.to(".hero-heading-h1", { scale: 0.12, x: "-42vw", ease: "sine.inOut" }, 0);
    scrollTl.to(".hero-heading-h1", { y: "-43vh", ease: "power2.out" }, 0);

    gsap.utils.toArray(".stat-wrapper").forEach((wrapper: any, index: number) => {
      const isLeft = index % 2 === 0;
      gsap.fromTo(wrapper,
        { opacity: 0, y: 40, x: isLeft ? -80 : 80 },
        { 
          opacity: 1, 
          y: 0, 
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 95%",
            end: "top 40%",
            scrub: 1.5 
          }
        }
      );
    });

    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer-stage",
        start: "top top",
        end: "+=1500",
        scrub: 1.5,
        pin: true,
      }
    });

    footerTl.fromTo(".footer-heading",
      { scale: 0.5, opacity: 0, y: 150 },
      { scale: 1, opacity: 1, y: 0, duration: 2, ease: "power2.out" }
    );

    footerTl.fromTo(".footer-pill",
      { width: 0, opacity: 0, scale: 0.8 },
      { 
        width: "min(90vw, 450px)", 
        opacity: 1, 
        scale: 1,
        duration: 2,
        ease: "power2.out" 
      },
      ">+=0.1"
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-white bg-[#0a0a0a] overflow-x-hidden relative min-h-[200vh]">
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[150px] rounded-full"></div>
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] bg-white/5 blur-[120px] rounded-full"></div>
      </div>

      <header
        ref={headerRef}
        className="opacity-0 w-[95%] md:w-[92%] lg:w-[88%] flex items-center px-5 lg:px-6 py-3 lg:py-4 rounded-full bg-black/60 border border-white/10 shadow-2xl shadow-yellow-500/5 backdrop-blur-lg z-[70] fixed top-6 left-1/2"
      >
        <a className="nav-item original-logo inline-block h-8 lg:h-10 w-auto z-50 mr-auto" href="https://itzfizz.com/">
          <img className="w-full h-full object-contain" src="https://itzfizz.com/wp-content/uploads/2024/06/itzfizz_newlogo-e1722418257825.png" alt="logo" />
        </a>

        <button
          className="nav-item opacity-0 md:hidden text-2xl p-2 z-50 focus:outline-none text-white hover:text-neutral-400 transition-colors ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        <div className="hidden md:flex justify-center items-center gap-6 lg:gap-8 text-sm lg:text-[15px] font-semibold absolute left-1/2 -translate-x-1/2">
          <div className="nav-item opacity-0 cursor-pointer hover:text-neutral-400 transition-all ease-in-out duration-300">Home</div>
          <div className="nav-item opacity-0 relative flex justify-center items-center group cursor-pointer hover:text-neutral-400 transition-all ease-in-out duration-300">
            <span className="flex items-center gap-1">Services <HiChevronDown className="transition-transform duration-300 group-hover:-rotate-180" /></span>
            <div className="py-2 absolute top-full mt-4 lg:mt-6 origin-top scale-y-0 group-hover:scale-y-100 w-64 bg-[#111] border border-white/10 backdrop-blur-xl text-white flex flex-col rounded-xl shadow-2xl shadow-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-40">
              <div className="absolute -top-8 left-0 w-full h-8 bg-transparent"></div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer rounded-t-xl">Web Development</div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer">UI/UX Design</div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer">Social Media Marketing</div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer">Branding</div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer rounded-b-xl">SEO</div>
            </div>
          </div>
          <div className="nav-item opacity-0 relative flex justify-center items-center group cursor-pointer hover:text-neutral-400 transition-all ease-in-out duration-300">
            <span className="flex items-center gap-1">Resources <HiChevronDown className="transition-transform duration-300 group-hover:-rotate-180" /></span>
            <div className="py-2 absolute top-full mt-4 lg:mt-6 origin-top scale-y-0 group-hover:scale-y-100 w-56 bg-[#111] border border-white/10 backdrop-blur-xl text-white flex flex-col rounded-xl shadow-2xl shadow-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-40">
              <div className="absolute -top-8 left-0 w-full h-8 bg-transparent"></div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer rounded-t-xl">Blog</div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer">Glossary</div>
              <div className="px-5 py-3 hover:bg-white/10 hover:text-neutral-400 transition-colors cursor-pointer rounded-b-xl">SEO Checker</div>
            </div>
          </div>
          <div className="nav-item opacity-0 cursor-pointer hover:text-neutral-400 transition-all ease-in-out duration-300">Contact</div>
        </div>

        <div className="hidden md:flex justify-end items-center gap-3 lg:gap-4 ml-auto">
          <div className="nav-item opacity-0 relative overflow-hidden text-black bg-white font-extrabold px-6 py-2.5 rounded-full group cursor-pointer shadow-[0_0_15px_rgba(250,204,21,0.15)] hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all duration-500">
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Get Started</span>
            <span className="absolute inset-0 bg-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
          </div>
          <div className="flex gap-2">
            {socialLinks.map(({ Icon, url }, idx) => (
              <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="nav-item opacity-0 relative flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white text-white hover:text-black transition-all duration-300 group overflow-hidden">
                <span className="relative z-10 text-lg lg:text-xl"><Icon /></span>
                <span className="absolute inset-0 bg-yellow-400 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-full"></span>
              </a>
            ))}
          </div>
        </div>

        <div className={`absolute top-full left-0 right-0 mt-4 mx-2 p-6 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-6 md:hidden transition-all duration-500 ease-in-out origin-top z-40 ${isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}>
          <div className="flex flex-col gap-4 text-lg font-semibold">
            <a href="#" className="hover:text-neutral-400 transition-colors py-2 border-b border-white/5">Home</a>
            <div className="flex flex-col border-b border-white/5">
              <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center justify-between py-2 text-white hover:text-neutral-400 transition-colors w-full text-left">
                <span>Services</span><HiChevronDown className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ease-in-out ${mobileServicesOpen ? "max-h-64 opacity-100 py-3" : "max-h-0 opacity-0"}`}>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">Web Development</a>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">UI/UX Design</a>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">Social Media Marketing</a>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">Branding</a>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">SEO</a>
              </div>
            </div>
            <div className="flex flex-col border-b border-white/5">
              <button onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)} className="flex items-center justify-between py-2 text-white hover:text-neutral-400 transition-colors w-full text-left">
                <span>Resources</span><HiChevronDown className={`transition-transform duration-300 ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`flex flex-col gap-3 overflow-hidden transition-all duration-300 ease-in-out ${mobileResourcesOpen ? "max-h-48 opacity-100 py-3" : "max-h-0 opacity-0"}`}>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">Blog</a>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">Glossary</a>
                <a href="#" className="hover:text-neutral-400 transition-colors text-base font-medium pl-4 border-l border-white/10">SEO Checker</a>
              </div>
            </div>
            <a href="#" className="hover:text-neutral-400 transition-colors py-2">Contact</a>
          </div>
          <div className="flex flex-col gap-6 mt-2">
            <div className="relative overflow-hidden text-black text-center bg-yellow-400 font-extrabold px-6 py-3.5 rounded-full cursor-pointer hover:bg-yellow-300 transition-colors duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]">Get Started</div>
            <div className="flex justify-center gap-4">
              {socialLinks.map(({ Icon, url }, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-yellow-400 hover:border-yellow-400 hover:text-black transition-all duration-300 shadow-lg"><Icon /></a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div id="welcome-text-fixed" className="fixed top-0 left-0 w-full h-screen z-[60] pointer-events-none flex flex-col items-center justify-center">
        <a 
          href="https://itzfizz.com/" 
          className="hero-heading-h1 font-montserrat font-[900] text-[18vw] sm:text-[16vw] lg:text-[13vw] leading-[0.85] tracking-tighter text-center flex flex-col w-max pointer-events-auto cursor-pointer" 
          style={{ perspective: "1500px" }}
        >
          <span className="hero-heading-word opacity-0 flex justify-center w-full pb-2 md:pb-4 drop-shadow-2xl"><AnimatedText text="WELCOME" /></span>
          <span className="hero-heading-word opacity-0 flex justify-center w-full pb-2 md:pb-4 drop-shadow-2xl"><AnimatedText text="ITZFIZZ" /></span>
        </a>
      </div>

      <div className="w-full flex flex-col items-center justify-start pt-[calc(100vh+400px)] pb-[5vh] z-10 relative">
        <div className="flex flex-col gap-12 md:gap-20 w-full max-w-5xl px-6 md:px-8">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "99%", label: "Client Satisfaction" },
            { value: "50+", label: "Expert Team" },
          ].map((stat, idx) => (
            <div key={idx} className={`stat-wrapper w-[85%] md:w-[60%] ${idx % 2 === 0 ? "mr-auto" : "ml-auto"}`}>
              <TiltCard stat={stat} />
            </div>
          ))}
        </div>
      </div>

      <div id="footer-stage" className="h-screen w-full bg-transparent flex flex-col items-center justify-center relative z-10 px-6">
        <div className="flex flex-col items-center text-center w-full">
          <h2 className="footer-heading text-4xl md:text-6xl lg:text-7xl font-montserrat font-[900] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-600 tracking-tighter drop-shadow-2xl">
            Made by Mohit Dubey
          </h2>
          <div className="footer-pill overflow-hidden whitespace-nowrap rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:bg-white/10 hover:border-white/20 transition-colors duration-300 cursor-pointer flex items-center justify-center mx-auto h-16 md:h-20">
            <span className="text-lg md:text-2xl font-semibold text-neutral-300 tracking-wide px-8">
              Contact: <a href="mailto:moh75hit@gmail.com" className="hover:text-white transition-colors ml-2">moh75hit@gmail.com</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;