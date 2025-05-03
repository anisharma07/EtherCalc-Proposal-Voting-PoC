// codemod-fix-bigint.js
const fs = require("fs");
const path = require("path");

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const abs = path.join(dir, file);
    if (fs.statSync(abs).isDirectory()) {
      walk(abs);
    } else if (abs.endsWith(".js") || abs.endsWith(".ts")) {
      let src = fs.readFileSync(abs, "utf8");
      // Replace any sequence of digits followed by 'n' (not prefixed by an identifier/decimal point)
      src = src.replace(
        /([^0-9A-Za-z$_\.])(\d+)n\b/g,
        (_, prefix, number) => `${prefix}BigInt("${number}")`
      );
      fs.writeFileSync(abs, src);
    }
  }
}

// Run on your built assets directory (or your src folder, depending on when you invoke this)
const targetDir = path.resolve(__dirname, "assets");
walk(targetDir);
console.log("BigInt literals converted.");
