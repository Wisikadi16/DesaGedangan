import React from 'react';

export function renderFormattedText(text) {
    if (!text) return null;

    const lines = text.split('\n');
    let inList = false;
    let listItems = [];
    let elements = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed);

        if (isBullet) {
            inList = true;
            const cleanText = trimmed.replace(/^([-*]|\d+\.)\s+/, '');
            listItems.push(<li key={index} className="mb-1">{cleanText}</li>);
        } else {
            if (inList) {
                elements.push(<ul key={`list-${index}`} className="list-disc list-inside space-y-1 my-3">{listItems}</ul>);
                listItems = [];
                inList = false;
            }
            if (trimmed !== '') {
                elements.push(<p key={index} className="mb-3 leading-relaxed">{trimmed}</p>);
            }
        }
    });

    if (inList && listItems.length > 0) {
        elements.push(<ul key="list-end" className="list-disc list-inside space-y-1 my-3">{listItems}</ul>);
    }

    return elements;
}