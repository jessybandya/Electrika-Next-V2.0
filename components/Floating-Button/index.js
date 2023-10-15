'use client'

import React, { useState } from 'react';
import './styles.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

const ChatBox = ({ phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleSMSClick = () => {
    window.open(`sms:${phoneNumber}`, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`, '_blank');
  };

  return (
    <div className={`floating-button${isOpen ? ' active' : ''}`} onClick={handleToggle}>
      <div className="chat-icon">
        <ChatBubbleIcon />
      </div>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-options">
            <button className="whatsapp" onClick={handleWhatsAppClick}>
              <WhatsAppIcon />
            </button>
            <button className="sms" onClick={handleSMSClick}>
              <SmsIcon />
            </button>
            <button className="call" onClick={handleCallClick}>
              <PhoneInTalkIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
