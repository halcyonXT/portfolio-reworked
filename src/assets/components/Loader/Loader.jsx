import React from 'react'
import './Loader.css'
import LOADER_PNG from '/loader.png'

//Loading animation is 1.2 seconds long in total, 1.9 seconds to transition to normal screen

const TIME_TO_FINISH_ANIMATION = 1900

export default function Loader() {

    React.useEffect(() => {
        setTimeout(() => {
            document.querySelector('.-loader-wrapper').animate([
                {transform: 'scale(1)'},
                {transform: 'scale(1.2)'}
            ], {
                duration: 500,
                easing: 'ease-in',
                fill: 'forwards'
            })
            document.querySelector('.-loader').animate([
                {opacity: 1},
                {opacity: 0}
            ], {
                duration: 400,
                delay: 100,
                fill: 'forwards'
            })
        }, TIME_TO_FINISH_ANIMATION - 700)
    }, [])

    return (
        <div className='-loader'>
            <div className='-loader-wrapper'>
                <img
                    src={LOADER_PNG}
                    className='-loader-png'
                />
                <div class="lds-dual-ring"></div>
            </div>
        </div>
    )
}
