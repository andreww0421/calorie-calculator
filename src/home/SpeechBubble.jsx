import React, { useEffect, useState } from 'react';

const DISPLAY_DURATION_MS = 3000;

export function SpeechBubble({ text, visible = false, onDismiss }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!visible || !text) {
            setShow(false);
            return undefined;
        }
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
            if (typeof onDismiss === 'function') onDismiss();
        }, DISPLAY_DURATION_MS);
        return () => clearTimeout(timer);
    }, [visible, text, onDismiss]);

    if (!show || !text) return null;

    return (
        <div className="woof-pet__speech-bubble" aria-live="polite">
            <span className="woof-pet__speech-text">{text}</span>
            <div className="woof-pet__speech-tail" aria-hidden="true" />
        </div>
    );
}
