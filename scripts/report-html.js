"use strict";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const chip = (status) => {
  if (status === "pass") return '<span class="chip good">✅ Cumpriu</span>';
  if (status === "skipped")
    return '<span class="chip muted">⏭️ Não verificado</span>';
  return '<span class="chip bad">❌ Não</span>';
};

const CSS = `
  :root {
    --bg: #0b1020;
    --text: #e5e7eb;
    --muted: #a8b0c2;
    --line: rgba(255,255,255,0.08);
    --shadow: 0 12px 30px rgba(0,0,0,.35);
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,"Noto Sans","Apple Color Emoji","Segoe UI Emoji";
    background: radial-gradient(1200px 700px at 20% 0%, rgba(56,189,248,.18), transparent 55%),
                radial-gradient(1200px 700px at 90% 10%, rgba(34,197,94,.14), transparent 60%),
                var(--bg);
    color: var(--text);
    line-height: 1.4;
  }

  .container { max-width: 980px; margin: 28px auto; padding: 0 18px 28px; }
  .mock-banner {
    background: rgba(245,158,11,.15);
    border: 1px solid rgba(245,158,11,.3);
    border-radius: 10px;
    padding: 10px 16px;
    margin-bottom: 16px;
    color: #fde68a;
    font-size: 13px;
    font-weight: 700;
  }
  .header {
    display:flex;
    gap:16px;
    align-items:stretch;
    justify-content:space-between;
    flex-wrap:wrap;
  }

  .title, .summary {
    min-height: 200px;
    border:1px solid var(--line);
    border-radius:18px;
    box-shadow: var(--shadow);
  }

  .title {
    position: relative;
    padding:18px;
    background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
    flex:1 1 520px;
    min-width:320px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    gap:14px;
  }

  .kicker {
    color: var(--muted);
    font-weight:800;
    letter-spacing:.8px;
    text-transform:uppercase;
    font-size:12px;
    display:flex;
    gap:10px;
    align-items:center;
    flex-wrap:wrap;
  }

  .epoca-pill {
    position:absolute;
    top:16px;
    right:16px;
    border:1px solid var(--line);
    border-radius:999px;
    padding:6px 10px;
    background: rgba(255,255,255,.03);
    display:inline-flex;
    gap:8px;
    align-items:center;
    color: var(--text);
    font-weight:800;
    font-size:12px;
    white-space:nowrap;
  }

  .main-title {
    display:flex;
    align-items:baseline;
    gap:12px;
    flex-wrap:wrap;
    margin-top:2px;
  }
  .main-title .big {
    margin:0;
    font-size:34px;
    font-weight:900;
    line-height:1.05;
  }

  .tema {
    margin:0;
    font-size:18px;
    font-weight:850;
    color:#dbeafe;
  }

  .pill {
    border:1px solid var(--line);
    border-radius:999px;
    padding:8px 12px;
    background: rgba(255,255,255,.03);
    display:inline-flex;
    gap:10px;
    align-items:center;
    font-weight:850;
    color: var(--text);
    width: fit-content;
  }

  .members {
    margin:0;
    padding-left: 28px;
    list-style: disc;
  }
  .members li {
    margin:8px 0;
    padding-left: 10px;
  }
  .name { font-weight:700; }

  .summary {
    flex:0 0 320px;
    min-width:320px;
    background: rgba(15,23,42,.88);
    padding:18px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }

  .sum-label {
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #c7d2fe;
    margin-bottom: 8px;
  }

  .sum-big {
    font-size: 34px;
    font-weight: 900;
    line-height: 1.1;
    padding: 10px 14px;
    border-radius: 14px;
    border: 1px solid var(--line);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.02),
      0 8px 18px rgba(0,0,0,.35);
    width: fit-content;
  }
  .sum-big small {
    font-size: 14px;
    font-weight: 800;
    color: var(--muted);
    margin-left: 6px;
  }

  .sum-breakdown {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--line);
    display: grid;
    gap: 16px;
  }
  .sum-section {
    display:flex;
    flex-direction:column;
    gap:6px;
  }
  .sum-title {
    font-size: 14px;
    font-weight: 900;
    letter-spacing: .8px;
    text-transform: uppercase;
    color: #dbeafe;
  }

  .sum-value {
    font-size: 20px;
    font-weight: 900;
    padding: 8px 12px;
    border-radius: 12px;
    border: 1px solid var(--line);
    width: fit-content;
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.02),
      0 6px 14px rgba(0,0,0,.28);
  }
  .sum-value span {
    font-size: 13px;
    font-weight: 800;
    color: var(--muted);
    margin-left: 6px;
  }

  .grade-bad  { color: #fecaca; text-shadow: 0 0 6px rgba(239,68,68,.25); }
  .grade-ok   { color: #fde68a; text-shadow: 0 0 6px rgba(245,158,11,.25); }
  .grade-good { color: #bbf7d0; text-shadow: 0 0 6px rgba(34,197,94,.25); }

  .grid {
    display:grid;
    grid-template-columns: 1fr;
    gap:16px;
    margin-top:16px;
  }
  .card {
    border:1px solid var(--line);
    background: rgba(15,23,42,.75);
    border-radius:18px;
    padding:16px;
    box-shadow: var(--shadow);
  }
  .card h2 { margin:0 0 10px; font-size:16px; color: #dbeafe; }

  .table-card {
    margin-top:16px;
    border:1px solid var(--line);
    background: rgba(15,23,42,.8);
    border-radius:18px;
    overflow:hidden;
    box-shadow: var(--shadow);
  }
  .table-head {
    padding:12px 16px;
    background: linear-gradient(90deg, rgba(56,189,248,.18), rgba(34,197,94,.12));
    border-bottom:1px solid var(--line);
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:12px;
    flex-wrap:wrap;
  }
  .table-head .meta { color: var(--muted); font-size:12px; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th, td { padding:12px; border-bottom:1px solid var(--line); vertical-align:top; }
  th {
    text-align:left;
    color:#c7d2fe;
    font-size:12px;
    letter-spacing:.2px;
    text-transform:uppercase;
  }
  .score { font-weight:900; white-space:nowrap; }
  .chip {
    display:inline-block;
    padding:6px 10px;
    border-radius:999px;
    border:1px solid var(--line);
    font-weight:750;
    font-size:12px;
    white-space:nowrap;
  }
  .chip.good  { background: rgba(34,197,94,.12);  color: #bbf7d0; }
  .chip.bad   { background: rgba(239,68,68,.12);   color: #fecaca; }
  .chip.muted { background: rgba(255,255,255,.04); color: var(--muted); }

  .footer {
    margin-top:18px;
    border-top:1px solid var(--line);
    padding-top:12px;
    color: var(--muted);
    font-size:12px;
    text-align:center;
  }

  @media print {
    body { background:white; color:#111827; }
    .container { margin:0; max-width:none; }
    .title, .summary, .card, .table-card { box-shadow:none !important; background:white !important; border:1px solid #e5e7eb !important; }
    .table-head { background:#f3f4f6 !important; }
    th { color:#111827 !important; }
    .meta, .kicker, .footer, .sum-value span, .sum-big small { color:#4b5563 !important; }
    .epoca-pill { background:#f3f4f6 !important; border:1px solid #e5e7eb !important; color:#111827 !important; }
    .grade-bad  { color:#991b1b !important; text-shadow:none !important; }
    .grade-ok   { color:#854d0e !important; text-shadow:none !important; }
    .grade-good { color:#166534 !important; text-shadow:none !important; }
    .chip.good  { background:#dcfce7 !important; color:#166534 !important; }
    .chip.bad   { background:#fee2e2 !important; color:#991b1b !important; }
    .chip.muted { background:#f3f4f6 !important; color:#4b5563 !important; }
  }
`;

