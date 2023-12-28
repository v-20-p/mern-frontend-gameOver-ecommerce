import { SiGamejolt } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, useRef } from 'react'

import { AppDispatch, RootState } from '../../redux/store'
import { fetchChats, sendChat } from './../../redux/slices/products/chatsSlice'

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch<AppDispatch>()
  const chatState = useSelector((state: RootState) => state.chatReducer)
  const [text, setText] = useState('')
  const messagesRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    dispatch(fetchChats())
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
      text
    }
  }, [dispatch])
  const handleSubmit = () => {
    dispatch(sendChat(text))
    setText('')
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>
          CHAT
          <SiGamejolt />
          BOT
        </h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div ref={messagesRef} className="chat-messages">
        <p className="bot">bot: Welcome! How can I assist you today?</p>
        {chatState.chats.length > 0 &&
          chatState.chats.map((message: any) => (
            <p className={message.sender === 'bot' ? 'bot' : 'user'} key={message._id}>
              {message.content}
            </p>
          ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  )
}

export default ChatWindow
