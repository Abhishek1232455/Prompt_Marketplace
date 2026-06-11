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
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {showModal && (
        <Modal getData={getData} setShowModal={setShowModal} data={data} setData={setData} userData={userData.user} />
      )}

      {data._id ? (
        <div>
          {/* Main Card */}
          <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden mb-8">
            <figure className="lg:w-1/2">
              <img src={data.imageUrl} alt={data.name} className="h-[400px] w-full object-cover" />
            </figure>
            <div className="card-body lg:w-1/2">
              <h2 className="card-title text-3xl font-bold flex flex-wrap gap-2 items-center">
                {data.name}
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">{data.category}</span>
              </h2>
              <div className="divider my-1"></div>
              <h3 className="text-xl font-semibold text-gray-700">About Prompt</h3>
              <p className="text-gray-650 leading-relaxed max-w-[700px]">{data.promptDescription}</p>

              {data.promptData !== "Login To access" && data.promptData !== "Unauthorized" ? (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-700">Prompt Template</span>
                    <button onClick={handleCopy} className="btn btn-outline btn-xs flex gap-1 items-center bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border-blue-200">
                      <FaRegCopy size={12} /> Copy Template
                    </button>
                  </div>
                  <div className="max-h-[150px] overflow-y-auto block p-4 text-sm font-mono text-gray-800 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-wrap">
                    {data.promptData}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-gray-55 border rounded-xl mt-auto">
                  <div className="text-xl font-semibold text-indigo-600">Credits required: {data.price}</div>
                  <button onClick={handleBuyNow} type="button" className="btn btn-indigo text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                    BUY NOW
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AI Playground Sandbox (Only displayed if user owns the prompt) */}
          {data.promptData !== "Login To access" && data.promptData !== "Unauthorized" && (
            <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <FaTerminal className="text-indigo-600 animate-pulse" /> AI Interactive Playground Sandbox
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Test this prompt template in real-time. Fill out the variables parsed from the template to run it on Google's Gemini LLM.
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Inputs Column */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-gray-700 border-b pb-2">Variables Input</h3>
                  {promptVariables.length > 0 ? (
                    promptVariables.map(varName => (
                      <div key={varName} className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-medium text-gray-650 capitalize">{varName}</span>
                        </label>
                        <input
                          type="text"
                          placeholder={`Enter value for [${varName}]`}
                          className="input input-bordered w-full text-sm bg-gray-50"
                          value={sandboxVariables[varName] || ""}
                          onChange={(e) => handleVariableChange(varName, e.target.value)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500 py-6 text-center border-2 border-dashed border-gray-200 rounded-xl">
                      No dynamic variables parsed. This prompt runs statically.
                    </div>
                  )}

                  <button
                    onClick={handleExecuteSandbox}
                    disabled={sandboxLoading}
                    className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-4 flex items-center justify-center gap-2"
                  >
                    {sandboxLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span> Processing response...
                      </>
                    ) : (
                      <>
                        <FaPlay size={12} /> Run Playground Sandbox
                      </>
                    )}
                  </button>
                </div>

                {/* Output IDE Terminal Column */}
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-700 border-b pb-2 mb-3">AI Response Output</h3>
                  <div className="flex-1 min-h-[250px] max-h-[450px] overflow-y-auto bg-slate-900 text-slate-100 rounded-xl p-5 font-mono text-sm leading-relaxed border border-slate-800 shadow-inner whitespace-pre-wrap">
                    {sandboxResponse ? (
                      sandboxResponse
                    ) : sandboxLoading ? (
                      <span className="text-indigo-400 animate-pulse">Running execution through Gemini LLM...</span>
                    ) : (
                      <span className="text-slate-500 italic">Playground output terminal. Enter variables and click "Run" to test.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* More from Category */}
          <div className="text-3xl font-bold text-gray-800 mb-4 mt-8">
            More from {data.category}
          </div>
          <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-2 sm:grid-cols-1">
            {categoryData.length > 0 ? (
              categoryData
                .filter(item => id !== item._id)
                .map((item) => (
                  <div className="m-0" key={item._id}>
                    <HomeCard name={item.name} image={item.imageUrl} category={item.category} price={item.price} promptDescription={item.promptDescription} promptData={item.promptData} id={item._id} />
                  </div>
                ))
            ) : (
              <h1 className="text-2xl text-gray-400">Loading recommendations...</h1>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="loading loading-ring loading-lg text-indigo-600"></span>
          <h2 className="text-xl font-semibold text-gray-600">Loading prompt details...</h2>
        </div>
      )}
    </div>
  )
}

export default Prompt