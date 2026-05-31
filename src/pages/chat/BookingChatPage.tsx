import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    fetchMessages,
    sendMessage,
} from "../../app/features/bookings/chat/chatSlice";
import {
    selectChatMessages,
    selectChatLoading,
    selectChatSending,
} from "../../app/features/bookings/chat/chatSelectors";

export default function BookingChatPage() {
    const { bookingId } = useParams();
    const dispatch = useAppDispatch();

    const messages = useAppSelector(selectChatMessages);
    const loading = useAppSelector(selectChatLoading);
    const sending = useAppSelector(selectChatSending);

    const [text, setText] = useState("");
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (bookingId) {
            dispatch(fetchMessages(bookingId));
        }
    }, [bookingId, dispatch]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!bookingId || !text.trim()) return;

        await dispatch(
            sendMessage({
                bookingId,
                data: { message: text },
            })
        );

        setText("");
    };

    return (
        <div className="min-h-screen bg-background px-4 py-6">
            <div className="mx-auto flex max-w-3xl flex-col rounded-2xl border border-border bg-white shadow-sm">
                <div className="border-b border-border px-4 py-3 text-sm font-semibold text-text-primary">
                    Booking Chat #{bookingId}
                </div>

                <div className="flex h-[70vh] flex-col gap-3 overflow-y-auto p-4">
                    {loading ? (
                        <div className="text-sm text-text-secondary">
                            Loading messages...
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender_id === 15
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.sender_id === 15
                                            ? "bg-primary text-white"
                                            : "bg-gray-100 text-text-primary"
                                        }`}
                                >
                                    <div className="mb-1 text-[11px] opacity-70">
                                        {msg.sender.name}
                                    </div>
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>

                <div className="flex items-center gap-2 border-t border-border p-3">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-primary"
                        placeholder="Type a message..."
                    />

                    <button
                        onClick={handleSend}
                        disabled={sending}
                        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}