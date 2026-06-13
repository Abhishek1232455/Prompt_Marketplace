import React from 'react'
import { FaPlay, FaShieldAlt, FaRocket, FaGithub, FaCode, FaServer, FaDatabase, FaBrain } from "react-icons/fa";

const About = () => {
  return (
    <div className="text-stone-800 min-h-[85vh] py-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-250/40 animate-fade-in-up">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-6 tracking-tight text-stone-900 animate-fade-in-up delay-100">
            Meet <span className="text-gradient">PromptForge</span>
          </h1>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed animate-fade-in-up delay-200 font-normal">
            We build next-generation tools for prompt engineering, allowing creators and engineers to buy, playtest, and share templates.
          </p>
        </div>

        {/* Feature Grid Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/40 text-emerald-600 flex items-center justify-center text-xl">
              <FaPlay />
            </div>
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              Interactive Sandbox
            </h3>
            <p className="text-xs text-stone-550 leading-relaxed">
              Test purchased templates directly within your browser console. Fill variables and see live Gemini responses instantly.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/40 text-emerald-600 flex items-center justify-center text-xl">
              <FaShieldAlt />
            </div>
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              Secure Architecture
            </h3>
            <p className="text-xs text-stone-550 leading-relaxed">
              Protected by encrypted storage tokens and authorized session validation. We keep templates safe from raw scraping.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 text-center items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200/40 text-emerald-600 flex items-center justify-center text-xl">
              <FaRocket />
            </div>
            <h3 className="text-base font-bold text-stone-900 tracking-tight">
              Curated Blueprint Library
            </h3>
            <p className="text-xs text-stone-550 leading-relaxed">
              No filler prompts. Explore vetted, high-performance blueprints categorized across ChatGPT, Gemini, Midjourney, and more.
            </p>
          </div>

        </div>

        {/* Developer Spotlight Card */}
        <div className="glass-card rounded-3xl p-8 md:p-10 border border-stone-200/80 shadow-xl flex flex-col md:flex-row gap-8 items-center bg-white/40">
          
          {/* Left Side: Avatar & Identity */}
          <div className="flex flex-col items-center text-center shrink-0 w-full md:w-48">
            <div className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-500/20 flex items-center justify-center text-4xl font-extrabold text-emerald-600 shadow-md relative overflow-hidden">
              A
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent"></div>
            </div>
            <h2 className="text-xl font-bold text-stone-900 mt-4 tracking-tight">Abhishek</h2>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 mt-1">Lead Developer</p>
            
            <div className="flex items-center gap-2 mt-4 text-stone-400">
              <a 
                href="https://github.com/Abhishek1232455" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-stone-700 transition-colors text-sm"
              >
                <FaGithub />
              </a>
              <span className="text-stone-300">|</span>
              <span className="text-[9px] font-semibold text-stone-400">Project Architect</span>
            </div>
          </div>

          {/* Right Side: Details & Tech Stack */}
          <div className="flex-1 flex flex-col gap-4 text-left w-full">
            <div>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Project Engineer</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Hey! I'm <strong>Abhishek</strong>, the full-stack developer who engineered <strong>PromptForge</strong>. I built this platform to address the growing need for secure, sandbox-validated prompt engineering workflows. With this application, developers and creators can list their custom templates, buy credits, playtest variable interpolations live in the terminal playground, and unlock full templates securely.
              </p>
            </div>

            {/* Architecture Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                <FaCode /> React.js (Frontend)
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                <FaServer /> Node & Express.js (API)
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5 shadow-sm">
                <FaDatabase /> MongoDB (Storage)
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1.5 shadow-sm">
                <FaBrain /> Gemini AI (Playground Sandbox)
              </span>
            </div>

            {/* Tech Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200/50 mt-1">
              <div>
                <span className="text-[9px] font-extrabold text-stone-400 uppercase tracking-widest block">Frontend Execution</span>
                <span className="text-xs font-semibold text-stone-700 mt-0.5 block leading-relaxed">
                  Staggered entrance layouts, 3D CSS perspective transforms, responsive container components.
                </span>
              </div>
              <div>
                <span className="text-[9px] font-extrabold text-stone-400 uppercase tracking-widest block">Backend Execution</span>
                <span className="text-xs font-semibold text-stone-700 mt-0.5 block leading-relaxed">
                  Secure route controllers, token credit deduction transactions, Gemini model playtest handlers.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Brand Mission Statement */}
        <div className="glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center bg-stone-50/30">
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Our Mission</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              We believe that prompt engineering is the key interface for future computing. Our mission is to democratize high-end prompting by providing a secure marketplace where creators get credited for their ingenuity, and developers find verified blueprints with playtest guarantees.
            </p>
          </div>
          <div className="shrink-0 flex items-center justify-center p-8 bg-emerald-50 border border-emerald-200/50 rounded-full w-32 h-32 shadow-sm">
            <span className="text-3xl font-extrabold text-emerald-600">PF</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default About