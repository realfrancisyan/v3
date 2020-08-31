import Radium from "radium";
import theme from "./theme";

const { fontWeight } = theme;

let rules = {
  body: {
    fontFamily:
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI","Microsoft JhengHei",Roboto,"Helvetica Neue",Arial,sans-serif',
  },
  "h1, h2, h3, h4, h5, h6": {
    fontWeight: fontWeight.bold,
  },
};

const GlobalStyles = () => <Radium.Style rules={rules} />;

export default GlobalStyles;
