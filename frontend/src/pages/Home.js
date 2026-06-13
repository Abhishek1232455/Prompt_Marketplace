import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import HorizontalSlide from '../components/HorizontalSlide';
import CategorySlider from '../components/CategorySlider';

function Home( {setCategory}) {
  
  const promptData = useSelector((state) => state.prompts)

  // Synthesizer mock cycle definitions
  const templates = [
    {
      title: "SEO Article Synthesizer",
      platform: "ChatGPT",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-200/40",
      accentColor: "#10B981",
      templateText: "Write a blog post about {Topic} in a {Tone} style.",
      inputs: [
        { label: "Topic", target: "Quantum Cryptography" },
        { label: "Tone", target: "Captivating" }
      ],
      output: "Unlock the subatomic horizon! Today we dismantle how qubits and entanglement are rendering ancient firewalls completely obsolete. As quantum-powered computing marches closer to practical deployment, cybersecurity stands on the brink of..."
    },
    {
      title: "Midjourney Concept Canvas",
      platform: "Midjourney",
      accent: "text-amber-700 bg-amber-50 border-amber-200/40",
      accentColor: "#F59E0B",
      templateText: "Digital painting of a {Setting} alleyway with {Color} neon glow, 8k.",
      inputs: [
        { label: "Setting", target: "Tokyo Cyberpunk" },
        { label: "Color", target: "Teal & Crimson" }
      ],
      output: "Initializing Diffusion... [25%] [70%] [100%] Render complete: Tokyo_Crimson_Teal_8k.png. Output dimensions: 1024x1024. Noise level: 0.12. Aspect ratio: 16:9."
    },
    {
      title: "Express Endpoint Architect",
      platform: "GitHub Copilot",
      accent: "text-cyan-700 bg-cyan-50 border-cyan-200/40",
      accentColor: "#06B6D4",
      templateText: "Write an ExpressJS router for {Service} with {Auth} validation.",
      inputs: [
        { label: "Service", target: "User Payments" },
        { label: "Auth", target: "JWT Session" }
      ],
      output: "const router = express.Router();\n\nrouter.post('/pay', verifyJWT, async (req, res) => {\n  const { amount } = req.body;\n  const payment = await Stripe.charge(amount);\n  res.json({ success: true, payment });\n});"
    }
  ];

  const [templateIdx, setTemplateIdx] = React.useState(0);
  const [typedInputs, setTypedInputs] = React.useState({ var1: "", var2: "" });
  const [typedOutput, setTypedOutput] = React.useState("");
  const [beamActive, setBeamActive] = React.useState(false);
  const [consoleTyping, setConsoleTyping] = React.useState(false);

  const currentTemplate = templates[templateIdx];

  React.useEffect(() => {
    let active = true;
    
    // Cycle sequence:
    // 1. Reset values
    setTypedInputs({ var1: "", var2: "" });
    setTypedOutput("");
    setBeamActive(false);
    setConsoleTyping(false);

    // 2. Type variable 1
    const t1 = setTimeout(() => {
      if (!active) return;
      let target = currentTemplate.inputs[0].target;
      let current = "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < target.length) {
          current += target[i];
          setTypedInputs(prev => ({ ...prev, var1: current }));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 45);
    }, 1000);

    // 3. Type variable 2
    const t2 = setTimeout(() => {
      if (!active) return;
      let target = currentTemplate.inputs[1].target;
      let current = "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < target.length) {
          current += target[i];
          setTypedInputs(prev => ({ ...prev, var2: current }));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 45);
    }, 2400);

    // 4. Activate glowing beams
    const t3 = setTimeout(() => {
      if (!active) return;
      setBeamActive(true);
    }, 3800);

    // 5. Typewriter response output in terminal
    const t4 = setTimeout(() => {
      if (!active) return;
      setBeamActive(false);
      setConsoleTyping(true);
      let target = currentTemplate.output;
      let current = "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < target.length) {
          current += target[i] + (target[i+1] || "");
          setTypedOutput(current);
          i += 2;
        } else {
          clearInterval(interval);
        }
      }, 15);
    }, 4600);

    // 6. Transition to next template after 9.5 seconds
    const t5 = setTimeout(() => {
      if (!active) return;
      setTemplateIdx(prev => (prev + 1) % templates.length);
    }, 9500);

    return () => {
      active = false;
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateIdx]);

  const renderTemplateText = () => {
    let text = currentTemplate.templateText;
    const parts = text.split(/(\{.*?\})/);
    return parts.map((part, index) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        const varName = part.slice(1, -1);
        const isVar1 = varName.toLowerCase() === currentTemplate.inputs[0].label.toLowerCase();
        const value = isVar1 ? typedInputs.var1 : typedInputs.var2;
        const isActive = isVar1 ? typedInputs.var1.length > 0 : typedInputs.var2.length > 0;
        
        return (
          <span key={index} className={`inline-block px-1.5 py-0.5 rounded font-mono text-[10px] font-bold border transition-all duration-300 mx-0.5 ${
            isActive 
              ? 'text-emerald-700 bg-emerald-50 border-emerald-250/40 shadow-sm' 
              : 'text-stone-400 bg-stone-50 border-stone-200'
          }`}>
            {value || varName}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 border-b border-stone-200/40">
        {/* Subtle mesh background grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e430_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e430_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] overflow-hidden"
          style={{ contain: 'layout paint' }}
        >
          {/* Animated grid sweep scanner nested inside to prevent layout recalculations */}
          <div className="scanner-line"></div>
        </div>

        {/* Glowing backdrop spheres */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-6 py-12 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Typographic Details */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 text-stone-900">
                The Premium Engine for <br />
                <span className="animated-gradient-text">AI Prompt Engineering</span>
              </h1>

              <p className="animate-fade-in-up delay-200 max-w-2xl text-sm sm:text-base text-stone-600 leading-relaxed mb-8 font-normal">
                Discover, playtest, and share industrial-grade template blueprints for ChatGPT, Gemini, and Midjourney. Test variables live, examine response models, and unlock full sources inside our interactive playtest console.
              </p>

              <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  to="categories"
                  className="px-8 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 shadow-md hover:shadow-emerald-600/10 transition-all text-center flex items-center justify-center active:scale-[0.98]"
                >
                  Get Started
                </Link>

                <Link
                  to="about"
                  className="px-8 py-3.5 rounded-xl bg-white text-stone-700 border border-stone-200/80 shadow-sm font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-all text-center flex items-center justify-center active:scale-[0.98]"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Prompt Synthesizer Showcase */}
            <div className="lg:col-span-5 flex justify-center relative w-full">
              
              {/* Perspective Card Container */}
              <div className="animate-3d-card relative w-full max-w-sm glass-card rounded-2xl p-5 shadow-2xl flex flex-col gap-4 border border-stone-200/80">
                
                {/* Showcase Window Header */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-150">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 font-mono tracking-widest">
                    COMPILER_V2.5
                  </span>
                </div>

                {/* Prompt Template Preview Box */}
                <div className="p-3 bg-stone-50/80 border border-stone-100 rounded-xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Template Blueprint</span>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded border transition-colors ${currentTemplate.accent}`}>
                      {currentTemplate.platform}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">
                    {currentTemplate.title}
                  </h4>
                  <p className="text-[10.5px] text-stone-600 font-medium leading-relaxed italic bg-white p-2.5 rounded-lg border border-stone-200/50 mt-1">
                    "{renderTemplateText()}"
                  </p>
                </div>

                {/* Input Fields Mockup */}
                <div className="flex flex-col gap-2.5 relative">
                  {currentTemplate.inputs.map((input, idx) => {
                    const value = idx === 0 ? typedInputs.var1 : typedInputs.var2;
                    return (
                      <div key={idx} className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">
                          Variable: {input.label}
                        </label>
                        <div className="w-full text-[10px] px-3 py-2 rounded-lg bg-white border border-stone-200/60 font-mono flex items-center justify-between min-h-[30px]">
                          <span className={value ? "text-stone-800 font-semibold" : "text-stone-300"}>
                            {value || `Enter ${input.label.toLowerCase()}...`}
                          </span>
                          {!value && (
                            <span className="h-3 w-1.5 bg-stone-400 animate-pulse rounded-full"></span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Laser flow beam section */}
                <div className="py-1">
                  <svg className="w-full h-8 overflow-visible" fill="none" viewBox="0 0 300 32" xmlns="http://www.w3.org/2000/svg">
                    {/* Base static connection lines */}
                    <path d="M 60 0 C 60 16, 110 16, 110 32" stroke="#e7e5e4" strokeWidth="1.5" />
                    <path d="M 240 0 C 240 16, 190 16, 190 32" stroke="#e7e5e4" strokeWidth="1.5" />

                    {/* Animated beams */}
                    {beamActive && (
                      <>
                        <path d="M 60 0 C 60 16, 110 16, 110 32" stroke={currentTemplate.accentColor} strokeWidth="2" className="beam-path" />
                        <path d="M 240 0 C 240 16, 190 16, 190 32" stroke={currentTemplate.accentColor} strokeWidth="2" className="beam-path" />
                      </>
                    )}
                  </svg>
                </div>

                {/* Playtest Output Sandbox viewport */}
                <div className="bg-[#0A0F0D] border border-stone-900 rounded-xl p-3 shadow-inner flex flex-col gap-2 min-h-[110px] relative overflow-hidden">
                  <div className="flex items-center justify-between pb-1.5 border-b border-emerald-950/40">
                    <span className="text-[8px] font-bold text-emerald-500/80 uppercase font-mono tracking-widest">
                      Gemini Playtest Console
                    </span>
                    <span className="flex h-1.5 w-1.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                  </div>

                  <p className="text-[9.5px] font-mono text-emerald-400/90 leading-relaxed break-words whitespace-pre-wrap">
                    {typedOutput || (consoleTyping ? "" : "awaiting compiler execution...")}
                    {consoleTyping && (
                      <span className="inline-block w-1.5 h-3 bg-emerald-400 ml-0.5 animate-pulse"></span>
                    )}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Main Section Controls */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-16">
        <div>
          <Slider />
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 mb-6 tracking-tight flex items-center gap-3">
            <span className="h-6 w-1.5 bg-emerald-500 rounded-full"></span>
            Trending Prompts
          </h2>
          <HorizontalSlide promptData={promptData} />
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-stone-900 mb-6 tracking-tight flex items-center gap-3">
            <span className="h-6 w-1.5 bg-amber-500 rounded-full"></span>
            Browse by Category
          </h2>
          <CategorySlider setCategory={setCategory} />
        </div>
      </div>
    </div>
  )
}

export default Home