import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate API delay
    setTimeout(() => {
      toast.success("Message sent successfully! Our team will contact you shortly.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSending(false);
    }, 1000);
  }

  return (
    <div className="text-stone-800 min-h-[85vh] py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-lg glass-card rounded-3xl p-8 shadow-xl flex flex-col gap-6">
        
        {/* Header Block */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-250/40">
            Contact Us
          </span>
          <h1 className="text-3xl font-extrabold mt-6 tracking-tight text-stone-900">
            Get In Touch
          </h1>
          <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-normal">
            Have questions about credits, billing, or template submissions? Send a message to our support desk.
          </p>
        </div>

        {/* Form Fields */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-stone-700">Name</label>
              <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe" 
                className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
                required 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-stone-700">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com" 
                className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-xs font-semibold text-stone-700">Subject</label>
            <input 
              type="text" 
              id="subject" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Credit Inquiry" 
              className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input" 
              required 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-stone-700">Message</label>
            <textarea 
              id="message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4} 
              placeholder="Write your request details..." 
              className="w-full text-xs px-3.5 py-2.5 rounded-xl glass-input resize-none" 
              required 
            />
          </div>

          <button 
            disabled={sending}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs transition-colors shadow-md mt-2 flex items-center justify-center"
          >
            {sending ? "SENDING MESSAGE..." : "SEND MESSAGE"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Contact