
(function () {
  "use strict";

  if (document.getElementById("ozabris-tv-bar")) return;

  const apps = [
    { name: "Netflix", icon: "🔴" },
    { name: "Orange TV", icon: "📺" },
    { name: "Prime Video", icon: "🎬" },
    { name: "YouTube", icon: "▶️" }
  ];

  const style = document.createElement("style");
  style.textContent = `
    #ozabris-tv-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9000;
      background: #12263a;
      border-top: 2px solid #c5a880;
      padding: 10px max(10px, env(safe-area-inset-right))
               calc(10px + env(safe-area-inset-bottom))
               max(10px, env(safe-area-inset-left));
      box-shadow: 0 -5px 25px #0004;
    }

    #ozabris-tv-bar .tv-title {
      color: #e9d8b9;
      text-align: center;
      font-size: 13px;
      margin-bottom: 8px;
      font-weight: bold;
    }

    #ozabris-tv-bar .tv-apps {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      max-width: 850px;
      margin: auto;
    }

    #ozabris-tv-bar button {
      min-width: 0;
      min-height: 52px;
      border: 1px solid #c5a880;
      border-radius: 12px;
      background: #ffffff18;
      color: white;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }

    #ozabris-tv-bar button:focus-visible {
      outline: 4px solid #ffce55;
      outline-offset: 2px;
      background: #c5a880;
      color: #12263a;
      transform: scale(1.04);
    }

    #ozabris-tv-bar button:active {
      background: #c5a880;
      color: #12263a;
    }

    body {
      padding-bottom: 120px !important;
    }

    @media (max-width: 600px) {
      #ozabris-tv-bar {
        padding-top: 8px;
      }

      #ozabris-tv-bar button {
        min-height: 48px;
        font-size: 11px;
        padding: 6px 2px;
      }

      #ozabris-tv-bar .tv-apps {
        gap: 5px;
      }
    }
  `;
  document.head.appendChild(style);

  const bar = document.createElement("nav");
  bar.id = "ozabris-tv-bar";
  bar.setAttribute("aria-label", "Divertissements");

  const title = document.createElement("div");
  title.className = "tv-title";
  title.textContent = "📺 VOS DIVERTISSEMENTS";

  const grid = document.createElement("div");
  grid.className = "tv-apps";

  apps.forEach(app => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = app.icon + " " + app.name;
    button.setAttribute("aria-label", "Ouvrir " + app.name);

    button.addEventListener("click", () => {
      if (/Android/i.test(navigator.userAgent)) {
        window.location.href = "fully://launcher";
      } else {
        alert("Applications disponibles sur la télévision Android.");
      }
    });

    grid.appendChild(button);
  });

  bar.appendChild(title);
  bar.appendChild(grid);
  document.body.appendChild(bar);

  grid.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

    event.preventDefault();
    event.stopPropagation();

    const buttons = Array.from(grid.querySelectorAll("button"));
    const index = buttons.indexOf(document.activeElement);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = index < 0 ? 0 :
      (index + direction + buttons.length) % buttons.length;

    buttons[next].focus();
  });
})();

