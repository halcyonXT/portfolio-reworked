
import { gsap } from "gsap";

class CursorAnimation {
    constructor() {
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.hovering = false;

        this._queuedNodes = [];
        this._nodePositions = new Map();

        this._started = false;
        this._CUSTOM_CURSOR = null; //Node with .-cursor class, the custom cursor

        this.helperFunctions = {

            getDivPositionRelativeToDocument: (div) => {
                let left = 0;
                let top = 0;
                
                while (div) {
                  left += div.offsetLeft;
                  top += div.offsetTop;
                  
                  div = div.offsetParent;
                }
              
                return { left, top };
            }
        }

        
    }

    removeNode = (node) => this._queuedNodes.filter(item => item !== node);

    _removeDeadNodes = () => {
        let queuedDeletions = [];

        for (let node in this._queuedNodes) {

            if (!document.body.contains(this._queuedNodes[node])) {
                queuedDeletions.push(this._queuedNodes[node]);
            };
        }

        for (let pos of queuedDeletions) {
            this._nodePositions.delete(pos);
        }

        this._queuedNodes = this._queuedNodes.filter((node) => !queuedDeletions.includes(node))
    }

    _updateRectangePositions = () => {
        this._removeDeadNodes();

        for (let node of this._queuedNodes) {
            let rect = node.getBoundingClientRect();
            this._nodePositions.set(node, rect)
        }
    }
    
    addNode(fn) {
        let target = document.querySelector(`[data-id="${fn}"]`);
        if (!this._queuedNodes.includes(target)) {
            this._queuedNodes.push(target);
            this._removeDeadNodes();
        }
    }

    _customCursorMovement = (e) => {
        if (!this._started) return;

        this.mouse_x = e.clientX;
        this.mouse_y = e.clientY;

        this._CUSTOM_CURSOR.style.top = `${e.clientY}px`;
        this._CUSTOM_CURSOR.style.left = `${e.clientX}px`;

        if (!this.hovering) return;

        const updateRect = (node, rect) => {
            node.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, var(--main) 49px, var(--bg) 50px)`;
        }

        for (let node of this._queuedNodes) {
            let rect = this._nodePositions.get(node);
            if (rect) {
                updateRect(node, rect);
            } else {
                let newRect = node.getBoundingClientRect();
                this._nodePositions.set(node, newRect);
                updateRect(node, newRect);
            }
        }
    }

    stopHover = (e) => {
        for (let node of this._queuedNodes) {
            let rect = this._nodePositions.get(node);
            gsap.fromTo(
                node,
                {background: `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, var(--main) 49px, var(--bg) 50px)`},
                {background: `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, var(--main) 0px, var(--bg) 0px)`, duration: 0.2}
            )
        }
        this.hovering = false;
    }

    startCursorAnimation = () => {
        this._started = true;
        this._CUSTOM_CURSOR = document.querySelector('.-cursor');
        window.addEventListener("mousemove", this._customCursorMovement);
        window.addEventListener("resize", this._updateRectangePositions);
        window.addEventListener("zoom", this._updateRectangePositions);
    }
}

let cursorAnimation = new CursorAnimation();




export {
    cursorAnimation
}
