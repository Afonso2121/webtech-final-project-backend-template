const fs = require("fs");
const path = require("path");
const { generateHtmlReport } = require("./report-html");

const outDir = path.resolve(__dirname, "..");

const groups = [
  {
    filename: "grade-report-test-grupo01.html",
    options: { groupLabel: "Grupo 01", isMock: true },
    projectInfo: {
      groupMembers: [
        "João Ferreira — 31001",
        "Ana Costa — 31002",
        "Pedro Matos — 31003",
      ],
      projectTheme: "WeatherNow — Previsão meteorológica em tempo real",
      apiName: "Open-Meteo",
      apiLink: "https://open-meteo.com/",
      apiKey: "Não",
      frontendLink: "https://github.com/ipvc-tweb/grupo01-frontend",
    },
    report: {
      score: 20,
      maxScore: 20,
      percentage: 100,
      checks: {
        structure: { status: "pass", score: 10, maxScore: 10, missing: [] },
        lint: { status: "pass", score: 5, maxScore: 5, output: "" },
        syntax: { status: "pass", score: 5, maxScore: 5, output: "" },
      },
    },
    analysis: {
      routeFiles: 3,
      controllers: 3,
      models: 2,
      crudVerbs: 4,
      hasGet: true,
      hasPost: true,
      hasPut: true,
      hasDelete: true,
      hasSwagger: true,
      hasEnvExample: true,
      infoFilled: true,
      unfilledFields: [],
      isDefaultApp: false,
    },
  },
  {
    filename: "grade-report-test-grupo02.html",
    options: { groupLabel: "Grupo 02", isMock: true },
    projectInfo: {
      groupMembers: ["Mariana Silva — 31010", "Tiago Rodrigues — 31011"],
      projectTheme: "FilmTrack — Gestão de filmes e séries",
      apiName: "The Movie Database (TMDB)",
      apiLink: "https://api.themoviedb.org/3",
      apiKey: "Sim",
      frontendLink: "https://github.com/ipvc-tweb/grupo02-frontend",
    },
    report: {
      score: 15,
      maxScore: 20,
      percentage: 75,
      checks: {
        structure: { status: "pass", score: 10, maxScore: 10, missing: [] },
        lint: {
          status: "fail",
          score: 0,
          maxScore: 5,
          output:
            "src/controllers/film.controller.js:22  error  no-unused-vars\nsrc/models/review.js:8   error  eqeqeq\n\n2 errors",
          notes: "Corrigir variável não usada e usar === em vez de ==.",
        },
        syntax: { status: "pass", score: 5, maxScore: 5, output: "" },
      },
    },
    analysis: {
      routeFiles: 2,
      controllers: 2,
      models: 2,
      crudVerbs: 4,
      hasGet: true,
      hasPost: true,
      hasPut: true,
      hasDelete: true,
      hasSwagger: true,
      hasEnvExample: true,
      infoFilled: true,
      unfilledFields: [],
      isDefaultApp: false,
    },
  },
  {
    filename: "grade-report-test-grupo03.html",
    options: { groupLabel: "Grupo 03", isMock: true },
    projectInfo: {
      groupMembers: ["Beatriz Santos — 31020", "Rui Oliveira — 31021"],
      projectTheme: "BookShelf — Estante virtual de livros",
      apiName: "Open Library",
      apiLink: "https://openlibrary.org/developers/api",
      apiKey: "Não",
      frontendLink: "https://github.com/ipvc-tweb/grupo03-frontend",
    },
    report: {
      score: 15,
      maxScore: 20,
      percentage: 75,
      checks: {
        structure: { status: "pass", score: 10, maxScore: 10, missing: [] },
        lint: {
          status: "fail",
          score: 0,
          maxScore: 5,
          output:
            "src/routes/book.routes.js:5  error  no-console\nsrc/controllers/book.controller.js:14  error  no-console\n\n2 errors",
          notes: "Remover console.log antes da entrega.",
        },
        syntax: { status: "pass", score: 5, maxScore: 5, output: "" },
      },
    },
    analysis: {
      routeFiles: 1,
      controllers: 1,
      models: 1,
      crudVerbs: 3,
      hasGet: true,
      hasPost: true,
      hasPut: true,
      hasDelete: false,
      hasSwagger: true,
      hasEnvExample: true,
      infoFilled: true,
      unfilledFields: [],
      isDefaultApp: false,
    },
  },
  {
    filename: "grade-report-test-grupo04.html",
    options: { groupLabel: "Grupo 04", isMock: true },
    projectInfo: {
      groupMembers: ["Carlos Mendes — 31030", "Sofia Lima — 31031"],
      projectTheme: "-",
      apiName: "-",
      apiLink: "-",
      apiKey: "-",
      frontendLink: "-",
    },
    report: {
      score: 5,
      maxScore: 20,
      percentage: 25,
      checks: {
        structure: {
          status: "fail",
          score: 5,
          maxScore: 10,
          missing: ["src/controllers", "src/models", "src/config/swagger.js"],
          notes:
            "Projeto não segue a estrutura base do template. Swagger em falta e sem modelos nem controllers.",
        },
        lint: { status: "skipped", score: 0, maxScore: 5, output: "" },
        syntax: { status: "skipped", score: 0, maxScore: 5, output: "" },
      },
    },
    analysis: {
      routeFiles: 0,
      controllers: 0,
      models: 0,
      crudVerbs: 0,
      hasGet: false,
      hasPost: false,
      hasPut: false,
      hasDelete: false,
      hasSwagger: false,
      hasEnvExample: false,
      infoFilled: false,
      unfilledFields: [
        "Student 1:",
        "Student 2:",
        "- API name:",
        "- API link:",
        "- Link:",
      ],
      isDefaultApp: true,
    },
  },
];

groups.forEach(({ filename, options, projectInfo, report, analysis }) => {
  const html = generateHtmlReport(report, projectInfo, analysis, options);
  const outPath = path.join(outDir, filename);
  fs.writeFileSync(outPath, html, "utf8");
  console.log(
    `Generated: ${filename}  (${report.score}/${report.maxScore} valores)`,
  );
});

console.log("\nAll test reports generated.");
