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

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "grade-mini-backend-"));
createRequiredStructure(tempRoot);

const htmlReportPath = path.resolve(process.cwd(), "grade-report-mini.html");

console.log(`Mini project created at: ${tempRoot}`);
console.log("Running grade...\n");

const result = spawnSync(
  process.execPath,
  [validateScript, "--grade", "--root", tempRoot, "--html", htmlReportPath],
  {
    stdio: "inherit",
  },
);

fs.rmSync(tempRoot, { recursive: true, force: true });

console.log(`\nHTML report saved to: ${htmlReportPath}`);

if (result.status && result.status !== 0) {
  process.exit(result.status);
}

process.exit(0);
