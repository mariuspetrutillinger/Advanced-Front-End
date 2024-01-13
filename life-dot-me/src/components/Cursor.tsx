import React, { useState, useEffect, useRef } from "react";
import "./Cursor.scss";

function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;

        const handleMouseMovement = (e) => {
            if (cursor) {
                const height = cursor.offsetHeight;
                const width = cursor.offsetWidth;
            

                setTimeout(() => {
                    cursor.style.left = e.clientX - width / 2 + 'px';
                    cursor.style.top = e.clientY - height / 2 + 'px';
                }, 20);
            }
        };

        const handleMouseHover = (e) => {
            if (e.target.tagName === 'A' || 
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'INPUT' ||
                e.target.parentNode.tagName === 'BUTTON') {
                setIsHovering(true);
                if (cursor) {
                    cursor.classList.add('hovering');
                }
            } 

            if (e.target.tagName !== 'A' &&
                e.target.tagName !== 'BUTTON' &&
                e.target.tagName !== 'INPUT' &&
                e.target.parentNode.tagName !== 'BUTTON') {
                setIsHovering(false);
                if (cursor) {
                    cursor.classList.remove('hovering');
                }
            }
        };

        document.addEventListener('mousemove', handleMouseMovement);
        document.addEventListener('mouseover', handleMouseHover);

        return () => {
            document.removeEventListener('mousemove', handleMouseMovement);
            document.removeEventListener('mouseover', handleMouseHover);
        };
    }, [cursorRef, isHovering]);

    return (
        <div
            ref={cursorRef} 
            className="custom-cursor"
        />
    );
}

export default Cursor;