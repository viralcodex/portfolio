import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// ANSI Color Codes
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",

  // Regular colors
  green: "\x1b[0;32m",
  cyan: "\x1b[0;36m",
  white: "\x1b[0;37m",

  // High Intensity colors (bright)
  gray: "\x1b[0;90m",
  brightGreen: "\x1b[0;92m",
  brightYellow: "\x1b[0;93m",
  brightMagenta: "\x1b[0;95m",

  // Bold High Intensity (bold + bright)
  boldBrightCyan: "\x1b[1;96m",

  // Custom colors
  peach: "\x1b[38;5;216m",
  brightPeach: "\x1b[38;5;223m",
  customCyan: "\x1b[38;2;96;255;255m", // #60ffff
  customGreen: "\x1b[38;2;135;255;135m", // #87ff87
  customPeach: "\x1b[38;2;255;215;175m", // #ffd7af
  customPink: "\x1b[38;2;255;134;175m", // #ff86af
} as const;

// ASCII Art Banner
const banner = `${colors.peach}
   █████╗ ██╗   ██╗██╗██████╗  █████╗ ██╗         ███████╗██╗  ██╗██╗   ██╗██╗  ██╗██╗      █████╗ 
  ██╔══██╗██║   ██║██║██╔══██╗██╔══██╗██║         ██╔════╝██║  ██║██║   ██║██║ ██╔╝██║     ██╔══██╗
  ███████║██║   ██║██║██████╔╝███████║██║         ███████╗███████║██║   ██║█████╔╝ ██║     ███████║
  ██╔══██║╚██╗ ██╔╝██║██╔══██╗██╔══██║██║         ╚════██║██╔══██║██║   ██║██╔═██╗ ██║     ██╔══██║
  ██║  ██║ ╚████╔╝ ██║██║  ██║██║  ██║███████╗    ███████║██║  ██║╚██████╔╝██║  ██╗███████╗██║  ██║
  ╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
${colors.reset}`;

interface Project {
  name: string;
  description: string;
  url: string;
}

interface WorkExperience {
  company: string;
  duration: string;
  description: string[];
  skills: string[];
}

interface PortfolioData {
  email: string;
  github: string;
  linkedin: string;
  about: string[];
  skills: string[];
  work: WorkExperience[];
  projects: Project[];
}

const data: PortfolioData = {
  email: "aviral.shukla10152@gmail.com",
  github: "https://github.com/viralcodex",
  linkedin: "https://linkedin.com/in/aviralshukla",

  about: [
    `${colors.customCyan}${colors.bold}Software Engineer${colors.reset} with ${colors.customCyan}${colors.bold}3 years${colors.reset} of expertise in full-stack development.`,
    `${colors.reset}Building scalable Cloud Native Web applications in ${colors.customCyan}${colors.bold}Angular, React, Java(Spring Boot).`,
    `${colors.reset}Proficient in developing and testing end-to-end features with full ownership and in cross-team environment.`,
  ],

  skills: [
    `${colors.customPink}${colors.bold}Languages and Frameworks:${colors.reset} Angular(Typescript), React.Js, Node.Js, Java(Spring Boot)`,
    `${colors.customPink}${colors.bold}Databases:${colors.reset} MySQL, PostgreSQL, MongoDB`,
    `${colors.customPink}${colors.bold}DevOps:${colors.reset} Docker, Kubernetes, Jenkins`,
    `${colors.customPink}${colors.bold}Cloud Platforms:${colors.reset} AWS, Azure`,
  ],

  work: [
    {
      company: `${colors.customGreen}${colors.bold}SAP Labs India`,
      duration: `${colors.customGreen}${colors.italic}(August 2022 - Present)`,
      description: [
        "• Developed an end-to-end feature to automate case processing, reducing manual work by 30%",
        "• Reimagined the entire User Interface for Case Automation Flow, increasing Customer Satisfaction Score by 20%",
        "• Contributed to critical Adapter microservice to help customers reduce workload on data migration",
        "• Developed a feature in cross-team environment to synchronize case data model for AI training",
      ],
      skills: ["Angular", "React.Js", "Java(Spring Boot)", "MySQL", "Docker", "Kubernetes", "AWS"],
    },
  ],

  projects: [
    {
      name: "Cloud Infrastructure Automation",
      description: "Automated deployment pipeline using Terraform, Docker, and Kubernetes",
      url: "https://github.com/aviralshukla/cloud-automation",
    },
    {
      name: "Full-Stack E-commerce Platform",
      description: "Modern e-commerce platform built with React, Node.js, and PostgreSQL",
      url: "https://github.com/aviralshukla/ecommerce-platform",
    },
    {
      name: "Real-time Analytics Dashboard",
      description: "WebSocket-based dashboard for real-time data visualization",
      url: "https://github.com/aviralshukla/analytics-dashboard",
    },
    {
      name: "Curl-able Portfolio",
      description: "This interactive portfolio accessible via curl command",
      url: "https://github.com/aviralshukla/portfolio",
    },
  ],
};

