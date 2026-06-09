import React, { useState } from 'react';
import { FiRefreshCw, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PulseCard = () => {
  const [generating, setGenerating] = useState(false);
  const [liked, setLiked] = useState(false);
  const [pulse, setPulse] = useState({
    message: "Good evening! Today you made ₦63,500. Your real profit after expenses is ₦18,200 — your best day this week.\n\n💡 Your top earner: Indomie noodles (₦24,000 in sales).\n\n⚠️ One thing to watch: You've spent ₦6,200 on transport this week, compared to ₦2,900 last week. That's more than double — worth reviewing.\n\n✨ Tomorrow tip: Your soft drinks stock is moving fast. Consider restocking before Thursday."
  });

  const generateNewPulse = () => {
    setGenerating(true);
    setTimeout(() => {
      setPulse({
        message: "Morning! Yesterday summary: You sold ₦47,000 worth of goods. After expenses, your profit is ₦11,500. Pure water is still carrying your market — 60% of sales is water. Your transport cost has reduced by 15% today. Good job! For today, make sure you have enough change; many customers are complaining."
      });
      setGenerating(false);
      setLiked(false);
      toast.success('New Pulse card generated!');
    }, 1500);
  };

  const handleLike = () => {
    setLiked(true);
    toast.success('Thanks for your feedback!');
  };

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-[#ecfdf5] text-[#0f766e]">
            <FiZap size={22} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Today's Pulse Card</h3>
            <p className="mt-1 text-sm text-slate-500">AI-generated business summary for your day.</p>
          </div>
        </div>
        <button
          onClick={generateNewPulse}
          disabled={generating}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FiRefreshCw className={generating ? 'animate-spin' : ''} size={18} />
          {generating ? 'Refreshing...' : 'Refresh pulse'}
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <div className="space-y-4 text-slate-700">
          {pulse.message.split('\n\n').map((paragraph, idx) => {
            if (paragraph.startsWith('⚠️')) {
              return (
                <div key={idx} className="rounded-3xl bg-[#fef3c7] p-4 text-[#92400e]">
                  <p>{paragraph}</p>
                </div>
              );
            }
            if (paragraph.startsWith('💡') || paragraph.startsWith('✨')) {
              return (
                <div key={idx} className="rounded-3xl bg-[#eff6ff] p-4 text-[#1d4ed8]">
                  <p>{paragraph}</p>
                </div>
              );
            }
            return (
              <p key={idx} className="leading-7">{paragraph}</p>
            );
          })}
        </div>
        <button
          onClick={handleLike}
          disabled={liked}
          className={`w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition-all ${liked ? 'border-[#d1fae5] bg-[#ecfdf5] text-[#0f766e]' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}
        >
          {liked ? 'Helpful' : 'Was this helpful?'}
        </button>
      </div>
    </div>
  );
};

export default PulseCard;
