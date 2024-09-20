"use client"
import React, { useState } from 'react';
import OptionsCollapse from './OptionsCollapse';
import OptionsExpand from './OptionsExpand';
import OptionsForm from './OptionsForm';

export default function ExpandCollapse() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {isExpanded && <OptionsForm />}
            <div className="expand-collapse-container">
                {isExpanded ? (
                    <OptionsCollapse onClick={toggleExpand} />
                ) : (
                    <OptionsExpand onClick={toggleExpand} />
                )}
            </div>
        </>
    );
}
