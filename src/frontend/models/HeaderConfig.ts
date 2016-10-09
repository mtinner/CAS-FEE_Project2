import {HeaderStyle, HeaderIcon} from '../components/elements/header/header.enum';
export class HeaderConfig {
    public leftIconString;

    constructor(public title: string, public style: HeaderStyle, public leftIcon = HeaderIcon.burger) {// , public leftFunctionCallback?: Function, public leftFunctionCallback?: Function) {
        this.leftIconString = HeaderIcon[leftIcon];
    }
}