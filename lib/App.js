import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Hub } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import { stream } from "@thi.ng/rstream";
import { out$, registerCMD } from "@-0/spool";
import { log } from "./utils";
import { Chrome, View } from "./components";
const HUB = stream();
const AUTH_REDIR = registerCMD({
    sub$: "AUTH_REDIR",
    args: payload => payload,
    src$: HUB,
    work: ({ data, event, message }) => {
        console.log({ data, event, message });
        if (event === "signIn") {
            window.history.back();
            return false;
        }
    },
});
const App = () => {
    let [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const update = (AS) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let user = yield Auth.currentAuthenticatedUser();
                setAuthUser(user);
            }
            catch (e) {
                setAuthUser(null);
            }
        });
        Hub.listen("auth", data => {
            const { payload } = data;
            update(data);
            HUB.next(payload);
        });
        update();
        return () => Hub.remove("auth", update);
    }, []);
    return (_jsx("div", Object.assign({ className: "App" }, { children: _jsx(Chrome, Object.assign({ authUser: authUser }, { children: _jsx(View, {}, void 0) }), void 0) }), void 0));
};
log("registered Commands:", out$.topics.entries());
log("starting...");
export default App;
