// ============= TOOL DESCRIPTIONS =============
const toolDescriptions = [
  "ChatGPT av OpenAI er en avansert språkmodell som kan brukes til å svare på spørsmål, skrive tekst, forklare vanskelige temaer og mye mer. Den bruker deep learning for å forstå og generere menneskelig tekst.",
  "DALL-E er et AI-system som kan generere bilder fra tekstbeskrivelser. Den bruker deep learning for å forstå hvordan ord korrelerer med bilder og kan skape helt nye visualiseringer basert på dine instruksjoner.",
  "GitHub Copilot bruker AI til å hjelpe utviklere med kodeskrivning. Den foreslår kodelinjer og hele funksjoner basert på kommentarer og eksisterende kode, noe som øker produktiviteten betydelig.",
  "TensorFlow er et open-source rammeverk fra Google for machine learning. Det gir verktøy for å bygge og trene deep learning-modeller for ulike applikasjoner som bildegjenkjenning og naturlig språkbehandling."
];

function showToolDetail(index) {
  const output = document.getElementById("toolOutput");
  output.textContent = toolDescriptions[index];
  output.style.display = "block";
  
  // Add animation
  output.style.animation = "none";
  setTimeout(() => {
    output.style.animation = "fadeIn 0.5s ease";
  }, 10);
}

// ============= SCROLL ANIMATION =============
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// ============= CARD EXPANSION =============
function expandCard(card) {
  const isExpanded = card.classList.contains("expanded");
  
  // Remove expanded class from all cards
  document.querySelectorAll(".grid-card").forEach(c => {
    c.classList.remove("expanded");
  });
  
  if (!isExpanded) {
    card.classList.add("expanded");
  }
}

// ============= SMOOTH SCROLL =============
function scrollToSection(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ============= CHATBOT FUNCTIONALITY =============
let chatbotOpen = false;

function toggleChatbot() {
  const widget = document.getElementById("chatbotWidget");
  const btn = document.getElementById("floatingChatBtn");
  const toggle = document.getElementById("chatbotToggle");
  
  chatbotOpen = !chatbotOpen;
  
  if (chatbotOpen) {
    widget.classList.remove("hidden");
    btn.style.display = "none";
    toggle.textContent = "−";
  } else {
    widget.classList.add("hidden");
    btn.style.display = "flex";
  }
}

function sendMessage() {
  const input = document.getElementById("chatbotInput");
  const messagesContainer = document.getElementById("chatbotMessages");
  const userMessage = input.value.trim();
  
  if (userMessage === "") return;
  
  // Add user message
  const userMsgElement = document.createElement("div");
  userMsgElement.className = "message user-message";
  userMsgElement.textContent = userMessage;
  messagesContainer.appendChild(userMsgElement);
  
  // Clear input
  input.value = "";
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Simulate bot response with delay
  setTimeout(() => {
    const botResponse = getBotResponse(userMessage.toLowerCase());
    const botMsgElement = document.createElement("div");
    botMsgElement.className = "message bot-message";
    botMsgElement.textContent = botResponse;
    messagesContainer.appendChild(botMsgElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 500);
}

function getBotResponse(message) {
  const responses = {
    "hva er ai": "AI (kunstig intelligens) er teknologi som gjør at maskiner kan lære og ta beslutninger. Den brukes i alt fra chatbots til selvkjørende biler!",
    "hva er machine learning": "Machine Learning er en undergren av AI hvor datamaskiner lærer fra data i stedet for å bli eksplisitt programmert. Det er grunnlaget for mange moderne AI-systemer.",
    "hvordan starter jeg": "Start med å lære grunnleggende AI-konsepter, deretter eksperimen med verktøy som ChatGPT eller TensorFlow. Øvelse gjør mester!",
    "hvilke verktøy anbefaler du": "Det avhenger av ditt mål! For tekstgenerering, prøv ChatGPT. For bildegenerering, bruk DALL-E. For utvikling, prøv GitHub Copilot eller TensorFlow.",
    "chat": "Hei! Jeg er din AI assistant. Jeg kan hjelpe deg med spørsmål om AI. Hva vil du vite?",
    "hei": "Hei! Velkommen til AI Guidebook. Hvordan kan jeg hjelpe deg i dag?",
    "takk": "Gjerne! Hvis du har flere spørsmål, er jeg her for å hjelpe.",
    "default": "Det er et interessant spørsmål! Jeg anbefaler å utforske AI Guidebook for å lære mer. Hva vil du vite mer om?"
  };
  
  for (let key in responses) {
    if (message.includes(key)) {
      return responses[key];
    }
  }
  
  return responses["default"];
}

// ============= MOUSE MOVEMENT EFFECT =============
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero-section");
  if (!hero) return;
  
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  hero.style.background = `linear-gradient(
    ${135 + x * 20}deg, 
    rgba(0, ${150 + y * 50}, 255, 0.1) 0%, 
    rgba(0, ${212 - y * 50}, 255, 0.1) 100%
  )`;
});

// ============= ACCESSIBILITY: COLOR BLIND MODE =============
function toggleColorBlindMode() {
  document.body.classList.toggle("colorblind");
  
  if (document.body.classList.contains("colorblind")) {
    localStorage.setItem("colorblindMode", "on");
  } else {
    localStorage.setItem("colorblindMode", "off");
  }
}

// ============= LOAD COLOR BLIND MODE PREFERENCE =============
window.addEventListener("load", function () {
  if (localStorage.getItem("colorblindMode") === "on") {
    document.body.classList.add("colorblind");
  }
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Hide chatbot widget by default
  const widget = document.getElementById("chatbotWidget");
  widget.classList.add("hidden");
  
  // Allow Enter key to send message
  document.getElementById("chatbotInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});

// ============= ADD HOVER EFFECT TO SECTIONS =============
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach(section => {
    section.addEventListener("mouseenter", function() {
      this.style.borderLeftColor = "#00ffff";
    });
    section.addEventListener("mouseleave", function() {
      this.style.borderLeftColor = "#00d4ff";
    });
  });
});