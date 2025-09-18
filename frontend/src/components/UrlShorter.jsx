import axios from 'axios';
import { useState } from 'react';

const UrlShorter = () => {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("");
//   const API_URL = import.meta.env.VITE_API_URL; 

  const handleSubmit = async (e) => {    
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:2000/api/url/shorten", { longUrl });
      setShortUrl(`http://localhost:2000/api/url/r/${data.shortCode}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50  min-w-screen">
      <h2 className="text-2xl font-bold mb-4 text-black">URL Shortener 🔗</h2>
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter your URL"
          className="border border-black p-2 rounded w-80 text-gray-600 "
          required
        />
        <button type="submit" className=" text-white px-4 py-2 rounded">
          Shorten
        </button>
      </form>

      {shortUrl && (
        <p className="mt-4">
          Short URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  )
}

export default UrlShorter