export const FILE_CONFIG = {
  // MIME types for text/code files
  TEXT_MIME_TYPES: [
    "text/plain",
    "text/javascript",
    "text/typescript",
    "text/python",
    "text/java",
    "text/cpp",
    "text/x-csrc",
    "text/html",
    "text/css",
    "text/xml",
    "text/yaml",
    "text/x-php",
    "text/x-golang",
    "text/x-rust",
    "text/x-kotlin",
    "text/x-swift",
    "text/x-csharp",
    "application/json",
    "application/xml",
    "application/x-python",
    "application/x-sh",
    "application/x-ruby",
    "application/x-java",
    "application/x-yaml",
    "application/x-sql",
  ],

  // File extensions for code/text files
  CODE_EXTENSIONS: /\.(js|jsx|ts|tsx|py|java|cpp|c|h|hpp|cs|rb|php|go|rs|kt|swift|scala|bash|sh|sql|yaml|yml|json|xml|html|css|less|scss|vue|svelte|lua|pl|r|m|mm|gradle|maven|toml|ini|conf|env|dockerfile|makefile|cmake|gradle|xml|pom|gemfile|package\.json|requirements\.txt|pipfile|setup\.py|tsconfig\.json|babel|webpack|vite|next|nuxt|astro|remix|md)$/i,

  // MIME types for image/attachment files
  ALLOWED_ATTACHMENT_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"],

  // DOCX MIME type
  DOCX_MIME_TYPE: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // File size limit (10MB in bytes)
  MAX_FILE_SIZE: 10 * 1024 * 1024,

  // Maximum attachments allowed
  MAX_ATTACHMENTS: 10,

  // Supported code file extensions with language names
  CODE_FILE_EXTENSIONS: {
    // JavaScript/TypeScript
    js: "JavaScript",
    jsx: "React",
    ts: "TypeScript",
    tsx: "React TypeScript",

    // Web
    html: "HTML",
    css: "CSS",
    scss: "SCSS",
    less: "Less",

    // Frontend Frameworks
    vue: "Vue.js",
    svelte: "Svelte",

    // Python
    py: "Python",

    // Java
    java: "Java",

    // C/C++
    c: "C",
    cpp: "C++",
    h: "C Header",
    hpp: "C++ Header",

    // C#
    cs: "C#",

    // Ruby
    rb: "Ruby",

    // PHP
    php: "PHP",

    // Go
    go: "Go",

    // Rust
    rs: "Rust",

    // Kotlin
    kt: "Kotlin",

    // Swift
    swift: "Swift",

    // Scala
    scala: "Scala",

    // Shell
    sh: "Shell Script",
    bash: "Bash",

    // SQL
    sql: "SQL",

    // Data/Config
    json: "JSON",
    xml: "XML",
    yaml: "YAML",
    yml: "YAML",
    toml: "TOML",
    ini: "INI",
    conf: "Config",
    env: "Environment",

    // Markup
    md: "Markdown",

    // Build & Config
    dockerfile: "Dockerfile",
    makefile: "Makefile",
    cmake: "CMake",
    gradle: "Gradle",
    maven: "Maven",
    pom: "Maven POM",
    gemfile: "Gemfile",
    "package.json": "NPM Package",
    "tsconfig.json": "TypeScript Config",
    "requirements.txt": "Python Requirements",
    pipfile: "Pipenv",
    "setup.py": "Python Setup",

    // Build tools config
    babel: "Babel Config",
    webpack: "Webpack Config",
    vite: "Vite Config",
    next: "Next.js Config",
    nuxt: "Nuxt Config",
    astro: "Astro Config",
    remix: "Remix Config",
  },

  // Get file category
  getFileCategory: (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (["js", "jsx", "ts", "tsx"].includes(ext)) return "JavaScript/TypeScript";
    if (["html", "css", "scss", "less"].includes(ext)) return "Web";
    if (["vue", "svelte"].includes(ext)) return "Frontend Frameworks";
    if (["py"].includes(ext)) return "Python";
    if (["java"].includes(ext)) return "Java";
    if (["c", "cpp", "h", "hpp"].includes(ext)) return "C/C++";
    if (["cs"].includes(ext)) return "C#";
    if (["rb"].includes(ext)) return "Ruby";
    if (["php"].includes(ext)) return "PHP";
    if (["go"].includes(ext)) return "Go";
    if (["rs"].includes(ext)) return "Rust";
    if (["kt"].includes(ext)) return "Kotlin";
    if (["swift"].includes(ext)) return "Swift";
    if (["scala"].includes(ext)) return "Scala";
    if (["sh", "bash"].includes(ext)) return "Shell";
    if (["sql"].includes(ext)) return "SQL";
    if (["json", "xml", "yaml", "yml", "toml", "ini", "conf", "env"].includes(ext)) return "Data/Config";
    if (["md"].includes(ext)) return "Markup";
    return "Code";
  },

  // Check if file is a text/code file
  isTextFile: (file) => {
    const TEXT_MIME_TYPES = [
      "text/plain",
      "text/javascript",
      "text/typescript",
      "text/python",
      "text/java",
      "text/cpp",
      "text/x-csrc",
      "text/html",
      "text/css",
      "text/xml",
      "text/yaml",
      "text/x-php",
      "text/x-golang",
      "text/x-rust",
      "text/x-kotlin",
      "text/x-swift",
      "text/x-csharp",
      "application/json",
      "application/xml",
      "application/x-python",
      "application/x-sh",
      "application/x-ruby",
      "application/x-java",
      "application/x-yaml",
      "application/x-sql",
    ];

    const CODE_EXTENSIONS = /\.(js|jsx|ts|tsx|py|java|cpp|c|h|hpp|cs|rb|php|go|rs|kt|swift|scala|bash|sh|sql|yaml|yml|json|xml|html|css|less|scss|vue|svelte|lua|pl|r|m|mm|gradle|maven|toml|ini|conf|env|dockerfile|makefile|cmake|gradle|xml|pom|gemfile|package\.json|requirements\.txt|pipfile|setup\.py|tsconfig\.json|babel|webpack|vite|next|nuxt|astro|remix|md)$/i;

    return TEXT_MIME_TYPES.includes(file.type) || CODE_EXTENSIONS.test(file.name);
  },

  // Check if file is DOCX
  isDocxFile: (file) => {
    return (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    );
  },

  // Check if file is an allowed attachment
  isAllowedAttachment: (file) => {
    return ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"].includes(file.type);
  },

  // Get human-readable list of supported formats
  getSupportedFormats: () => {
    return `JavaScript (js, jsx, ts, tsx), Python (py), Java (java), C/C++ (c, cpp, h, hpp), C# (cs), Ruby (rb), PHP (php), Go (go), Rust (rs), Kotlin (kt), Swift (swift), Scala (scala), Shell (sh, bash), SQL (sql), Web (html, css, scss, less), Frontend (vue, svelte), Data (json, yaml, xml, toml, ini), Markup (md), Config files, DOCX, Images (jpg, png, gif, webp), PDF`;
  },
};