// Helper function to strip ANSI codes for length calculation
function stripAnsi(str: string): string {
  // oxlint-disable-next-line no-control-regex
  return str.replace(/\x1b\[[0-9;]*m/g, "");
}

// Helper function to create box borders
function createBox(title: string, content: string[], width: number = 70): string {
  // Calculate box dimensions based on content
  const maxLineLength = Math.max(...content.map((line) => stripAnsi(line).length));
  const boxWidth = Math.max(width, maxLineLength + 4, title.length + 4);

  const leftBorder = `${colors.gray}│${colors.reset}`;
  const rightBorder = ` ${colors.gray}│${colors.reset}`;
  const emptyLine = `${leftBorder}${" ".repeat(boxWidth - 1)}${rightBorder}`;

  // Build borders
  const titlePadding = "─".repeat(Math.max(0, boxWidth - title.length - 2));
  const topBorder = `${colors.gray}┌─${colors.brightYellow}${colors.bold}${title}${colors.reset}${colors.gray}${titlePadding}─┐${colors.reset}`;
  const bottomBorder = `${colors.gray}└${"─".repeat(boxWidth)}┘${colors.reset}`;

  // Build content lines
  const contentLines = content.map((line) => {
    const visibleLength = stripAnsi(line).length;
    const rightPadding = " ".repeat(Math.max(0, boxWidth - visibleLength - 2));
    return `${leftBorder} ${line}${rightPadding}${rightBorder}`;
  });

  return [topBorder, emptyLine, ...contentLines, emptyLine, bottomBorder].join("\n");
}

// Helper function to detect curl vs browser
function isCurl(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return (
    ua.includes("curl") || ua.includes("wget") || ua.includes("httpie") || ua.includes("ghostty")
  );
}

// Main page
app.get("/", (req: Request, res: Response) => {
  // If browser request, redirect to static HTML
  if (!isCurl(req.headers["user-agent"])) {
    return res.redirect("/index.html");
  }

  // Format work experience for terminal
  const workContent: string[] = [];
  data.work.forEach((job) => {
    workContent.push(`${job.company} ${job.duration}`);
    workContent.push("");
    job.description.forEach((desc) => workContent.push(desc));
    workContent.push("");
    workContent.push(`${colors.italic}${colors.peach}Skills: ${job.skills.join(", ")}`);
  });

  const output = `
${banner}
  ${colors.customCyan}${colors.bold}\x1b]8;;mailto:${data.email}\x1b\\Email${colors.reset}\x1b]8;;\x1b\\ ${colors.gray}•${colors.reset} ${colors.customCyan}${colors.bold}\x1b]8;;${data.github}\x1b\\GitHub${colors.reset}\x1b]8;;\x1b\\ ${colors.gray}•${colors.reset} ${colors.customCyan}${colors.bold}\x1b]8;;https://${data.linkedin}\x1b\\LinkedIn${colors.reset}\x1b]8;;\x1b\\

${createBox("About", data.about)}
${createBox("Skills", data.skills)}

${createBox("Work Experience", workContent)}

  ${colors.brightYellow}URLs:${colors.reset}
  
  ${colors.customGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} ${colors.brightPeach}avrl.dev${colors.reset}           ${colors.customCyan}${colors.italic}Get this page${colors.reset}
  ${colors.customGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} ${colors.brightPeach}avrl.dev/projects${colors.reset}  ${colors.customCyan}${colors.italic}View detailed projects${colors.reset}
  ${colors.customGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} ${colors.brightPeach}avrl.dev/json${colors.reset}      ${colors.customCyan}${colors.italic}Get data in JSON format${colors.reset}
  ${colors.customGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} ${colors.brightPeach}avrl.dev/help${colors.reset}      ${colors.customCyan}${colors.italic}See all available endpoints${colors.reset}
  \n
`;

  res.type("text/plain").send(output);
});

// Projects endpoint
app.get("/projects", (req: Request, res: Response) => {
  // If browser request, redirect to static HTML
  if (!isCurl(req.headers["user-agent"])) {
    return res.redirect("/projects.html");
  }

  let output = `\n${banner}\n\n  ${colors.brightYellow}Projects${colors.reset}\n\n`;

  data.projects.forEach((project, index) => {
    output += `  ${colors.customGreen}${index + 1}.${colors.reset} ${colors.brightMagenta}${project.name}${colors.reset}\n`;
    output += `     ${colors.white}${project.description}${colors.reset}\n`;
    output += `     ${colors.customCyan}\x1b]8;;${project.url}\x1b\\${project.url}\x1b]8;;\x1b\\${colors.reset}\n\n`;
  });

  res.type("text/plain").send(output);
});

// JSON endpoint
app.get("/json", (req: Request, res: Response) => {
  res.json(data);
});

// Help endpoint
app.get("/help", (req: Request, res: Response) => {
  // If browser request, redirect to static HTML
  if (!isCurl(req.headers["user-agent"])) {
    return res.redirect("/help.html");
  }

  const output = `
${banner}

  ${colors.brightYellow}Available Endpoints${colors.reset}

  ${colors.customGreen}GET /${colors.reset}              ${colors.customCyan}${colors.italic}Main portfolio page with ASCII art${colors.reset}
  ${colors.customGreen}GET /projects${colors.reset}      ${colors.customCyan}${colors.italic}Detailed list of projects${colors.reset}
  ${colors.customGreen}GET /json${colors.reset}          ${colors.customCyan}${colors.italic}Portfolio data in JSON format${colors.reset}
  ${colors.customGreen}GET /help${colors.reset}          ${colors.customCyan}${colors.italic}This help message${colors.reset}

  ${colors.brightYellow}Usage Examples${colors.reset}

  ${colors.brightGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} ${colors.customCyan}avrl.dev${colors.reset}
  ${colors.brightGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} ${colors.customCyan}avrl.dev/projects${colors.reset}
  ${colors.brightGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} ${colors.customCyan}avrl.dev/json${colors.reset} ${colors.dim}|${colors.reset} ${colors.cyan}jq .${colors.reset}
  ${colors.brightGreen}$${colors.reset} ${colors.customGreen}curl${colors.reset} -H "Accept: application/json" ${colors.customCyan}avrl.dev${colors.reset}
  \n
`;

  res.type("text/plain").send(output);
});

app.use(express.static("public"));

// Start server (only in development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
    console.log(`Try: curl http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;
