"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Browser {
    /**
     * @see {@link https://stackoverflow.com/a/9869822/294171|Stack Overflow}
     * @param element
     */
    static allowSelectAndBlur(element) {
        element.addEventListener('mousedown', event => event.preventDefault());
    }
}
exports.default = Browser;
Browser.iOS = class {
    /**
     * @see {@link https://stackoverflow.com/a/29696509/294171|Stack Overflow}
     */
    static isMobileSafari() {
        const ua = window.navigator.userAgent;
        const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        const webkit = !!ua.match(/WebKit/i);
        return iOS && webkit && !ua.match(/CriOS/i);
    }
    /**
     * @see {@link https://stackoverflow.com/questions/7970389/ios-5-fixed-positioning-and-virtual-keyboard|Stack Overflow}
     * @param element
     * @param top
     */
    static mobileSafariKeyboardFixedElement(element, top = '0px') {
        if (Browser.iOS.isMobileSafari()) {
            const handleScrollingKeyboard = () => {
                element.style.top = `calc(${window.scrollY}px + ${top})`;
            };
            const handle_iOSKeyboardAppear = () => {
                element.style.position = 'absolute';
                handleScrollingKeyboard();
                document.addEventListener('scroll', handleScrollingKeyboard);
            };
            const handle_iOSKeyboardRemove = () => {
                element.style.position = 'fixed';
                element.style.top = top;
                document.removeEventListener('scroll', handleScrollingKeyboard);
            };
            element.addEventListener('focus', handle_iOSKeyboardAppear, {
                capture: true
            });
            element.addEventListener('blur', handle_iOSKeyboardRemove, {
                capture: true
            });
        }
        return element;
    }
};
