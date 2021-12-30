export default class Browser {
    static iOS: {
        new (): {};
        /**
         * @see {@link https://stackoverflow.com/a/29696509/294171|Stack Overflow}
         */
        isMobileSafari(): boolean;
        /**
         * @see {@link https://stackoverflow.com/questions/7970389/ios-5-fixed-positioning-and-virtual-keyboard|Stack Overflow}
         * @param element
         * @param top
         */
        mobileSafariKeyboardFixedElement(element: HTMLElement, top?: string): HTMLElement;
    };
    /**
     * @see {@link https://stackoverflow.com/a/9869822/294171|Stack Overflow}
     * @param element
     */
    static allowSelectAndBlur(element: Element): void;
}
