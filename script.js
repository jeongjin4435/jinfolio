const typingText = document.getElementById('typingText');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const navLinks = document.querySelectorAll('.nav-link');
const navMenu = document.getElementById('navLinks');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const topBtn = document.getElementById('topBtn');
const pageProgress = document.getElementById('pageProgress');
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
const generateIdeaBtn = document.getElementById('generateIdeaBtn');
const goalForm = document.getElementById('goalForm');
const goalInput = document.getElementById('goalInput');
const goalList = document.getElementById('goalList');
const goalPercent = document.getElementById('goalPercent');
const goalProgressBar = document.getElementById('goalProgressBar');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// 타이핑 애니메이션 문장
const typingPhrases = [
  'AI와 스토리텔링을 연결합니다.',
  '데이터와 콘텐츠를 함께 배우고 있습니다.',
  '아이디어를 실제 웹사이트로 구현합니다.',
  '한국과 중국 콘텐츠를 AI로 연결하고 싶습니다.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = typingPhrases[phraseIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingText.textContent = currentPhrase.substring(0, charIndex);

  let speed = isDeleting ? 45 : 80;

  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 1300;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    speed = 350;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

// 다크모드 저장 및 적용
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('jinfolioTheme', theme);
}

const savedTheme = localStorage.getItem('jinfolioTheme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// 모바일 메뉴 열고 닫기
mobileMenuBtn.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  mobileMenuBtn.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  });
});

// 스크롤 진행률, 맨 위 버튼, 현재 섹션 메뉴 활성화
function handleScrollUI() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  pageProgress.style.width = `${progress}%`;

  topBtn.classList.toggle('show', scrollTop > 500);

  const sections = document.querySelectorAll('section[id]');
  let currentId = 'home';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    if (scrollTop >= sectionTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', handleScrollUI);
handleScrollUI();

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 스크롤 등장 애니메이션과 스킬 바 애니메이션
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const percent = entry.target.dataset.percent;
      const bar = entry.target.querySelector('.skill-bar span');
      bar.style.width = `${percent}%`;
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// 프로젝트 데이터
const projects = [
  {
    title: '개인 포트폴리오 웹사이트',
    category: 'web',
    categoryLabel: 'Web',
    desc: '나의 성장 과정과 기술 역량을 보여주는 인터랙티브 포트폴리오 웹사이트입니다.',
    detail: 'HTML, CSS, JavaScript를 사용해 타이핑 애니메이션, 프로젝트 필터, 모달, 다크모드, 목표 저장 기능을 구현했습니다.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages']
  },
  {
    title: '대학생 생활 도우미 웹사이트',
    category: 'web',
    categoryLabel: 'Web',
    desc: '공지, 과제, 일정, 생활 정보를 한곳에서 관리하는 대학생용 웹서비스 기획 프로젝트입니다.',
    detail: '사용자에게 필요한 정보를 카드형 UI로 정리하고, 실제 대학생 생활에 필요한 기능을 중심으로 구성했습니다.',
    tech: ['HTML', 'CSS', 'JavaScript', 'UX Planning']
  },
  {
    title: 'Java 도서 관리 프로그램',
    category: 'java',
    categoryLabel: 'Java',
    desc: '도서 추가, 검색, 대출, 반납 기능을 구현한 Java 콘솔 기반 프로그램입니다.',
    detail: 'ArrayList와 객체 개념을 활용해 도서 데이터를 관리하고, 사용자 입력에 따라 기능이 실행되도록 구성했습니다.',
    tech: ['Java', 'OOP', 'ArrayList']
  },
  {
    title: '데이터 분석 미니 프로젝트',
    category: 'data',
    categoryLabel: 'Data',
    desc: '데이터를 정리하고 간단한 시각화와 해석을 통해 의미를 찾는 학습형 프로젝트입니다.',
    detail: '앞으로 Python과 데이터 분석 라이브러리를 활용해 실제 데이터를 기반으로 인사이트를 도출하는 프로젝트로 확장할 계획입니다.',
    tech: ['Python', 'Data Science', 'Visualization']
  },
  {
    title: 'AI 중국어 콘텐츠 아이디어 기획',
    category: 'ai',
    categoryLabel: 'AI Content',
    desc: 'AI를 활용해 한국과 중국의 일상, 문화, 언어를 연결하는 콘텐츠 기획 프로젝트입니다.',
    detail: '대본 생성, 자막 정리, 번역 보조, 숏폼 스토리보드 제작 등 AI를 콘텐츠 제작 과정에 활용하는 방법을 실험합니다.',
    tech: ['AI Planning', 'Chinese Content', 'Storytelling']
  },
  {
    title: '선거 홍보 영상 기획 경험',
    category: 'design',
    categoryLabel: 'Design',
    desc: '전교회장 선거에서 피켓, 공약 구성, 홍보 방향, 영상 편집을 전반적으로 기획한 경험입니다.',
    detail: '공약이 잘 들리고 기억될 수 있도록 자막, 화면 구성, 메시지 흐름을 신경 써서 제작했고, 콘텐츠 기획력과 실행력을 키울 수 있었습니다.',
    tech: ['Video Editing', 'Visual Design', 'Content Planning']
  }
];

function renderProjects(filter = 'all') {
  const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

  projectGrid.innerHTML = filteredProjects.map((project, index) => `
    <button class="project-card reveal visible" type="button" data-index="${projects.indexOf(project)}" style="transition-delay:${index * 0.05}s">
      <span class="project-tag">${project.categoryLabel}</span>
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <div class="project-tech">
        ${project.tech.map(item => `<span>${item}</span>`).join('')}
      </div>
    </button>
  `).join('');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openProjectModal(Number(card.dataset.index)));
  });
}

