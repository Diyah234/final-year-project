
import { useState, useEffect } from 'react';
import healthTips from './healthTipsData';
import './DailyHealthTip.scss'; // Import SCSS

const DailyHealthTip = () => {
    const [tip, setTip] = useState(null);
    
    useEffect(() => {
        const savedTip = localStorage.getItem('dailyHealthTip');
        const savedTimestamp = localStorage.getItem('dailyHealthTipTimestamp');
        const currentTime = new Date().getTime();
        
        if (savedTip && savedTimestamp && currentTime - parseInt(savedTimestamp) < 24 * 60 * 60 * 1000) {
            setTip(JSON.parse(savedTip));
        } else {
            getRandomTip();
        }
    }, []);
    
    const getRandomTip = () => {
        const randomIndex = Math.floor(Math.random() * healthTips.length);
        const newTip = healthTips[randomIndex];
        
        localStorage.setItem('dailyHealthTip', JSON.stringify(newTip));
        localStorage.setItem('dailyHealthTipTimestamp', new Date().getTime().toString());
        
        setTip(newTip);
    };
    
    if (!tip) {
        return <p className="loading-tip">Loading health tip...</p>;
    }
    
    return (
        <div className="daily-tip">
            <h3 className="tip-title">Daily health tip</h3>
            <p className="tip-description">{tip.description}</p>
            {/* {tip.category && <span className="tip-category">{tip.category}</span>} */}
        </div>
    );
};

export default DailyHealthTip;