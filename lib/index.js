import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom";
import App from "./App";
import awsconfig from "./aws-exports";
import * as K from "@-0/keys";
import { router } from "./router";
import { Provider } from "./components";
import { configureWith } from "cope-client-utils";
import "./theme/App.less";
configureWith(awsconfig);
ReactDOM.render(_jsx(Provider, Object.assign({ CFG: {
        [K.CFG_RUTR]: router,
    } }, { children: _jsx(App, {}, void 0) }), void 0), document.getElementById("root"));
