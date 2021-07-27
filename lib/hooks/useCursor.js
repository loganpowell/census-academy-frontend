import { $store$ } from "@-0/browser";
import { useState } from "react";
import { Cursor } from "@thi.ng/atom";
export const createCursor = atom => (path, uid = `cursor-${Date.now()}`) => {
    const [state, setState] = useState(null);
    const cursor = new Cursor(atom, path);
    cursor.addWatch(uid, (id, bfr, aft) => {
        setState(aft);
    });
    return [state, cursor];
};
export const useCursor = createCursor($store$);
