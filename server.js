const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ASCII Art Banner
const banner = `
   █████╗ ██╗   ██╗██╗██████╗  █████╗ ██╗         ███████╗██╗  ██╗██╗   ██╗██╗  ██╗██╗      █████╗ 
  ██╔══██╗██║   ██║██║██╔══██╗██╔══██╗██║         ██╔════╝██║  ██║██║   ██║██║ ██╔╝██║     ██╔══██╗
  ███████║██║   ██║██║██████╔╝███████║██║         ███████╗███████║██║   ██║█████╔╝ ██║     ███████║
  ██╔══██║╚██╗ ██╔╝██║██╔══██╗██╔══██║██║         ╚════██║██╔══██║██║   ██║██╔═██╗ ██║     ██╔══██║
  ██║  ██║ ╚████╔╝ ██║██║  ██║██║  ██║███████╗    ███████║██║  ██║╚██████╔╝██║  ██╗███████╗██║  ██║
  ╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`;

const data = {
  name: "Aviral Shukla",
  tagline: "Software Engineer | Full Stack Developer",
  email: "aviral.shukla10152@gmail.com",
  github: "https://github.com/viralcodex",
  linkedin: "https://linkedin.com/in/aviralshukla",

  about: [
    "Software Engineer with 3 years of expertise in full-stack development",
    "Building scalable Cloud Native Web applications in Angular, React, Java(Spring Boot)",
    "Proficient in developing and testing end-to-end features with full ownership and in cross-team environment"
  ],

  skills: [
    "Languages and Frameworks: Angular(Typescript), React.Js, Node.Js, Java(Spring Boot)",
    "Databases: MySQL, PostgreSQL, MongoDB",
    "DevOps: Docker, Kubernetes, Jenkins",
    "Cloud Platforms: AWS, Azure"
  ],

  work: [
    {
      company: "SAP Labs India",
      duration: "August 2022 - Present",
      description: [
        "• Developed an end-to-end feature to automate case processing, reducing manual work by 30%",
        "• Reimagined the entire User Interface for Case Automation Flow, increasing Customer Satisfaction Score by 20%",
        "• Contributed to critical Adapter microservice to help customers reduce workload on data migration",
        "• Developed a feature in cross-team environment to synchronize case data model for AI training"
      ],
      skills: ["Angular", "React.Js", "Java(Spring Boot)", "MySQL", "Docker", "Kubernetes", "AWS"]
    }
  ],

  projects: [
    {
      name: "Cloud Infrastructure Automation",
      description: "Automated deployment pipeline using Terraform, Docker, and Kubernetes",
      url: "https://github.com/aviralshukla/cloud-automation"
    },
    {
      name: "Full-Stack E-commerce Platform",
      description: "Modern e-commerce platform built with React, Node.js, and PostgreSQL",
      url: "https://github.com/aviralshukla/ecommerce-platform"
    },
    {
      name: "Real-time Analytics Dashboard",
      description: "WebSocket-based dashboard for real-time data visualization",
      url: "https://github.com/aviralshukla/analytics-dashboard"
    },
    {
      name: "Curl-able Portfolio",
      description: "This interactive portfolio accessible via curl command",
      url: "https://github.com/aviralshukla/portfolio"
    }
  ]
};

// Helper function to create box borders
function createBox(title, content, width = 70) {
  // Calculate max line length to ensure box is wide enough
  const maxLineLength = Math.max(...content.map(line => line.length));
  const actualWidth = Math.max(width, maxLineLength + 4, title.length + 4);
  
  const topBorderRepeat = Math.max(0, actualWidth - title.length - 2);
  const topBorder = `┌─${title}${'─'.repeat(topBorderRepeat)}┐`;
  const bottomBorder = `└${'─'.repeat(actualWidth)}┘`;

  const lines = content.map(line => {
    const padding = Math.max(0, actualWidth - line.length - 2);
    return `│ ${line}${' '.repeat(padding)} │`;
  });

  return [topBorder, ...lines, bottomBorder].join('\n');
}

// Main page
app.get('/', (req, res) => {
  // Format work experience
  const workContent = [];
  data.work.forEach(job => {
    workContent.push(`${job.company} (${job.duration})`);
    workContent.push('');
    job.description.forEach(desc => workContent.push(desc));
    workContent.push('');
    workContent.push(`Skills: ${job.skills.join(', ')}`);
  });

  const output = `
${banner}
${data.name}
${data.tagline}

${createBox('About', data.about)}

${createBox('Skills', data.skills)}

${createBox('Work Experience', workContent)}

${createBox('Contact', [
    `Email:    ${data.email}`,
    `GitHub:   ${data.github}`,
    `LinkedIn: ${data.linkedin}`
  ])}

  Commands:
  
  $ curl localhost:${PORT}           Get this page
  $ curl localhost:${PORT}/projects  View detailed projects
  $ curl localhost:${PORT}/json      Get data in JSON format
  $ curl localhost:${PORT}/help      See all available endpoints
`;

  res.type('text/plain').send(output);
});

// Projects endpoint
app.get('/projects', (req, res) => {
  let output = `\n${banner}\n\n  Projects\n\n`;

  data.projects.forEach((project, index) => {
    output += `  ${index + 1}. ${project.name}\n`;
    output += `     ${project.description}\n`;
    output += `     ${project.url}\n\n`;
  });

  res.type('text/plain').send(output);
});

// JSON endpoint
app.get('/json', (req, res) => {
  res.json(data);
});

// Help endpoint
app.get('/help', (req, res) => {
  const output = `
${banner}

  Available Endpoints

  GET /              Main portfolio page with ASCII art
  GET /projects      Detailed list of projects
  GET /json          Portfolio data in JSON format
  GET /help          This help message

  Usage Examples

  $ curl yoursite.com
  $ curl yoursite.com/projects
  $ curl yoursite.com/json | jq .
  $ curl -H "Accept: application/json" yoursite.com
`;

  res.type('text/plain').send(output);
});

// Start server (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
    console.log(`Try: curl http://localhost:${PORT}`);
  });
}

// Export for Vercel
module.exports = app;