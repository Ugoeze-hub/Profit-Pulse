import React, { useState } from 'react';
import { FiRefreshCw, FiThumbsUp, FiMessageCircle, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PulseCard = () => {
  const [generating, setGenerating] = useState(false);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState({
    message: "Good evening! Today you made ₦63,500. Your real profit after expenses is ₦18,200 — your best day this week.\n\n⭐ Your top earner: Indomie noodles (₦24,000 in sales)\n\n⚠️ One thing to watch: You've spent ₦6,200 on transport this week. Last week was ₦2,900. That's more than double — worth reviewing.\n\n💡 Tomorrow tip: Your soft drinks stock is moving fast. Consider restocking before Thursday."
  });

  const generateNewPulse = () => {
    setGenerating(true);
    setTimeout(() => {
      setPulse({
        message: "🌅 Morning! Yesterday summary: You sold ₦47,000 worth of goods. After expenses, your profit is ₦11,500. Pure water is still carrying your market — 60% of sales is water. Your transport cost has reduced by 15% today. Good job! For today, make sure you have enough change, many customers are complaining."
      });
      setGenerating(false);
      setLiked(false);
      toast.success('New Pulse card generated!', { icon: '✨' });
    }, 1500);
  };

  const handleLike = () => {
    setLiked(true);
    toast.success('Thanks for your feedback!', { icon: '❤️' });
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 overflow-hidden sticky top-20 shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-green-100 bg-white/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <FiZap className="text-green-600" size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Today's Pulse Card</h3>
              <p className="text-xs text-gray-500">AI-generated • Daily at 8 PM</p>
            </div>
          </div>
          <button 
            onClick={generateNewPulse}
            disabled={generating}
            className="p-2 text-green-700 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
            title="Generate new pulse"
          >
            <FiRefreshCw className={`${generating ? 'animate-spin' : ''}`} size={18} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        {generating ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-10 h-10 border-3 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 mt-4">Gemini is analyzing your business...</p>
          </div>
        ) : (
          <>
            <div className="prose prose-sm max-w-none">
              {pulse.message.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('⭐')) {
                  return (
                    <div key={idx} className="bg-green-100 rounded-lg p-3 my-3 flex items-start gap-2">
                      <span className="text-lg">⭐</span>
                      <p className="text-sm text-green-800 m-0">{paragraph.substring(1).trim()}</p>
                    </div>
                  );
                }
                if (paragraph.startsWith('⚠️')) {
                  return (
                    <div key={idx} className="bg-amber-100 rounded-lg p-3 my-3 flex items-start gap-2">
                      <span className="text-lg">⚠️</span>
                      <p className="text-sm text-amber-800 m-0">{paragraph.substring(1).trim()}</p>
                    </div>
                  );
                }
                if (paragraph.startsWith('💡')) {
                  return (
                    <div key={idx} className="bg-blue-100 rounded-lg p-3 my-3 flex items-start gap-2">
                      <span className="text-lg">💡</span>
                      <p className="text-sm text-blue-800 m-0">{paragraph.substring(1).trim()}</p>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-gray-800 leading-relaxed mb-3 last:mb-0">
                    {paragraph}
                  </p>
                );
              })}
            </div>
            
            <button 
              onClick={handleLike}
              disabled={liked}
              className={`mt-5 w-full px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium ${
                liked 
                  ? 'bg-green-100 text-green-700 cursor-default' 
                  : 'bg-white border border-green-200 text-green-700 hover:bg-green-50'
              }`}
            >
              <FiThumbsUp size={16} />
              {liked ? 'Helpful' : 'Was this helpful?'}
            </button>
          </>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-5 py-3 bg-white/30 border-t border-green-100 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
          <FiMessageCircle size={12} />
          Powered by Google Gemini AI
        </p>
      </div>
    </div>
  );
};

export default PulseCard;