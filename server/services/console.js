//==============================================================================
// ■ Console (console.js)
//------------------------------------------------------------------------------
//     Utility functions and objects for imporving the console output.
//==============================================================================
const colors = require("colors");

//------------------------------------------------------------------------------
// ● Console-Colors
//------------------------------------------------------------------------------
colors.setTheme({
  primary: "magenta",
  info: "cyan",
  success: "green",
  warning: "yellow",
  link: "blue",
  danger: "red",
  bgPrimary: "bgMagenta",
  bgInfo: "bgCyan",
  bgSuccess: "bgGreen",
  bgWarning: "bgYellow",
  bgLink: "bgBlue",
  bgDanger: "bgRed"
});

//------------------------------------------------------------------------------
// ● Console-Clear
//------------------------------------------------------------------------------
console.cls = () => {
  const readline = require("readline");
  console.log("\n".repeat(process.stdout.rows));
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};
