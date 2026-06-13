import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const NewPrompts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [promptDescription, setpromptDescription] = useState("");
  const [promptData, setPromptData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !category || !price || !promptDescription || !promptData) {
      toast.error('Please fill out all fields');
      setLoading(false);
      return;
    }
    const imageUpload = new FormData();
    imageUpload.append("file", image);
    imageUpload.append("upload_preset", `${process.env.REACT_APP_CLOUD_IMAGE_PRESET}`)
    imageUpload.append("cloud_name", `${process.env.REACT_APP_CLOUD_IMAGE_NAME}`)
    let imageUrl;
    
    try {
      const imgRes = await fetch(`${process.env.REACT_APP_CLOUD_IMAGE_URL}`, {
        method: "POST",
        body: imageUpload
      });
      const imgData = await imgRes.json();
      imageUrl = imgData.secure_url;
      if (!imageUrl) {
        throw new Error("Failed to fetch secure image URL from Cloudinary.");
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
      toast.error("Error in Uploading image")
      return;
    }

    const data = {
      name, 
      category, 
      price, 
      promptDescription,
      imageUrl,
      promptData
    }

    try {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/upload/upload-prompt`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const response = await fetchData.json()
      if (response.success) {
        toast.success(response.message);
        // Reset state
        setName("");
        setCategory("");
        setPrice("");
        setpromptDescription("");
        setPromptData("");
        setImage("");
        navigate('/');
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to post prompt metadata to API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-16 px-4 flex items-center justify-center min-h-[90vh] text-stone-800">
      <form className='m-auto w-full max-w-lg glass-card rounded-3xl p-8 shadow-xl flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className="text-center mb-2">
          <h1 className='text-3xl font-extrabold text-stone-900 tracking-tight'>Add New Prompt</h1>
          <p className="text-xs text-stone-500 mt-1 font-normal">Publish a new template onto the public marketplace listing.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold text-stone-700">Prompt Title</label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
            className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
            placeholder="e.g. SEO Content Generator" 
            required 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-xs font-semibold text-stone-700">Target Platform</label>
            <select 
              id="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input cursor-pointer"
              required
            >
              <option value="" disabled>Select category</option>
              <option value="Chatgpt">ChatGPT</option>
              <option value="MidJourney">Midjourney</option>
              <option value="Copyai">Copy.ai</option>
              <option value="Bing Chat">Bing Chat</option>
              <option value="Bard AI">Gemini / Bard AI</option>
              <option value="DALL-E">DALL-E</option>
              <option value="GitHub Copilot">GitHub Copilot</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="price" className="text-xs font-semibold text-stone-700">Credit Cost</label>
            <input 
              type="number" 
              id="price" 
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
              placeholder="e.g. 25" 
              required 
          />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-stone-700">Preview Cover Image</label>
          <div className="flex items-center justify-center w-full">
            {image ? (
              <div className='flex flex-col items-center justify-center w-full h-44 border border-stone-200 rounded-xl bg-stone-50/50 relative overflow-hidden'>
                <img src={URL.createObjectURL(image)} alt="preview" className='h-full w-full object-cover' />
                <button type="button" onClick={() => setImage("")} className="absolute top-2 right-2 bg-red-650 text-white rounded-full p-1 text-[10px] px-2.5 font-bold transition-colors">
                  Remove
                </button>
              </div>
            ) : (
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border border-dashed border-stone-300 hover:border-emerald-500/50 rounded-xl cursor-pointer bg-stone-50/30 hover:bg-stone-100/40 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <svg className="w-8 h-8 mb-3 text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="text-xs text-stone-500"><span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop</p>
                  <p className="text-[10px] text-stone-400 mt-1">PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="desc" className="text-xs font-semibold text-stone-700">Prompt Description</label>
          <textarea 
            id="desc" 
            value={promptDescription}
            onChange={(e) => setpromptDescription(e.target.value)} 
            rows={3} 
            className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input resize-none" 
            placeholder="Explain what this prompt does and how to use it..." 
            required 
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="pData" className="text-xs font-semibold text-stone-700">Prompt Template Blueprint</label>
          <textarea 
            id="pData" 
            value={promptData}
            onChange={(e) => setPromptData(e.target.value)} 
            rows={3} 
            className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input font-mono resize-none text-stone-800 bg-stone-50" 
            placeholder="Write template blueprint... (e.g. Generate a blog post about [Topic] in a [Tone] voice.)" 
            required 
          />
        </div>

        <button disabled={loading} className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-md mt-2 flex items-center justify-center gap-2">
          {loading ? "SAVING..." : "SAVE PROMPT"}
        </button>
      </form>
    </div>
  )
}

export default NewPrompts