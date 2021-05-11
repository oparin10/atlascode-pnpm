import { SeverityLevel } from "@hefesto/types";
import chalk from "chalk";

const main = {
  info: chalk.blue("ℹ"),
  success: chalk.green("✔"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✖"),
};

const fallback = {
  info: chalk.blue("i"),
  success: chalk.green("√"),
  warning: chalk.yellow("‼"),
  error: chalk.red("×"),
};

const enhancedLog = (
  message: string,
  label: string,
  severity: SeverityLevel
) => {
  let backgroundColor: string = "";
  const color: string = "#FFFFFF";
  let symbol: string = "";

  switch (severity) {
    case "success":
      backgroundColor = "#4caf50";
      symbol = "✔";
      break;

    case "error":
      backgroundColor = "#f44336";
      symbol = "✖";
      break;

    case "info":
      backgroundColor = "#2196f3";
      symbol = "ℹ";
      break;

    case "warning":
      backgroundColor = "#ff9800";
      symbol = "⚠";
  }

  console.log(
    `${symbol} ${chalk.bgHex(backgroundColor).hex(color)(label)}: ${message}`
  );
};

export default enhancedLog;