/**
 * @param {object} report      - { score, maxScore, percentage, checks: { structure, lint, syntax } }
 * @param {object} projectInfo - { groupMembers, projectTheme, apiName, apiLink, apiKey, frontendLink }
 * @param {object} analysis    - { routeFiles, controllers, models, crudVerbs, hasGet, hasPost, hasPut, hasDelete, hasSwagger, hasEnvExample, infoFilled, unfilledFields, isDefaultApp }
 * @param {object} [options]   - { groupLabel, isMock }
 */
function generateHtmlReport(report, projectInfo, analysis, options = {}) {
  const { groupLabel = "Grupo", isMock = false } = options;
  const gradeClass =
    report.score >= 14 ? "good" : report.score >= 10 ? "ok" : "bad";

  const membersList =
    projectInfo.groupMembers.length > 0
      ? `<ul class="members">${projectInfo.groupMembers
          .map((m) => `<li><span class="name">${escapeHtml(m)}</span></li>`)
          .join("")}</ul>`
      : `<p style="color:var(--muted)">Sem dados de grupo.</p>`;

  const crudLabel =
    [
      analysis.hasGet && "GET",
      analysis.hasPost && "POST",
      analysis.hasPut && "PUT/PATCH",
      analysis.hasDelete && "DELETE",
    ]
      .filter(Boolean)
      .join(", ") || "nenhum";

  const analysisRows = [
    {
      label: "Ficheiros de rotas",
      sub: "(routes/*.js excl. index.js)",
      value: analysis.routeFiles,
      ok: analysis.routeFiles > 0,
      observation:
        analysis.routeFiles > 2
          ? `${analysis.routeFiles} ficheiros de rotas — boa separação por recurso`
          : analysis.routeFiles > 0
            ? `${analysis.routeFiles} ficheiro(s) de rotas — estrutura básica presente`
            : "Nenhum ficheiro de rotas — endpoints não definidos como módulos separados",
    },
    {
      label: "Controllers criados",
      sub: "(controllers/)",
      value: analysis.controllers,
      ok: analysis.controllers > 0,
      observation:
        analysis.controllers > 2
          ? `${analysis.controllers} controllers — boa separação de lógica`
          : analysis.controllers > 0
            ? `${analysis.controllers} controller(s) — separação parcial da lógica`
            : "Nenhum controller — lógica provavelmente misturada nas rotas",
    },
    {
      label: "Modelos criados",
      sub: "(models/)",
      value: analysis.models,
      ok: analysis.models >= 2,
      observation:
        analysis.models >= 2
          ? `${analysis.models} modelos — mínimo de 2 entidades cumprido`
          : analysis.models === 1
            ? "Apenas 1 modelo — o enunciado exige pelo menos 2 entidades"
            : "Nenhum modelo — dados sem estrutura definida",
    },
    {
      label: "Verbos CRUD detetados",
      sub: "(GET / POST / PUT/PATCH / DELETE)",
      value: `${analysis.crudVerbs}/4 — ${crudLabel}`,
      ok: analysis.crudVerbs >= 3,
      observation:
        analysis.crudVerbs >= 4
          ? "CRUD completo — todos os verbos HTTP presentes"
          : analysis.crudVerbs >= 3
            ? `${analysis.crudVerbs} verbos presentes — CRUD quase completo`
            : analysis.crudVerbs > 0
              ? `Apenas ${analysis.crudVerbs} verbo(s) — CRUD incompleto`
              : "Nenhum verbo CRUD nas rotas — API não implementada",
    },
    {
      label: "Swagger configurado",
      sub: "(config/swagger.js)",
      value: analysis.hasSwagger ? "Sim" : "Não",
      ok: analysis.hasSwagger,
      observation: analysis.hasSwagger
        ? "Swagger/OpenAPI configurado — documentação disponível em /api-docs"
        : "Swagger não configurado — ficheiro vazio ou em falta",
    },
    {
      label: ".env.example presente",
      sub: "",
      value: analysis.hasEnvExample ? "Sim" : "Não",
      ok: analysis.hasEnvExample,
      observation: analysis.hasEnvExample
        ? ".env.example presente — variáveis de ambiente documentadas"
        : ".env.example em falta — instruções de configuração incompletas",
    },
    {
      label: "PROJECT_INFO.md preenchido",
      sub: "",
      value: analysis.infoFilled ? "Sim" : "Não",
      ok: analysis.infoFilled,
      observation: analysis.infoFilled
        ? "Todos os campos preenchidos"
        : `Campos por preencher: ${(analysis.unfilledFields || []).join(", ")}`,
    },
  ]
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.label)}${row.sub ? ` <span style="color:var(--muted);font-size:11px;">${escapeHtml(row.sub)}</span>` : ""}</td>
        <td class="score">${escapeHtml(String(row.value))}</td>
        <td>${row.ok ? '<span class="chip good">✅ OK</span>' : '<span class="chip bad">⚠️ Atenção</span>'}</td>
        <td style="color:var(--muted);font-size:12px;">${escapeHtml(row.observation)}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-PT">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Technologias Web — ${escapeHtml(groupLabel)} (${escapeHtml(projectInfo.projectTheme || "Tema")})</title>
    <style>${CSS}</style>
  </head>
  <body>
    <div class="container">
      ${isMock ? `<div class="mock-banner">⚠️ Relatório simulado — dados fictícios para demonstração</div>` : ""}

      <div class="header">
        <div class="title">
          <div class="epoca-pill">📚 Época: <b>Época Normal</b></div>
          <div>
            <div class="kicker">TECHNOLOGIAS WEB • AVALIAÇÃO PRÁTICA • BACKEND</div>
            <div class="main-title">
              <h1 class="big">${escapeHtml(groupLabel)}</h1>
            </div>
            <p class="tema">🎯 Tema: ${escapeHtml(projectInfo.projectTheme || "-")}</p>
            <div style="margin-top:12px;">
              <div class="pill">👥 Elementos</div>
              ${membersList}
            </div>
          </div>
        </div>

        <div class="summary">
          <div>
            <div class="sum-label">🎯 NOTA FINAL</div>
            <div class="sum-big grade-${gradeClass}">
              ${escapeHtml(String(report.score))} <small>valores</small>
            </div>
            <div class="sum-breakdown">
              <div class="sum-section">
                <div class="sum-title">🧱 OBJETIVOS</div>
                <div class="sum-value grade-${gradeClass}">
                  ${escapeHtml(String(report.score))}
                  <span>valores / ${escapeHtml(String(report.maxScore))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-card">
        <div class="table-head">
          <div><b>🧱 Objetivos Principais</b> <span class="meta">— (máx ${escapeHtml(String(report.maxScore))} valores)</span></div>
          <div class="meta">❌ Não • ✅ Cumpriu • ⏭️ Não verificado</div>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width:44%;">Critério</th>
              <th style="width:10%;">Pontos</th>
              <th style="width:20%;">Estado</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Estrutura mínima</td>
              <td class="score">${escapeHtml(String(report.checks.structure.score))}/${escapeHtml(String(report.checks.structure.maxScore))}</td>
              <td>${chip(report.checks.structure.status)}</td>
              <td>
                ${
                  (report.checks.structure.missing || []).length > 0
                    ? `<span style="color:#fecaca;font-size:12px;">Pastas/ficheiros em falta:</span><ul style="margin:4px 0 0;padding-left:16px;font-size:12px;color:var(--muted);">${(report.checks.structure.missing || []).map((m) => `<li>${escapeHtml(m)}</li>`).join("")}</ul>`
                    : '<span style="color:#bbf7d0;font-size:12px;">Todos os ficheiros e pastas obrigatórios estão presentes.</span>'
                }
                ${report.checks.structure.notes ? `<p style="margin:6px 0 0;font-size:12px;color:var(--muted);">${escapeHtml(report.checks.structure.notes)}</p>` : ""}
              </td>
            </tr>
            <tr>
              <td>Lint</td>
              <td class="score">${escapeHtml(String(report.checks.lint.score))}/${escapeHtml(String(report.checks.lint.maxScore))}</td>
              <td>${chip(report.checks.lint.status)}</td>
              <td>
                ${
                  report.checks.lint.status === "pass"
                    ? '<span style="color:#bbf7d0;font-size:12px;">Sem erros de lint — código segue as regras de estilo.</span>'
                    : report.checks.lint.status === "skipped"
                      ? '<span style="color:var(--muted);font-size:12px;">Não verificado (estrutura incompleta).</span>'
                      : ""
                }
                ${report.checks.lint.output ? `<details style="margin-top:6px;"><summary style="font-size:12px;cursor:pointer;">Ver erros de lint</summary><pre style="margin:6px 0 0;font-size:11px;">${escapeHtml(report.checks.lint.output)}</pre></details>` : ""}
                ${report.checks.lint.notes ? `<p style="margin:6px 0 0;font-size:12px;color:var(--muted);">${escapeHtml(report.checks.lint.notes)}</p>` : ""}
              </td>
            </tr>
            <tr>
              <td>Sintaxe Node.js</td>
              <td class="score">${escapeHtml(String(report.checks.syntax.score))}/${escapeHtml(String(report.checks.syntax.maxScore))}</td>
              <td>${chip(report.checks.syntax.status)}</td>
              <td>
                ${
                  report.checks.syntax.status === "pass"
                    ? '<span style="color:#bbf7d0;font-size:12px;">Ficheiros principais sem erros de sintaxe.</span>'
                    : report.checks.syntax.status === "skipped"
                      ? '<span style="color:var(--muted);font-size:12px;">Não verificado (estrutura incompleta).</span>'
                      : '<span style="color:#fecaca;font-size:12px;">Erro de sintaxe — o servidor não arranca.</span>'
                }
                ${report.checks.syntax.output ? `<details style="margin-top:6px;"><summary style="font-size:12px;cursor:pointer;">Ver erros</summary><pre style="margin:6px 0 0;font-size:11px;">${escapeHtml(report.checks.syntax.output)}</pre></details>` : ""}
                ${report.checks.syntax.notes ? `<p style="margin:6px 0 0;font-size:12px;color:var(--muted);">${escapeHtml(report.checks.syntax.notes)}</p>` : ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-card">
        <div class="table-head">
          <div><b>📌 Informação do projeto</b></div>
          <div class="meta">Fonte: PROJECT_INFO.md</div>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width:44%;">Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>API externa</td><td>${escapeHtml(projectInfo.apiName || "-")}</td></tr>
            <tr><td>API link</td><td>${escapeHtml(projectInfo.apiLink || "-")}</td></tr>
            <tr><td>Requer API key</td><td>${escapeHtml(projectInfo.apiKey || "-")}</td></tr>
            <tr><td>Frontend</td><td>${escapeHtml(projectInfo.frontendLink || "-")}</td></tr>
          </tbody>
        </table>
      </div>

      <div class="table-card">
        <div class="table-head">
          <div><b>🔍 Análise estática do código</b></div>
          <div class="meta">Gerado automaticamente</div>
        </div>
        <table>
          <thead>
            <tr>
              <th style="width:36%;">Indicador</th>
              <th style="width:12%;">Valor</th>
              <th style="width:14%;">Estado</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>${analysisRows}</tbody>
        </table>
      </div>

      <div class="footer">
        🎓 <b>Technologias Web</b> • 📆 <b>Ano letivo 2025/2026</b>
      </div>
    </div>
  </body>
</html>`;
}

module.exports = { generateHtmlReport };
