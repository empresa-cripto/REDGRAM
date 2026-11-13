const WHATSAPP = "5598984560444";
const $ = (id) => document.getElementById(id);

$("year").textContent = new Date().getFullYear();

$("menuToggle").addEventListener("click", () => {
  const nav = $("mainNav");
  const opened = nav.classList.toggle("open");
  $("menuToggle").setAttribute("aria-expanded", String(opened));
});
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => {
  $("mainNav").classList.remove("open");
  $("menuToggle").setAttribute("aria-expanded", "false");
}));

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

$("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    "Olá, REDGRAM+! Gostaria de realizar minha inscrição.",
    `Nome: ${data.get("name")}`,
    `WhatsApp: ${data.get("phone")}`,
    `E-mail: ${data.get("email") || "Não informado"}`,
    `Serviço: ${data.get("course")}`,
    `Objetivo: ${data.get("message") || "Não informado"}`,
    "",
    "Aguardo o retorno. Obrigado(a)!"
  ].join("\n");
  $("formFeedback").textContent = "Sua mensagem está pronta no WhatsApp. Toque em enviar para concluir o contato.";
  openWhatsApp(message);
});

$("proposalForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!$("proposalAccept").checked) return;
  const name = $("proposalName").value.trim();
  const service = $("proposalService").value;
  const message = `Olá, REDGRAM+! Meu nome é ${name}. Desejo registrar meu aceite da proposta de interesse para: ${service}. Li as informações e estou ciente de que a equipe confirmará disponibilidade, horários e condições. Aguardo contato.`;
  openWhatsApp(message);
});

const chatWindow = $("chatWindow");
$("chatLauncher").addEventListener("click", () => { chatWindow.hidden = !chatWindow.hidden; });
$("chatClose").addEventListener("click", () => { chatWindow.hidden = true; });

function addChatMessage(text, who) {
  const node = document.createElement("div");
  node.className = who === "user" ? "user-message" : "bot-message";
  node.textContent = text;
  $("chatMessages").appendChild(node);
  $("chatMessages").scrollTop = $("chatMessages").scrollHeight;
}
function answerFor(question) {
  const q = question.toLowerCase();
  if (q.includes("monitoria") || q.includes("aula") || q.includes("150")) {
    return "A monitoria individual é online, com aula de 50 minutos, 1 dia por semana, por R$ 150,00 mensais. O acompanhamento é direcionado às suas necessidades. Quer se inscrever? Posso encaminhar você para nossa equipe pelo WhatsApp.";
  }
  if (q.includes("correção") || q.includes("redação") || q.includes("30")) {
    return "A correção avulsa custa R$ 30,00 por redação e inclui correção comentada. Para solicitar, fale com a equipe pelo WhatsApp: (98) 98456-0444.";
  }
  if (q.includes("presencial")) {
    return "A REDGRAM+ também pode orientar você sobre a modalidade presencial. A disponibilidade, os horários e os valores presenciais precisam ser confirmados diretamente com a equipe.";
  }
  if (q.includes("inscrição") || q.includes("matrícula") || q.includes("começar")) {
    return "Que bom ter você com a gente! Preencha o formulário de inscrição nesta página ou fale diretamente pelo WhatsApp (98) 98456-0444.";
  }
  if (q.includes("endereço") || q.includes("onde")) {
    return "O endereço informado pela REDGRAM+ é Escola José de Anchieta, Rua Tiradentes, 313, Centro, Pinheiro – MA.";
  }
  if (q.includes("email") || q.includes("e-mail")) {
    return "Você pode escrever para redgramais@gmail.com. Também atendemos pelo WhatsApp (98) 98456-0444.";
  }
  if (q.includes("olá") || q.includes("oi") || q.includes("bom dia")) {
    return "Olá! 😊 Seja bem-vindo(a)! Posso explicar sobre monitoria individual, correção de redação, modalidade presencial ou inscrição. O que você gostaria de saber?";
  }
  return "Obrigado pela mensagem! Para confirmar informações específicas, fale com nossa equipe pelo WhatsApp (98) 98456-0444 ou pelo e-mail redgramais@gmail.com. Será um prazer ajudar!";
}
function sendChat(text) {
  const cleaned = text.trim();
  if (!cleaned) return;
  addChatMessage(cleaned, "user");
  setTimeout(() => addChatMessage(answerFor(cleaned), "bot"), 250);
}
$("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  sendChat($("chatText").value);
  $("chatText").value = "";
});
document.querySelectorAll(".chat-options button").forEach(button => {
  button.addEventListener("click", () => sendChat(button.dataset.question));
});
