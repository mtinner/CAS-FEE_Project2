import {HeaderStyle, HeaderIcon} from '../app/elements/header/header.enum';
export class HeaderConfig {

    constructor(public title: string, public style: HeaderStyle, public leftIcon = HeaderIcon.Burger, public leftCallback?: Function, public rightIcon?: HeaderIcon, public rightCallback?: Function) {
    }

    getLeftIconClass() {
        return this.getClassName(this.leftIcon);
    }

    getRightIconClass() {
        return this.getClassName(this.rightIcon);
    }

    getClassName(headerIcon: HeaderIcon) {
        // 'FooBarBaz' --> 'foo-bar-baz'
        if (!HeaderIcon[headerIcon])return;
        return HeaderIcon[headerIcon].replace(/(([a-z])([A-Z]))/g, '$2-$3').toLowerCase();
    }
}