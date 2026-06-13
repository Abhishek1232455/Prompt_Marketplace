import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import HomeCard from '../components/HomeCard';
import { FaRegCopy, FaPlay, FaTerminal } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast from 'react-hot-toast';
import Modal from '../components/Modal';
import API from '../services/API';

const Prompt = () => {
  const [data, setData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  // Playground state
  const [sandboxVariables, setSandboxVariables] = useState({});
  const [sandboxResponse, setSandboxResponse] = useState("");
  const [sandboxLoading, setSandboxLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const userData = useSelector((state) => state.auth);

  const getData = async () => {
    try {
      const response = await API(`api/v1/prompt/${id}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
      });
      const res = await response.json();
      if (res?.success) {
        setData(res.prompt);
        getCategoryData(res.prompt.category);
      }
    } catch (error) {
      console.error("Error loading prompt:", error);
    }
  }

  const getCategoryData = async (cat) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/category/${cat}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const temp = await response.json();
      setCategoryData(temp.prompts || []);
    } catch (error) {
      console.error("Error loading category prompts:", error);
    }
  }

  useEffect(() => {
    if (!userData.loading) {
      getData();
    }
    // Reset sandbox when switching prompts
    setSandboxVariables({});
    setSandboxResponse("");
    setSandboxLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userData.loading]);

  const handleCopy = () => {
    copy(data.promptData);
    toast.success("Prompt Copied to Clipboard");
  }

  const handleBuyNow = () => {
    if (data.promptData === "Login To access") {
      toast.error("Please Login to Access");
      navigate("/login");
    } else {
      setShowModal(true);
    }
  }

  // Parse [variable] or {variable} formats from prompt template
  const parseVariables = (templateText) => {
    if (!templateText) return [];
    const regex = /\[([A-Za-z0-9_ -]+)\]|\{([A-Za-z0-9_ -]+)\}/g;
    const variablesFound = new Set();
    let match;
    while ((match = regex.exec(templateText)) !== null) {
      variablesFound.add(match[1] || match[2]);
    }
    return Array.from(variablesFound);
  };

  const promptVariables = parseVariables(data.promptData);

  const handleVariableChange = (varName, value) => {
    setSandboxVariables(prev => ({
      ...prev,
      [varName]: value
    }));
  };

  const handleExecuteSandbox = async () => {
    setSandboxLoading(true);
    setSandboxResponse("");
    try {
      const response = await API(`api/v1/prompt/${id}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variables: sandboxVariables })
      });
      const result = await response.json();
      if (result.success) {
        setSandboxResponse(result.response);
        toast.success("Prompt executed successfully!");
      } else {
        toast.error(result.message || "Failed to execute prompt.");
      }
    } catch (error) {
      console.error("Execution error:", error);
      toast.error("Error connecting to playtest playground.");
    } finally {
      setSandboxLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 text-stone-900">
      {showModal && (
        <Modal getData={getData} setShowModal={setShowModal} data={data} setData={setData} userData={userData.user} />
      )}

      {data._id ? (
        <div className="flex flex-col gap-10">
          {/* Main Double Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Info & Template (7 cols on large screens) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="glass-card bg-white border border-stone-200/60 rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-md">
                
                {/* Image and Title Header */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <img 
                    src={data.imageUrl} 
                    alt={data.name} 
                    className="w-full sm:w-44 h-44 object-cover rounded-2xl border border-stone-200 shadow-sm" 
                    onError={(e) => {
                        e.target.onError = null;
                        e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  <div className="flex-1 flex flex-col gap-3">
                    <span className="self-start bg-emerald-50 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-100/40">
                      {data.category}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-tight">
                      {data.name}
                    </h2>
                    <p className="text-xs text-stone-500 font-normal leading-relaxed">
                      {data.promptDescription}
                    </p>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6">
                  {data.promptData !== "Login To access" && data.promptData !== "Unauthorized" ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-stone-750">Template Blueprint</span>
                        <button 
                          onClick={handleCopy} 
                          className="px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-all flex items-center gap-1.5"
                        >
                          <FaRegCopy size={11} /> Copy Template
                        </button>
                      </div>
                      <div className="p-4 text-xs font-mono text-stone-200 bg-stone-950 rounded-xl border border-stone-850 whitespace-pre-wrap max-h-[200px] overflow-y-auto leading-relaxed">
                        {data.promptData}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200/60 rounded-2xl mt-4">
                      <div className="text-xs text-stone-500 font-medium">
                        Credits Required: <span className="text-base font-bold text-emerald-600">{data.price} Credits</span>
                      </div>
                      <button 
                        onClick={handleBuyNow} 
                        type="button" 
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
                      >
                        Unlock Template
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: AI Playground Sandbox (5 cols on large screens) */}
            <div className="lg:col-span-5 flex flex-col">
              {data.promptData !== "Login To access" && data.promptData !== "Unauthorized" ? (
                <div className="glass-card bg-white border border-stone-200/60 rounded-3xl p-6 md:p-8 flex flex-col gap-6 h-full shadow-md">
                  <div>
                    <h2 className="text-lg font-bold text-stone-900 tracking-tight flex items-center gap-2">
                      <FaTerminal className="text-emerald-600 animate-pulse text-base" />
                      Playtest Sandbox
                    </h2>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                      Substitutes inputs below into your template parameters and executes them dynamically using Google Gemini.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-col gap-3 max-h-[260px] overflow-y-auto pr-1">
                      {promptVariables.length > 0 ? (
                        promptVariables.map(varName => (
                          <div key={varName} className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-stone-700 capitalize">{varName}</label>
                            <input
                              type="text"
                              placeholder={`Enter dynamic value...`}
                              className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input"
                              value={sandboxVariables[varName] || ""}
                              onChange={(e) => handleVariableChange(varName, e.target.value)}
                            />
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-stone-550 py-8 text-center border border-dashed border-stone-200 rounded-2xl bg-stone-50/20">
                          Static Template (No variables required).
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handleExecuteSandbox}
                      disabled={sandboxLoading}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 mt-auto border border-emerald-500/10"
                    >
                      {sandboxLoading ? (
                        <>
                          <span className="loading loading-spinner loading-xs"></span> Submitting payload...
                        </>
                      ) : (
                        <>
                          <FaPlay size={9} /> Run Playtest
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Output */}
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="text-[11px] font-bold text-stone-500">Terminal Output Console</span>
                    <div className="h-44 overflow-y-auto bg-[#0a0f0d] border border-stone-850 rounded-xl p-4 font-mono text-[11px] leading-relaxed text-emerald-400 shadow-inner whitespace-pre-wrap">
                      {sandboxResponse ? (
                        sandboxResponse
                      ) : sandboxLoading ? (
                        <span className="text-emerald-500 animate-pulse">Connecting to Gemini API Gateway...</span>
                      ) : (
                        <span className="text-stone-600 italic">Playground idle. Configure variables and click "Run Playtest" to execute request.</span>
                      )}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="glass-card bg-white border border-stone-200/60 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-4 h-full shadow-md">
                  <FaTerminal className="text-stone-400 text-4xl" />
                  <h3 className="text-lg font-bold text-stone-900">Interactive Sandbox Locked</h3>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                    Purchase this template using credits to unlock prompt testing and run custom payloads directly on Gemini LLM.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* More from Category */}
          <div className="border-t border-stone-200 pt-10">
            <h3 className="text-lg font-bold text-stone-900 mb-6 tracking-tight flex items-center gap-3">
              <span className="h-6 w-1.5 bg-emerald-500 rounded-full"></span>
              More from Category
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {categoryData.length > 0 ? (
                categoryData
                  .filter(item => id !== item._id)
                  .map((item) => (
                    <div className="flex justify-center" key={item._id}>
                      <HomeCard 
                        name={item.name} 
                        image={item.imageUrl} 
                        category={item.category} 
                        price={item.price} 
                        promptDescription={item.promptDescription} 
                        promptData={item.promptData} 
                        id={item._id} 
                      />
                    </div>
                  ))
              ) : (
                <h4 className="text-xs text-stone-400 italic col-span-full">Loading recommendations...</h4>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-emerald-500 border-t-transparent shadow-md"></div>
          <h2 className="text-xs font-semibold text-stone-500">Loading prompt details...</h2>
        </div>
      )}
    </div>
  )
}

export default Prompt