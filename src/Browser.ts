export default class Browser {
    public static iOS = class {
        /**
         * @see {@link https://stackoverflow.com/a/29696509/294171|Stack Overflow}
         */
        public static isMobileSafari(): boolean {
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
        public static mobileSafariKeyboardFixedElement(
            element: HTMLElement,
            top = '0px'
        ): HTMLElement {
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

    /**
     * @see {@link https://stackoverflow.com/a/9869822/294171|Stack Overflow}
     * @param element
     */
    public static allowSelectAndBlur(element: Element) {
        element.addEventListener('mousedown', event => event.preventDefault());
    }
}
