import {HeaderStyle, HeaderIcon} from '../components/elements/header/header.enum';
export class HeaderConfig {
    public leftIconString;
    public rightIconString;

    constructor(public title: string, public style: HeaderStyle, public leftIcon = HeaderIcon.burger, public leftFunctionCallback?: Function, public rightIcon?: HeaderIcon, public rightFunctionCallback?: Function) {
        this.leftIconString = HeaderIcon[leftIcon];
        this.rightIconString = HeaderIcon[rightIcon];
    }
}