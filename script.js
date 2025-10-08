let currentQuestion = 0;
let score = 0;
let answers = [];
let quizQuestions = [];
let selectedTopic = null;
let questions = []; // Sẽ được load từ JSON

// Load questions từ file JSON
document.addEventListener('DOMContentLoaded', () => {
  fetch('questions.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load questions.json');
      return response.json();
    })
    .then(data => {
      questions = data;
      console.log('Questions loaded successfully:', questions.length);
      initializeQuiz();
    })
    .catch(error => console.error('Error loading questions:', error));
});

// Hàm khởi tạo quiz và gắn sự kiện
function initializeQuiz() {
  loadQuiz();
  document.getElementById('submit').addEventListener('click', submitAnswer);
  document.getElementById('next-question').addEventListener('click', nextQuestion);
  
  // Thêm sự kiện cho nút "X" để đóng sidebar
  const closeSidebarBtn = document.querySelector('.close-sidebar');
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        console.log('Sidebar closed by X button on mobile');
      }
    });
  } else {
    console.error('Close sidebar button not found in DOM');
  }

  // Thêm sự kiện cho nút menu, chỉ hoạt động trên di động
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
        console.log('Menu toggle clicked, sidebar active:', sidebar.classList.contains('active'));
      }
    });
  } else {
    console.error('Menu toggle button not found in DOM');
  }

  // Thêm listener để xử lý khi thay đổi kích thước màn hình
  window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
      sidebar.classList.remove('active'); // Đảm bảo sidebar hiển thị trên desktop
    }
  });

  console.log('Page loaded and event listeners attached');
}

function getRandomQuestions(total, easyRatio, mediumRatio, hardRatio) {
  const easyCount = Math.floor(total * easyRatio); // 5
  const mediumCount = Math.floor(total * mediumRatio); // 3
  const hardCount = total - easyCount - mediumCount; // 2
  const easyTracNghiemCount = 2; // 2 câu trắc nghiệm dễ
  const easyTinhToanCount = 3; // 3 câu tính toán dễ

  let filteredQuestions = selectedTopic === 5 
    ? questions 
    : questions.filter(q => q.chuyenDe === selectedTopic);

  const easyTracNghiem = filteredQuestions.filter(q => q.difficulty === 'easy' && q.type === 'tracnghiem');
  const easyTinhToan = filteredQuestions.filter(q => q.difficulty === 'easy' && q.type === 'tinhtoan');
  const mediumQuestions = filteredQuestions.filter(q => q.difficulty === 'medium');
  const hardQuestions = filteredQuestions.filter(q => q.difficulty === 'hard');

  function getRandomItems(array, count) {
    let shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const selected = [
    ...getRandomItems(easyTracNghiem, Math.min(easyTracNghiemCount, easyTracNghiem.length)),
    ...getRandomItems(easyTinhToan, Math.min(easyTinhToanCount, easyTinhToan.length)),
    ...getRandomItems(mediumQuestions, Math.min(mediumCount, mediumQuestions.length)),
    ...getRandomItems(hardQuestions, Math.min(hardCount, hardQuestions.length))
  ].slice(0, total); // Đảm bảo đúng 10 câu

  if (selected.length < total) {
    console.warn(`Chỉ có ${selected.length} câu hỏi, yêu cầu ${total}.`);
  }
  return selected.sort(() => 0.5 - Math.random());
}

function loadQuiz() {
  if (!selectedTopic || questions.length === 0) {
    document.getElementById('quiz').innerHTML = '<p>Vui lòng chọn chủ đề hoặc kiểm tra file questions.json!</p>';
    return;
  }
  quizQuestions = getRandomQuestions(10, 0.5, 0.3, 0.2);
  if (quizQuestions.length === 0) {
    document.getElementById('quiz').innerHTML = '<p>Không đủ câu hỏi cho chủ đề này!</p>';
    return;
  }
  currentQuestion = 0;
  score = 0;
  answers = [];
  updateProgress();
  displayQuestion();
  document.getElementById('quiz').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  document.getElementById('submit').style.display = 'block';
  document.getElementById('next-question').style.display = 'block';
  document.getElementById('submit').disabled = false;
  document.getElementById('next-question').disabled = true;
  document.getElementById('submit').innerText = 'Trả lời';
  console.log('Quiz loaded with', quizQuestions.length, 'questions');
}

function displayQuestion() {
  const quizDiv = document.getElementById('quiz');
  if (currentQuestion >= quizQuestions.length) {
    showResults();
    return;
  }
  const q = quizQuestions[currentQuestion];

  // Tách nội dung câu hỏi và xử lý xuống dòng
  const questionLines = q.question.split('<br>').map(line => line.trim());
  const formattedQuestion = questionLines.join('<br>');

  quizDiv.innerHTML = `
    <div class="question">
      <h3>Câu ${currentQuestion + 1}: ${formattedQuestion}</h3>
      ${q.options.map(opt => `
        <label class="option">
          <input type="radio" name="answer" value="${opt[0]}"> <span class="mathjax-render">${opt}</span>
        </label>
      `).join('')}
    </div>
    <div id="explanation" class="explanation" style="display: none;"></div>
  `;
  document.getElementById('submit').disabled = false;
  document.getElementById('next-question').disabled = true;
  if (typeof MathJax !== 'undefined') MathJax.typesetPromise().then(() => console.log('MathJax rendered for options'));
  console.log(`Displaying question ${currentQuestion + 1}: ${q.question}`);
}

function submitAnswer() {
  console.log('Submit button clicked');
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert('Vui lòng chọn đáp án!');
    return;
  }

  const answer = selected.value; // Lấy ký tự đầu tiên (VD: "A")
  const correct = quizQuestions[currentQuestion].answer; // Đáp án đúng (VD: "A")
  console.log(`Selected answer: ${answer}, Correct answer: ${correct}`);
  const isCorrect = answer === correct;
  answers.push({ selected: answer, isCorrect });
  if (isCorrect) score++;

  document.getElementById('submit').disabled = true;
  document.getElementById('next-question').disabled = false;
  const explanationDiv = document.getElementById('explanation');
  explanationDiv.style.display = 'block';
  explanationDiv.innerHTML = `Hướng dẫn giải: ${quizQuestions[currentQuestion].explanation}`;
  updateProgress(); // Cập nhật ngay lập tức
  if (typeof MathJax !== 'undefined') MathJax.typesetPromise().then(() => console.log('MathJax rendered for explanation'));
  console.log(`Answer submitted - IsCorrect: ${isCorrect}, Score: ${score}, Answers length: ${answers.length}, Current: ${currentQuestion + 1}`);
}

