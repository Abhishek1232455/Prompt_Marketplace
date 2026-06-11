import React, { useState } from 'react'
import toast from 'react-hot-toast';

const NewPrompts = () => {

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
      alert('Please fill out all fields');
      return;
    }
    const imageUpload = new FormData();
    imageUpload.append("file", image);
    imageUpload.append("upload_preset", `${process.env.REACT_APP_CLOUD_IMAGE_PRESET}`)
    imageUpload.append("cloud_name", `${process.env.REACT_APP_CLOUD_IMAGE_NAME}`)
    let imageUrl;
    console.log(imageUpload);
    await fetch(`${process.env.REACT_APP_CLOUD_IMAGE_URL}`, {
      method: "POST",
      body: imageUpload
    }).then((res) => res.json())
      .then((data) => {
        imageUrl = data.secure_url;
      }).catch((error) => {
        console.log(error)
        setLoading(true);
        toast.error("Error in Uploading image")
        return;
      });

      const data = {
        name, 
        category, 
        price, 
        promptDescription,
        imageUrl,
        promptData
      }
      // console.log(data);
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/upload/upload-prompt`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    const response = await fetchData.json()
    // console.log(response);
    if (response.success) {
      alert(response.message);
      window.location.reload();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-4">
      <form className='m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white rounded-xl' onSubmit={handleSubmit}>
      <h1 className='text-center text-2xl font-bold mt-2'>Add New Prompt</h1>
        <div className="mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" required />
        </div>

        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select id="category" onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected disabled>Select category</option>
          <option>Chatgpt</option>
          <option>MidJourney </option>
          <option>Copyai</option>
          <option>Bing Chat</option>
          <option>Bard AI</option>
          <option>DALL-E</option>
          <option>GitHub Copilot</option>
        </select>

        <label htmlFor='image' className='mt-2'>Image

          <div className="flex items-center justify-center w-full">
            {image ?
              <div className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'>
                <img src={URL.createObjectURL(image)} alt="preview" className='h-64 p-2' />
              </div>
              :
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            }
          </div>
        </label>


        <div>
          <div className="mb-2 mt-2">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="text" id="price" onChange={(e) => setPrice(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$10" required />
          </div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prompt Description</label>
          <textarea id="message" onChange={(e) => setpromptDescription(e.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Explain the prompt ..." defaultValue={""} />
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prompt Data</label>
          <textarea id="message" onChange={(e) => setPromptData(e.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write a prompt ..." defaultValue={""} />
        </div>

        <div className='flex justify-center mt-2'>
          <button disabled={loading ? "disabled" : ""} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {!loading && <>SAVE</>}
              {loading && <>
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                </svg>
                Loading...
              </>
              }
            </span>
          </button>
        </div>

      </form>
    </div>
  )
}

export default NewPrompts