import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const App = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [amount, setAmount] = useState('');
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setUploadedImage(img);
          drawImage(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };

  const updateAmount = () => {
    if (!uploadedImage || !amount) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(uploadedImage, 0, 0);
    ctx.fillStyle = '#1D1E20';
    ctx.fillRect(111, 550, 600, 250);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '115px "Google Sans", sans-serif';
    ctx.textBaseline = 'top';

    const formattedAmount = `₹${parseFloat(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;

    ctx.fillText(formattedAmount, 100, 600);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'gpay-balance.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col">
      <h1 className="text-4xl font-serif mb-16">Edit your Google Pay balance screenshot.</h1>

      <div className="space-y-12">
        <div>
          <h2 className="text-2xl mb-4">Enter the screenshot of the balance page from Google Pay :</h2>
          <button 
            onClick={() => document.getElementById('fileInput').click()}
            className="bg-zinc-900 text-white px-6 py-3 rounded text-lg"
          >

            <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          </button>

        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h2 className="text-2xl mb-4">Enter your desired amount :</h2>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-zinc-900 text-white px-10 py-10 rounded text-lg"
              placeholder="Enter amount"
            />
          </div>
          <button
            onClick={updateAmount}
            className="mt-8"
          >
            <ArrowRight size={32} className="text-blue-500" />
          </button>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Download your edited screenshot</h2>
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 text-white py-3 rounded text-lg"
          >
            Download
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-auto pt-8 text-right text-gray-500">
        with love, Satvik
      </div>
    </div>
  );
};

export default App;
