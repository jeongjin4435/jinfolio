const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const navMenu = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const topBtn = document.getElementById('topBtn');
const typingText = document.getElementById('typingText');

// 다크모드 저장 및 적용
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('jinCodeTheme', theme);
}
applyTheme(localStorage.getItem('jinCodeTheme') || 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

// 모바일 메뉴 열고 닫기
if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// 맨 위로 이동 버튼
function handleTopButton() {
  if (!topBtn) return;
  topBtn.classList.toggle('show', window.scrollY > 420);
}
window.addEventListener('scroll', handleTopButton);
handleTopButton();
if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 스크롤 등장 애니메이션
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 메인 페이지 타이핑 애니메이션
const typingPhrases = [
  '웹 개발과 데이터사이언스를 배우고 있습니다.',
  '기획력과 실행력을 가진 개발자로 성장하고 싶습니다.',
  'AI를 활용한 서비스를 만들어보고 싶습니다.',
  '중국어 콘텐츠 관심을 개발 프로젝트로 확장하고 싶습니다.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeEffect() {
  if (!typingText) return;
  const currentPhrase = typingPhrases[phraseIndex];
  charIndex += isDeleting ? -1 : 1;
  typingText.textContent = currentPhrase.substring(0, charIndex);
  let speed = isDeleting ? 38 : 72;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    speed = 300;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

// 스킬 바 애니메이션
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const percent = entry.target.dataset.percent;
      const bar = entry.target.querySelector('.skill-bar span');
      if (bar) bar.style.width = `${percent}%`;
    }
  });
}, { threshold: 0.35 });
document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// 프로젝트 데이터와 필터링
const projects = [
  {
    title: '개인 개발자 포트폴리오 웹사이트', category: 'web', categoryLabel: 'Web',
    desc: '여러 페이지 구조로 제작한 개인 포트폴리오 웹사이트입니다.',
    detail: 'HTML, CSS, JavaScript를 사용해 다크모드, 반응형 레이아웃, 프로젝트 필터, 모달창, 목표 저장 기능을 구현했습니다. 긴 스크롤형이 아니라 Home, About, Experience, Projects, Roadmap, Contact로 페이지를 분리했습니다.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages']
  },
  {
    title: '크리스마스 웹사이트 제작', category: 'web', categoryLabel: 'Web',
    desc: '친구들과 함께 크리스마스 분위기의 웹사이트를 제작한 경험입니다.',
    detail: '색감, 문구, 화면 구성처럼 사용자가 느끼는 분위기를 고민하며 웹페이지를 만들었습니다. 웹사이트를 직접 꾸미고 구현하는 과정에서 웹 개발에 흥미를 느끼게 된 경험입니다.',
    tech: ['HTML', 'CSS', 'Team Project', 'UI']
  },
  {
    title: '대학생 생활 도우미 웹사이트', category: 'web', categoryLabel: 'Web',
    desc: '대학생에게 필요한 공지, 과제, 일정 정보를 정리하는 웹서비스 기획 프로젝트입니다.',
    detail: '사용자에게 필요한 정보를 카드형 UI로 정리하고, 실제 대학 생활에서 사용할 수 있는 기능을 중심으로 구성했습니다. 앞으로 공지, 과제, 일정 관리 기능을 더 발전시키고 싶습니다.',
    tech: ['HTML', 'CSS', 'JavaScript', 'UX']
  },
  {
    title: 'Java 도서 관리 프로그램', category: 'java', categoryLabel: 'Java',
    desc: '도서 추가, 검색, 대출, 반납 기능을 구현한 Java 콘솔 프로그램입니다.',
    detail: '객체와 ArrayList를 활용해 데이터를 관리하고, 조건문과 반복문으로 사용자 입력에 따라 기능이 실행되도록 구성했습니다.',
    tech: ['Java', 'OOP', 'ArrayList']
  },
  {
    title: '데이터 분석 미니 프로젝트', category: 'data', categoryLabel: 'Data',
    desc: '데이터를 정리하고 해석하는 학습형 프로젝트입니다.',
    detail: 'Python과 데이터 분석 도구를 활용해 실제 데이터를 정리하고 시각화하는 프로젝트로 확장할 계획입니다.',
    tech: ['Python', 'Data Science', 'Visualization']
  },
  {
    title: '2025 창업 아이디어 경진대회', category: 'planning', categoryLabel: 'Planning',
    desc: '팀 프로젝트로 참여해 제가 제안한 아이디어가 1차 합격한 경험입니다.',
    detail: '고려대와 한신대가 주최한 2025 창업 아이디어 경진대회에 참여했습니다. 최종 결과는 참가상이었지만, 제가 낸 아이디어가 1차 합격했다는 점에서 아이디어 기획과 문제 발견 능력을 확인할 수 있었습니다.',
    tech: ['Idea Planning', 'Teamwork', 'Presentation']
  },
  {
    title: 'AI 중국어 콘텐츠 아이디어 기획', category: 'ai', categoryLabel: 'AI',
    desc: 'AI를 활용해 한국과 중국의 언어와 문화를 연결하는 아이디어 프로젝트입니다.',
    detail: '중국어 제목, 한국어 뜻, 대본, 자막, 스토리보드 생성 등 AI를 콘텐츠 제작 보조 도구로 활용하는 방향을 기획했습니다. 장기적으로는 AI와 웹 기술을 연결한 서비스로 확장하고 싶습니다.',
    tech: ['AI Planning', 'Chinese', 'Prompt']
  }
]

const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalTech = document.getElementById('modalTech');
const modalDetail = document.getElementById('modalDetail');

