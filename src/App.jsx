import React from 'react'
import Loader from './assets/components/Loader/Loader';
import MainPanel from './assets/components/MainPanel/MainPanel';
import { cursorAnimation } from './cursorAnimation';

function App() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        cursorAnimation.startCursorAnimation();
        setTimeout(() => {
            VANTA.TOPOLOGY({
                el: "#background",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0xd3bf0f,
                color: 0x101820
            })
        }, 720)
        setTimeout(() => {
            setIsLoaded(true);
        }, 3000)
    }, [])


    return (
        <>
            <div className='-cursor'></div>
            <div id='background'>
                <MainPanel/>
                {
                    !isLoaded
                    &&
                    <Loader/>
                }
            </div>
        </>
    )
}

export default App
