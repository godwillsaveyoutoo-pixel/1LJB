/* =========================
   Wiskunde Quest – map.js
   Topic map & game launcher
========================= */

function renderTopicMap() {
  const grid = document.getElementById("mapGrid");
  if (!grid || !Array.isArray(window.TOPICS)) return;

  grid.innerHTML = "";

  TOPICS.forEach((topic) => {
    const medal = (typeof prog !== "undefined" && prog?.medals) ? (prog.medals[topic.id] || "") : "";
    const medalClass = medal ? `medal-${medal}` : "";
    const medalEmojiSafe = (typeof medalEmoji === "function" && medal) ? medalEmoji(medal) : "";

    const card = document.createElement("div");
    card.className = `tile topicCard ${medalClass}`.trim();

    card.innerHTML = `
      ${medal ? `<div class="cornerMedal ${medal}" title="Medaille">${medalEmojiSafe}</div>` : ""}
      <div class="tileTop">${topic.icon || ""}</div>
      <div class="tileTitle">${topic.title}</div>
    `;

    card.addEventListener("click", () => {
      openTopicModal(topic);
      bindTopicStartButtons(topic);
      setTimeout(() => renderTopicModalContent(topic), 0);
    });

    grid.appendChild(card);
  });
}

function bindTopicStartButtons(topic) {
  const practice = document.getElementById("btnTopicPractice");
  const run = document.getElementById("btnTopicRun");
  const test = document.getElementById("btnTopicTest");

  if (practice) {
    practice.onclick = () => {
      closeTopicModal();
      startGame({
        topic: { id: topic.id, title: topic.title },
        mode: "practice",
      });
    };
  }

  if (run) {
    run.onclick = () => {
      if (run.disabled) return;
      closeTopicModal();
      startGame({
        topic: { id: topic.id, title: topic.title },
        mode: "run",
        limit: 5 * 60 * 1000,
      });
    };
  }

  if (test) {
    test.onclick = () => {
      closeTopicModal();
      showScreen("scrTestSetup");
      window.__pendingTestTopic = topic;
    };
  }
}

function renderTopicModalContent(topic) {
  const wrap = document.getElementById("topicModalContent");
  if (!wrap) return;

  wrap.innerHTML = "";

  // Alleen informatieve lijst van subtopics (geen levels!)
  if (topic.subtopics) {
    Object.values(topic.subtopics).forEach(sub => {
      const block = document.createElement("div");
      block.className = "subBlock";

      const title = document.createElement("div");
      title.className = "subTitle";
      title.textContent = sub.title;

      block.appendChild(title);
      wrap.appendChild(block);
    });
  }
}



document.addEventListener("DOMContentLoaded", () => {
  renderTopicMap();


  // Test setup: seg buttons (aantal vragen + tijdslimiet)
  function wireSeg(segId) {
    const seg = document.getElementById(segId);
    if (!seg) return;
    seg.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      seg.querySelectorAll("button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
    });
  }
  wireSeg("testCountSeg");
  wireSeg("testTimeSeg");

  // Terug vanuit toets-setup
  document.getElementById("btnBackFromTestSetup")?.addEventListener("click", () => {
    showScreen("scrMap");
  });

  /* ---------- Start Toets ---------- */
  document.getElementById("btnStartTest")?.addEventListener("click", async () => {
    if (!window.__pendingTestTopic) return;

    const count =
      document.querySelector("#testCountSeg .on")?.dataset.n ?? 20;

    const time =
      document.querySelector("#testTimeSeg .on")?.dataset.t ?? 0;

    
    // Vraag naam/klas (voor bewijsje), indien beschikbaar
    let identity = null;
    try {
      if (window.MR_SHARED?.askName) {
        identity = await MR_SHARED.askName("toets", {
          fixedClass: '1B',
          hideClass: true,
          extraFlags: [
            { id: "dyscalculie", label: "Ik heb dyscalculie", checked: false }
          ]
        });
      }
    } catch (e) {
      console.warn("askName failed", e);
    }

    startGame({
      topic: {
        id: window.__pendingTestTopic.id,
        title: window.__pendingTestTopic.title,
      },
      mode: "test",
      limit: Number(time) * 1000,
      count: Number(count) || 20,
      identity: identity && typeof identity === "object"
        ? identity
        : { name: identity || "", class: "", flags: {} },
    });
});
});


window.renderTopicMap = renderTopicMap;
