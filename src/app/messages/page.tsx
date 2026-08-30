"use client";
import React, { useState } from "react";
import { MessageSquare, Send, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "Tata Projects HR",
      text: "Hello Rahul, we reviewed your verified electrical wireman license. We would like to invite you for an interview tomorrow at Cherlapally.",
      time: "10:30 AM",
      isMine: false,
    },
    {
      id: "m-2",
      sender: "Rahul Kumar",
      text: "Thank you Vikram Sir! I have confirmed the interview on the portal and will bring my original NCVT trade certificate.",
      time: "10:34 AM",
      isMine: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "Rahul Kumar",
        text: input,
        time: "Just now",
        isMine: true,
      },
    ]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          <span>Worker & Employer Messaging</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Secure communication with active job and candidate context</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
        {/* Chat header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
            TP
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Tata Projects HR (Vikram Sharma)</h4>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Employer
            </span>
          </div>
        </div>

        {/* Message list */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.isMine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.isMine
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                <div className="font-bold text-[10px] opacity-75 mb-0.5">{m.sender}</div>
                <div>{m.text}</div>
                <div className="text-[9px] opacity-60 text-right mt-1">{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <Button variant="primary" size="sm" type="submit" className="px-4">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