function renderProjects(filter = 'all') {
  if (!projectGrid) return;
  projectGrid.innerHTML = '';
  const filtered = filter === 'all' ? projects : projects.filter(project => project.category === filter);

  filtered.forEach(project => {
    const button = document.createElement('button');
    button.className = 'project-card';
    button.type = 'button';
    button.innerHTML = `
      <span class="project-category">${project.categoryLabel}</span>
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <div class="project-tech">${project.tech.map(item => `<span>${item}</span>`).join('')}</div>
    `;
    button.addEventListener('click', () => openProjectModal(project));
    projectGrid.appendChild(button);
  });
}

function openProjectModal(project) {
  if (!modal) return;
  modalCategory.textContent = project.categoryLabel;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalDetail.textContent = project.detail;
  modalTech.innerHTML = project.tech.map(item => `<span>${item}</span>`).join('');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}
function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
}
if (filterButtons.length) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderProjects(button.dataset.filter);
    });
  });
  renderProjects();
}
if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);
window.addEventListener('keydown', event => { if (event.key === 'Escape') closeProjectModal(); });

// AI × China 콘텐츠 아이디어 생성기
const ideas = [
  {
    title: '한국 대학생의 하루', chinese: '韩国大学生的一天', korean: '한국 대학생의 하루',
    details: ['형식: 브이로그 숏폼', 'AI 활용: 대본 작성, 자막 정리, 썸네일 아이디어', '효과: 한국과 중국 시청자가 서로의 일상을 쉽게 이해']
  },
  {
    title: '기숙사 생활 표현 모음', chinese: '宿舍生活常用表达', korean: '기숙사 생활에서 자주 쓰는 표현',
    details: ['형식: 중국어 학습 카드뉴스', 'AI 활용: 예문 생성, 발음 메모, 퀴즈 제작', '효과: 실제 생활 표현 중심 학습']
  },
  {
    title: '한중 대학 문화 비교', chinese: '中韩大学文化比较', korean: '중국과 한국의 대학 문화 비교',
    details: ['형식: 비교형 숏폼', 'AI 활용: 자료 정리, 스크립트 초안, 장면 구성', '효과: 문화 차이를 쉽고 재미있게 전달']
  },
  {
    title: 'AI로 만드는 중국어 자막 실험', chinese: '用AI制作中文字幕', korean: 'AI로 중국어 자막 만들기',
    details: ['형식: 실험형 콘텐츠', 'AI 활용: 번역 보조, 자막 문장 다듬기', '효과: AI 활용 능력과 중국어 관심을 함께 표현']
  }
];
const generateIdeaBtn = document.getElementById('generateIdeaBtn');
const ideaTitle = document.getElementById('ideaTitle');
const ideaChinese = document.getElementById('ideaChinese');
const ideaKorean = document.getElementById('ideaKorean');
const ideaDetails = document.getElementById('ideaDetails');
if (generateIdeaBtn) {
  generateIdeaBtn.addEventListener('click', () => {
    const idea = ideas[Math.floor(Math.random() * ideas.length)];
    ideaTitle.textContent = idea.title;
    ideaChinese.textContent = idea.chinese;
    ideaKorean.textContent = idea.korean;
    ideaDetails.innerHTML = idea.details.map(item => `<li>${item}</li>`).join('');
  });
}

// 성장 목표 localStorage 기능
const goalForm = document.getElementById('goalForm');
const goalInput = document.getElementById('goalInput');
const goalList = document.getElementById('goalList');
const goalPercent = document.getElementById('goalPercent');
const goalProgressBar = document.getElementById('goalProgressBar');
let goals = JSON.parse(localStorage.getItem('jinCodeGoals') || '[]');
function saveGoals() { localStorage.setItem('jinCodeGoals', JSON.stringify(goals)); }
function renderGoals() {
  if (!goalList) return;
  goalList.innerHTML = '';
  goals.forEach(goal => {
    const li = document.createElement('li');
    li.className = `goal-item ${goal.done ? 'done' : ''}`;
    li.innerHTML = `
      <input class="goal-check" type="checkbox" ${goal.done ? 'checked' : ''} aria-label="목표 완료 체크" />
      <span class="goal-text">${goal.text}</span>
      <button class="goal-delete" type="button">삭제</button>
    `;
    li.querySelector('.goal-check').addEventListener('change', () => {
      goal.done = !goal.done;
      saveGoals();
      renderGoals();
    });
    li.querySelector('.goal-delete').addEventListener('click', () => {
      goals = goals.filter(item => item.id !== goal.id);
      saveGoals();
      renderGoals();
    });
    goalList.appendChild(li);
  });
  const doneCount = goals.filter(goal => goal.done).length;
  const percent = goals.length ? Math.round((doneCount / goals.length) * 100) : 0;
  if (goalPercent) goalPercent.textContent = `${percent}%`;
  if (goalProgressBar) goalProgressBar.style.width = `${percent}%`;
}
if (goalForm) {
  goalForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = goalInput.value.trim();
    if (!text) return;
    goals.push({ id: Date.now(), text, done: false });
    goalInput.value = '';
    saveGoals();
    renderGoals();
  });
  renderGoals();
}

// Contact 폼 유효성 검사
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    formMessage.className = 'form-message';
    if (!name || !email || !message) {
      formMessage.textContent = '모든 항목을 입력해 주세요.';
      formMessage.classList.add('error');
      return;
    }
    if (!isValidEmail(email)) {
      formMessage.textContent = '이메일 형식을 확인해 주세요.';
      formMessage.classList.add('error');
      return;
    }
    formMessage.textContent = '메시지가 성공적으로 작성되었습니다.';
    formMessage.classList.add('success');
    contactForm.reset();
  });
}