function showResults() {
  document.getElementById('quiz').style.display = 'none';
  document.getElementById('submit').style.display = 'none';
  document.getElementById('next-question').style.display = 'none';
  const resultsDiv = document.getElementById('results');
  resultsDiv.style.display = 'block';
  const accuracy = (score / 10 * 100).toFixed(0);
  resultsDiv.innerHTML = `
    <h2>Kết quả: ${score}/10 (${accuracy}%)</h2>
    ${quizQuestions.map((q, i) => `
      <div class="result-item">
        <h4>Câu ${i + 1}: ${q.question}</h4>
        <p>Đáp án của bạn: ${answers[i].selected} <span class="${answers[i].isCorrect ? 'correct' : 'incorrect'}">(${answers[i].isCorrect ? 'Đúng' : 'Sai'})</span></p>
        <p>Đáp án đúng: ${q.answer}</p>
        <p class="explanation">Hướng dẫn giải: ${q.explanation}</p>
      </div>
    `).join('')}
  `;
  document.getElementById('accuracy').textContent = `${accuracy}%`;
  document.getElementById('score-display').textContent = `${score}/10`;
  if (typeof MathJax !== 'undefined') MathJax.typesetPromise().then(() => console.log('MathJax rendered for results'));
  console.log('Results displayed');
}

function updateProgress() {
  document.getElementById('current-question').textContent = currentQuestion + 1; // Hiển thị số câu (1-based)
  document.getElementById('score-display').textContent = `${score}/10`;
  const accuracy = answers.length > 0 ? (score / answers.length * 100).toFixed(0) : 0;
  document.getElementById('accuracy').textContent = `${accuracy}%`;
  console.log(`Progress updated - Score: ${score}/10, Accuracy: ${accuracy}%, Current: ${currentQuestion + 1}/10`);
}

function nextQuestion() {
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    displayQuestion();
    updateProgress(); // Cập nhật số câu khi chuyển
  } else {
    showResults(); // Hiển thị kết quả khi đạt câu 10
  }
  console.log(`Next question - Current: ${currentQuestion + 1}`);
}

document.querySelectorAll('.topic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedTopic = parseInt(btn.getAttribute('data-topic'));
    currentQuestion = 0; // Reset số câu
    score = 0; // Reset điểm
    answers = []; // Reset đáp án
    document.getElementById('results').style.display = 'none';
    loadQuiz(); // Tải lại quiz với trạng thái mới
    console.log(`Selected topic: ${selectedTopic}, Reset to initial state`);
  });
});
