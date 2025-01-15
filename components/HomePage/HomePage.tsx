'use client'

import React, { useState } from 'react';
import Mainpage from '../Mainpage';
import Product from '../Product';
import Cart from '../Cart';
import CategoryProduct from '../Category';

function HomePage() {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className='tab_card'>
      <ul className="tab-list">
        <li
          className={`tab-item ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab1')}
        >
          Главная
        </li>
        <li
          className={`tab-item ${activeTab === 'tab2' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab2')}
        >
          Котегории
        </li>
        <li
          className={`tab-item ${activeTab === 'tab3' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab3')}
        >
          Товар
        </li>
        <li
          className={`tab-item ${activeTab === 'tab4' ? 'active' : ''}`}
          onClick={() => handleTabClick('tab4')}
        >
          Корзина
        </li>
      </ul>
      <div className="tab-content">
        {activeTab === 'tab1' && <div><Product /></div>}
        {activeTab === 'tab2' && <div><Mainpage /></div>}
        {activeTab === 'tab3' && <div><CategoryProduct/></div>}
        {activeTab === 'tab4' && <div><Cart /></div>}
      </div>
    </div>
  );
}

export default HomePage;