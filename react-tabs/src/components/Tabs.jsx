import { useEffect } from "react";
import { useState } from "react";

const Tabs = ({selectedTab, tabsData, onChangeTabHandler = () => {}}) => {
    const [selectedIndex, setSelectedIndex] = useState(selectedTab);

    useEffect(() => {
        setSelectedIndex(selectedTab)
    }, [selectedTab])

    const handleTabChange = (index) => {
         onChangeTabHandler(index)
         setSelectedIndex(index);
         const url = new URL(window.location.href);
         url.searchParams.set('tabId', index);
         
        window.history.pushState({}, '', url);
    }   

    return (
        <div className="tabs-container">
            <div className="tabs-actions">
            {tabsData.map((tab, index) => (
                <button 
                className={`tab-btn ${index === selectedIndex ? 'active-tab' : ''}`}
                  key={index} 
                  onClick={() => handleTabChange(index)}
                  >
                    {tab.label}
                </button>
            ))}
            </div>
            <div className="tabs-content-container">
                {tabsData[selectedIndex].content}
            </div>
        </div>
    )
}

export default Tabs;