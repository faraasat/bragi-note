"use client";

import { Toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ConversationMessage {
  id: string;
  input: string;
  response: string;
  timestamp: Date;
}

export default function DashboardPage() {
  const router = useRouter();
  
  // Initialize user state from auth
  const [user] = useState<{ name: string; email: string } | null>(() => {
    if (typeof window !== 'undefined') {
      return auth.getCurrentUser();
    }
    return null;
  });
  
  // Initialize conversations from localStorage
  const [conversations, setConversations] = useState<ConversationMessage[]>(() => {
    if (typeof window !== 'undefined' && user) {
      const saved = localStorage.getItem(`bragi_conversations_${user.email}`);
      if (saved) {
        const parsed = JSON.parse(saved) as Array<{id: string; input: string; response: string; timestamp: string}>;
        return parsed.map((c) => ({
          ...c,
          timestamp: new Date(c.timestamp),
        }));
      }
    }
    return [];
  });
  
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<
    "catch-up" | "say-better" | "explain"
  >("catch-up");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    // Check authentication and redirect if needed
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setToast({ message: "Please enter some text", type: "error" });
      return;
    }

    setIsProcessing(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses = {
      "catch-up": `📋 **Summary of Key Points:**\n\n• Main decisions made and their reasoning\n• Action items assigned to team members\n• Upcoming deadlines (sorted by priority)\n• Important discussions you should know about\n\n*Based on analysis of: "${inputText.slice(0, 50)}${inputText.length > 50 ? "..." : ""}"*`,
      "say-better": `✍️ **Refined Message:**\n\n"${inputText
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(
          " "
        )}"\n\n**Improvements:**\n• More professional tone\n• Clearer intent\n• Reduced emotional language\n• Better structure`,
      explain: `💡 **Simple Explanation:**\n\nThis document is about: ${inputText.slice(0, 100)}...\n\n**What it means for you:**\n• Key points in plain language\n• Important dates or actions needed\n• Potential impact on your situation\n\n**Bottom line:** This is ${Math.random() > 0.5 ? "important and requires your attention" : "informational - no immediate action needed"}.`,
    };

    const newConversation: ConversationMessage = {
      id: Date.now().toString(),
      input: inputText,
      response: responses[selectedFeature],
      timestamp: new Date(),
    };

    const updated = [newConversation, ...conversations];
    setConversations(updated);

    // Save to localStorage
    if (user) {
      localStorage.setItem(
        `bragi_conversations_${user.email}`,
        JSON.stringify(updated)
      );
    }

    setInputText("");
    setIsProcessing(false);
    setToast({ message: "Response generated!", type: "success" });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const allowedTypes = [
      "text/plain",
      "text/csv",
      "application/json",
      "text/markdown",
    ];
    const allowedExtensions = [".txt", ".csv", ".json", ".md", ".log"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(fileExtension)
    ) {
      setToast({
        message: "Please upload a text file (.txt, .csv, .json, .md, .log)",
        type: "error",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setToast({ message: "File size must be less than 5MB", type: "error" });
      return;
    }

    setUploadedFile(file);
    setToast({
      message: `File "${file.name}" uploaded successfully!`,
      type: "success",
    });

    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputText(content);
    };
    reader.readAsText(file);
  };

  const clearHistory = () => {
    if (
      user &&
      window.confirm("Are you sure you want to clear all conversation history?")
    ) {
      setConversations([]);
      localStorage.removeItem(`bragi_conversations_${user.email}`);
      setToast({ message: "History cleared", type: "info" });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen scifi-bg neural-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome back, {user.name}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Choose a feature and start processing your text
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-2">
            <div className="holographic-card p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                AI Assistant
              </h2>

              {/* Feature Selection */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setSelectedFeature("catch-up")}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedFeature === "catch-up"
                      ? "bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                      : "bg-black/30 border-gray-700 hover:border-cyan-500/30"
                  }`}
                >
                  <svg
                    className="w-8 h-8 text-cyan-400 mb-2 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-300">
                    Did I Miss Anything?
                  </p>
                </button>

                <button
                  onClick={() => setSelectedFeature("say-better")}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedFeature === "say-better"
                      ? "bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20"
                      : "bg-black/30 border-gray-700 hover:border-purple-500/30"
                  }`}
                >
                  <svg
                    className="w-8 h-8 text-purple-400 mb-2 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-300">
                    Say It Better
                  </p>
                </button>

                <button
                  onClick={() => setSelectedFeature("explain")}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedFeature === "explain"
                      ? "bg-pink-500/20 border-pink-500/50 shadow-lg shadow-pink-500/20"
                      : "bg-black/30 border-gray-700 hover:border-pink-500/30"
                  }`}
                >
                  <svg
                    className="w-8 h-8 text-pink-400 mb-2 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-300">
                    Explain It
                  </p>
                </button>
              </div>

              {/* Text Input Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="input-text"
                    className="block text-sm font-medium text-gray-300 mb-3"
                  >
                    {selectedFeature === "catch-up" &&
                      "Paste meeting transcripts, chat logs, or documents"}
                    {selectedFeature === "say-better" &&
                      "Write or paste your message"}
                    {selectedFeature === "explain" &&
                      "Paste the complex document or text"}
                  </label>

                  {/* File Upload for Catch-up feature */}
                  {selectedFeature === "catch-up" && (
                    <div className="mb-4">
                      <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-cyan-500/30 rounded-lg cursor-pointer hover:border-cyan-500/50 transition-all bg-black/20 group">
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <div>
                            <span className="text-sm text-cyan-400 font-medium">
                              {uploadedFile
                                ? uploadedFile.name
                                : "Upload a file"}
                            </span>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {uploadedFile
                                ? `${(uploadedFile.size / 1024).toFixed(2)} KB`
                                : "TXT, CSV, JSON, MD, LOG (Max 5MB)"}
                            </p>
                          </div>
                          {uploadedFile && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setUploadedFile(null);
                                setInputText("");
                                setToast({
                                  message: "File removed",
                                  type: "info",
                                });
                              }}
                              className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".txt,.csv,.json,.md,.log,text/plain,text/csv,application/json,text/markdown"
                          onChange={handleFileUpload}
                          disabled={isProcessing}
                        />
                      </label>
                    </div>
                  )}

                  <textarea
                    id="input-text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg bg-black/50 border border-cyan-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    placeholder={
                      selectedFeature === "catch-up"
                        ? "Paste your meeting notes, Slack exports, or chat history here..."
                        : selectedFeature === "say-better"
                          ? "Type or paste the message you want to improve..."
                          : "Paste the document you want explained in simple terms..."
                    }
                    disabled={isProcessing}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isProcessing || !inputText.trim()}
                    className="flex-1 neon-glow-purple text-lg py-6"
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Generate Response
                        <svg
                          className="w-5 h-5 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <div className="holographic-card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Recent Activity
                </h3>
                {conversations.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                {conversations.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="w-16 h-16 text-gray-600 mx-auto mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <p className="text-gray-500 text-sm">
                      No conversations yet
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      Start by entering some text
                    </p>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="glass p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                    >
                      <p className="text-xs text-gray-500 mb-2">
                        {conv.timestamp.toLocaleDateString()} at{" "}
                        {conv.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                        {conv.input}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-cyan-400">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Processed
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Latest Response Display */}
        {conversations.length > 0 && (
          <div className="mt-8">
            <div className="holographic-card p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Latest Response
              </h3>
              <div className="glass p-6 rounded-lg border border-cyan-500/20">
                <p className="text-sm text-gray-400 mb-4">
                  Input: &quot;{conversations[0].input.slice(0, 100)}
                  {conversations[0].input.length > 100 ? "..." : ""}&quot;
                </p>
                <div className="prose prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-200 text-sm leading-relaxed">
                    {conversations[0].response}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
