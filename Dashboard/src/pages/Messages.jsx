import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Mail, Phone, User } from "lucide-react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/contact");

      if (res.data.success) {
        setMessages(res.data.contacts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/contact/${id}`);

      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center">Loading messages...</div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Contact Messages ({messages.length})
      </h1>

      {messages.length === 0 ? (
        <div className="text-center text-gray-500">
          No messages found.
        </div>
      ) : (
        <div className="space-y-5">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="border rounded-xl p-5 shadow-sm bg-white"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-semibold">{msg.name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    {msg.email}
                  </div>

                  {msg.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      {msg.phone}
                    </div>
                  )}

                  <p className="mt-3 text-gray-700">
                    {msg.message}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(msg._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;