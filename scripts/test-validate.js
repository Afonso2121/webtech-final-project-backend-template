const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const validateScript = path.resolve(__dirname, "validate-project.js");

const createRequiredStructure = (rootPath) => {
  const requiredPaths = [
    "src",
    "src/config",
    "src/routes",
    "src/controllers",
    "src/models",
  ];

  requiredPaths.forEach((dirPath) => {
    fs.mkdirSync(path.join(rootPath, dirPath), { recursive: true });
  });

  fs.writeFileSync(path.join(rootPath, "src/server.js"), "");
  fs.writeFileSync(path.join(rootPath, "src/app.js"), "");
  fs.writeFileSync(path.join(rootPath, "src/config/swagger.js"), "");
  fs.writeFileSync(path.join(rootPath, "README.md"), "");
  fs.writeFileSync(path.join(rootPath, "PROJECT_INFO.md"), "");
};

const runValidate = (rootPath) => {
  return spawnSync(process.execPath, [validateScript, "--root", rootPath], {
    encoding: "utf8",
  });
};

const assert = (condition, message) => {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
};

const tempRoot = fs.mkdtempSync(
  path.join(os.tmpdir(), "validate-test-backend-"),
);

createRequiredStructure(tempRoot);
const validResult = runValidate(tempRoot);
assert(
  validResult.status === 0,
  "Expected validate to pass for valid structure.",
);

fs.rmSync(path.join(tempRoot, "src/models"), {
  recursive: true,
  force: true,
});
const invalidResult = runValidate(tempRoot);
assert(
  invalidResult.status === 1,
  "Expected validate to fail when structure is missing.",
);

fs.rmSync(tempRoot, { recursive: true, force: true });

console.log("validate-project.js tests passed.");
process.exit(0);
