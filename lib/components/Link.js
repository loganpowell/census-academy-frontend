import { jsx as _jsx } from "react/jsx-runtime";
import { NAV } from "../commands";
import { run$ } from "@-0/spool";
export const Link = ({ to, style = {}, children }) => {
    const path = `/${to}`;
    return (_jsx("a", Object.assign({ href: path, onClick: e => {
            e.preventDefault();
            run$.next(Object.assign(Object.assign({}, NAV), { args: e }));
        }, style: style }, { children: children }), void 0));
};
