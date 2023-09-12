import React from 'react'
import './ProjectCard.css'
import { gsap } from 'gsap';
import GradientText from './GradientText/GradientText';
import { cursorAnimation } from '../../../../../cursorAnimation';

function generateRandomHex(length) {
    const characters = '0123456789ABCDEF';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

function Rating(props) {
    const [id, setId] = React.useState(generateRandomHex(12))
    const [r, setR] = React.useState((() => {
        let stack = [];
        for (let i = 0; i < 5; i++) {
            if (i < props.rating) {
                stack.push(
                    <GradientText 
                        selected = {true}
                        xs={{fontSize: '21px', fontWeight: '500'}}
                    >
                        ◈
                    </GradientText>
                )
            } else stack.push(<GradientText 
                selected = {true}
                xs={{fontSize: '21px', fontWeight: '100'}}
            >
                ◇
            </GradientText>)
        }
        return stack;
    })())

    return (
        <div className='-project-rating' data-id={id}>
            {r}
        </div>
    )
}

export default function ProjectCard(props) {
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const cardRef = React.useRef(null);
    const borderRef = React.useRef(null);
    const outerRef = React.useRef(null);


    React.useEffect(() => {
        // I made this useEffect to track the changes to cardRef
        // and attach move listeners right after the component
        // loads. Used for the radial-gradient effect

        if (!cardRef.current) return;
        if (!props.selected) return;

        let mX = 0, mY = 0;

        const mouseMoveHandle = (e) => {
            const divRect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - divRect.left;
            const y = e.clientY - divRect.top;
            setMousePosition({ x, y });
            mX = x;
            mY = y;
      
            cardRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--bg) 49px, var(--main) 50px)`;
            borderRef.current.style.background = `radial-gradient(circle at ${x + 5}px ${y + 5}px, var(--main) 54px, var(--bg) 55px)`;
            outerRef.current.style.background = `radial-gradient(circle at ${x + 10}px ${y + 10}px, var(--bg) 60px, var(--main) 61px)`;
        }
        const mouseEnterHandle = () => {
            cursorAnimation.hovering = true;
            gsap.fromTo(
                cardRef.current,
                {backgroundSize: '200%'},
                {backgroundSize: '100%', duration: 0.2}
            );
            cardRef.current.addEventListener("mousemove", mouseMoveHandle);
        }
        const mouseLeaveHandle = (e) => {
            cursorAnimation.stopHover(e);
            cursorAnimation.hovering = false;
            gsap.fromTo(
                cardRef.current,
                { background: `radial-gradient(circle at ${mX}px ${mY}px, var(--bg) 49px, var(--main) 50px)` },
                { background: `radial-gradient(circle at ${mX}px ${mY}px, var(--bg) 0px, var(--main) 0px)`, duration: 0.2 }
            );
            gsap.fromTo(
                borderRef.current,
                { background: `radial-gradient(circle at ${mX + 5}px ${mY + 5}px, var(--main) 54px, var(--bg) 55px)` },
                { background: `radial-gradient(circle at ${mX + 5}px ${mY + 5}px, var(--main) 0px, var(--bg) 0px)`, duration: 0.2 }
            );
            gsap.fromTo(
                outerRef.current,
                { background: `radial-gradient(circle at ${mX + 10}px ${mY + 10}px, var(--bg) 60px, var(--main) 61px)` },
                { background: `radial-gradient(circle at ${mX + 10}px ${mY + 10}px, var(--bg) 0px, var(--main) 0px)`, duration: 0.2 }
            );
            cardRef.current.removeEventListener("mousemove", mouseMoveHandle);
        }
        cardRef.current.addEventListener("mouseenter", mouseEnterHandle);
        cardRef.current.addEventListener("mouseleave", mouseLeaveHandle);
        
        ;() => {
            cardRef.current.removeEventListener("mouseenter", mouseEnterHandle);
            cardRef.current.removeEventListener("mouseleave", mouseLeaveHandle);
            cardRef.current.removeEventListener("mousemove", mouseMoveHandle);
        }
    }, [cardRef])

    return (
        <div className={`-projects-card-outer-border-wrapper ${props.selected ? "" : "disabled"}`} ref={outerRef}>
            <div className='-projects-card-border-wrapper' ref={borderRef}>
                <div className='-projects-card' ref={cardRef}>
                    <GradientText 
                    selected = {props.selected}
                    xs={{fontSize: '32px', fontFamily: "'Josefin Sans', sans-serif"}}>
                        {props.name}
                    </GradientText>
                    <Rating rating='3'/>
                </div>
            </div>
        </div>
    )
}
