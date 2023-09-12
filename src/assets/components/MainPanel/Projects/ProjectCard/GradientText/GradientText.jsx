import React from 'react'
import './GradientText.css'
import { cursorAnimation } from '../../../../../../cursorAnimation'

function generateRandomHex(length) {
    const characters = '0123456789ABCDEF';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

export default function GradientText(props) {

    const [id, setId] = React.useState(generateRandomHex(12));
    const [className, setClassName] = React.useState('-text-gradient')

    const textRef = React.useRef(null);

    React.useEffect(() => {
        if (props.type && props.type === 'box') {
            setClassName('-box-gradient')
        }
        if (!props.selected) {
            return
        };
        cursorAnimation.addNode(id);
    }, [])

    console.log(className)
    return (
        <span className={className}  ref={textRef} style={props.xs} data-id={id}>
            {props.children}
        </span>
    )
}
