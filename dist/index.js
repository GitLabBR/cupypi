"use strict";
import { execSync } from "child_process";

async function run() {
  try {

    // Get the input from the workflow
    const token = process.env.PYTOKEN
    const pwd = process.env.PASSWORD;

    console.log("Password input received:", pwd);

    // Execute the required commands
    execSync("python -m pip install --upgrade pip", { stdio: "inherit" });
    execSync("python -m pip install build", { stdio: "inherit" });
    execSync("python -m build", { stdio: "inherit" });
    execSync("python -m pip install twine", { stdio: "inherit" });
    execSync(`python -m twine upload -u ${token} -p ${pwd} dist/*`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Error during execution:", error.message);
    process.exit(1);
  }
}

run();
