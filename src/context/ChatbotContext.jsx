import { createContext, useState } from 'react'

export const ChatbotContext = createContext()

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChatbot = () => setIsOpen((prev) => !prev)
  const closeChatbot = () => setIsOpen(false)

  return (
    <ChatbotContext.Provider value={{ isOpen, toggleChatbot, closeChatbot }}>
      {children}
    </ChatbotContext.Provider>
  )
}
