import React, { useState } from 'react';
import { FiRefreshCw, FiThumbsUp } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PulseCard = () => {
  const [generating, setGenerating] = useState(false);
  const [pulse, setPulse] = useState({
    message: "🌙 Good evening! Today you made ₦63,500. Your real profit after expenses na ₦18,200 — your best day this week.\n\n⭐ Your top earner: Indomie noodles (₦24,000 in sales)\n\n⚠️ One thing to watch: You've spent ₦6,200 on transport this week. Last week was ₦2,900. That's more than double — worth reviewing.\n\n💡 Tomorrow tip: Your soft drinks stock is moving fast. Consider restocking before Thursday."
  });

  const generateNewPulse = () => {
    setGenerating(true);
    setTimeout(() => {
      setPulse({
        message: "🌅 Morning! Yesterday summary: You sold ₦47,000 worth of goods. After expenses, your profit na ₦11,500. Pure water still dey carry your market — 60% of sales na water. Your transport cost don reduce by 15% today. Good job! For today, make you increase your change small, many customers dey complain."
      });
      setGenerating(false);
      toast.success('New Pulse card generated!');
    }, 1500);
  };

  return (
    <div className="card overflow-hidden sticky top-20 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="p-5 border-b border-green-100">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">Today's Pulse Card</h3>
            <p className="text-xs text-gray-600 mt-1">AI-generated • 8:00 PM daily</p>
          </div>
          <button
            onClick={generateNewPulse}
            disabled={generating}
            className="btn inline-flex p-2 bg-transparent border-transparent text-green-700 hover:bg-green-100 disabled:opacity-50"
            aria-label="Generate new pulse"
          >
            <FiRefreshCw className={`${generating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {generating ? (
            <div className="flex items-center justify-center py-8">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="ml-2 text-gray-600">Gemini is thinking...</span>
            </div>
          ) : (
            pulse.message
          )}
        </div>
        <button className="btn mt-4 w-full btn-secondary border border-green-200 text-green-700 bg-white hover:bg-green-50">
          <FiThumbsUp size={16} />
          Helpful
        </button>
      </div>
    </div>
  );
};

export default PulseCard;