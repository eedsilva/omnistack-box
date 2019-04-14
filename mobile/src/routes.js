import { createSwitchNavigator } from "react-navigation";

import Main from "./pages/Main";
import Box from "./pages/Box";

const Routes = createSwitchNavigator(
  {
    Main,
    Box
  }
);

export default Routes;