renderProjects();

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.filter);
  });
});

// 프로젝트 상세 모달
function openProjectModal(index) {
  const project = projects[index];
  modalCategory.textContent = project.categoryLabel;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalDetail.textContent = project.detail;
  modalTech.innerHTML = project.tech.map(item => `<span>${item}</span>`).join('');
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('show')) closeProjectModal();
});

// AI × China 콘텐츠 아이디어 생성기
const contentIdeas = [
  {
    topic: '한국 대학생의 하루',
    chinese: '韩国大学生的一天',
    meaning: '한국 대학생의 하루',
    format: '브이로그 숏폼',
    ai: '대본 작성, 자막 정리, 썸네일 아이디어, 스토리보드 제작',
    effect: '한국과 중국 시청자가 서로의 일상을 쉽게 이해할 수 있음'
  },
  {
    topic: '한국 편의점 인기 간식 소개',
    chinese: '韩国便利店零食推荐',
    meaning: '한국 편의점 간식 추천',
    format: '리뷰형 숏폼',
    ai: '제품 소개 문장 생성, 중국어 자막 초안, 영상 순서 구성',
    effect: '중국 시청자에게 한국 일상 문화를 재미있게 전달할 수 있음'
  },
  {
    topic: '중국어로 말하는 한국 대학 생활',
    chinese: '用中文介绍韩国大学生活',
    meaning: '중국어로 한국 대학 생활 소개하기',
    format: '정보 전달형 릴스',
    ai: '중국어 표현 보정, 발음 연습 문장 생성, 자막 번역',
    effect: '중국어 학습과 콘텐츠 제작을 동시에 연습할 수 있음'
  },
  {
    topic: 'AI로 만드는 한중 문화 비교 콘텐츠',
    chinese: '用AI比较中韩文化',
    meaning: 'AI로 한중 문화 비교하기',
    format: '카드뉴스 + 영상 혼합형',
    ai: '비교 항목 추천, 자료 정리, 짧은 대본 생성',
    effect: '문화 차이를 쉽고 흥미롭게 설명하는 콘텐츠를 만들 수 있음'
  },
  {
    topic: '중국어 공부 루틴 기록',
    chinese: '我的中文学习计划',
    meaning: '나의 중국어 공부 계획',
    format: '성장 기록형 브이로그',
    ai: '주간 학습 계획, 예문 생성, 복습 퀴즈 제작',
    effect: '학습 과정을 콘텐츠로 남기며 꾸준함을 보여줄 수 있음'
  }
];

function generateContentIdea() {
  const randomIdea = contentIdeas[Math.floor(Math.random() * contentIdeas.length)];
  document.getElementById('ideaTopic').textContent = randomIdea.topic;
  document.getElementById('ideaChinese').textContent = randomIdea.chinese;
  document.getElementById('ideaMeaning').textContent = randomIdea.meaning;
  document.getElementById('ideaFormat').textContent = randomIdea.format;
  document.getElementById('ideaAi').textContent = randomIdea.ai;
  document.getElementById('ideaEffect').textContent = randomIdea.effect;
}

generateIdeaBtn.addEventListener('click', generateContentIdea);

// 성장 목표 localStorage 관리
let goals = JSON.parse(localStorage.getItem('jinfolioGoals')) || [
  { id: crypto.randomUUID(), text: '포트폴리오 웹사이트 GitHub Pages에 배포하기', done: false },
  { id: crypto.randomUUID(), text: 'JavaScript 기능 5개 이상 직접 설명할 수 있게 정리하기', done: false },
  { id: crypto.randomUUID(), text: '중국어 콘텐츠 계정 기획안 작성하기', done: false }
];

function saveGoals() {
  localStorage.setItem('jinfolioGoals', JSON.stringify(goals));
}

function renderGoals() {
  goalList.innerHTML = goals.map(goal => `
    <li class="goal-item ${goal.done ? 'completed' : ''}">
      <label class="goal-left">
        <input type="checkbox" data-id="${goal.id}" ${goal.done ? 'checked' : ''} />
        <span class="goal-text">${goal.text}</span>
      </label>
      <button class="goal-delete" type="button" data-id="${goal.id}" aria-label="목표 삭제">×</button>
    </li>
  `).join('');

  updateGoalProgress();

  goalList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      goals = goals.map(goal => goal.id === checkbox.dataset.id ? { ...goal, done: checkbox.checked } : goal);
      saveGoals();
      renderGoals();
    });
  });

  goalList.querySelectorAll('.goal-delete').forEach(button => {
    button.addEventListener('click', () => {
      goals = goals.filter(goal => goal.id !== button.dataset.id);
      saveGoals();
      renderGoals();
    });
  });
}

function updateGoalProgress() {
  const total = goals.length;
  const completed = goals.filter(goal => goal.done).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  goalPercent.textContent = `${percent}%`;
  goalProgressBar.style.width = `${percent}%`;
}

goalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = goalInput.value.trim();

  if (!text) {
    goalInput.focus();
    return;
  }

  goals.unshift({ id: crypto.randomUUID(), text, done: false });
  goalInput.value = '';
  saveGoals();
  renderGoals();
});

renderGoals();

// 연락 폼 유효성 검사
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  formMessage.className = 'form-message';

  if (!name || !email || !message) {
    formMessage.textContent = '이름, 이메일, 메시지를 모두 입력해주세요.';
    formMessage.classList.add('error');
    return;
  }

  if (!isValidEmail(email)) {
    formMessage.textContent = '이메일 형식을 다시 확인해주세요.';
    formMessage.classList.add('error');
    return;
  }

  formMessage.textContent = '메시지가 성공적으로 작성되었습니다.';
  formMessage.classList.add('success');
  contactForm.reset();
});
