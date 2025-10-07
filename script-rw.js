document.addEventListener('DOMContentLoaded', () => {
  fetch('questions.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load questions.json');
      return response.json();
    })
    .then(data => {
      displayChapters(data);
    })
    .catch(error => console.error('Error loading questions:', error));
});

function displayChapters(questions) {
  const chaptersDiv = document.getElementById('chapters');
  const chapterMap = {};

  // Nhóm câu hỏi theo chương
  questions.forEach(q => {
    const chapter = q.chuyenDe;
    if (!chapterMap[chapter]) {
      chapterMap[chapter] = [];
    }
    chapterMap[chapter].push(q);
  });

  // Tạo nội dung cho từng chương
  for (let i = 1; i <= 6; i++) {
    const chapterQuestions = chapterMap[i] || [];
    if (chapterQuestions.length > 0) {
      const chapterDiv = document.createElement('div');
      chapterDiv.className = 'chapter';
      chapterDiv.setAttribute('data-chapter', i);

      const chapterTitle = document.createElement('h3');
      chapterTitle.textContent = `Chương ${i}: ${getChapterName(i)}`;
      chapterDiv.appendChild(chapterTitle);

      chapterQuestions.forEach((q, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        const questionTitle = document.createElement('h4');
        // Tách nội dung câu hỏi và xử lý xuống dòng
        const questionLines = q.question.split('<br>').map(line => line.trim());
        questionTitle.innerHTML = `Câu ${index + 1}: ${questionLines.join('<br>')}`;
        resultItem.appendChild(questionTitle);

        // Hiển thị 4 đáp án từ options, đánh dấu đáp án đúng bằng màu xanh
        q.options.forEach((option, optIndex) => {
          const optionPara = document.createElement('p');
          const optionLetter = option.charAt(0);
          if (optionLetter === q.answer) {
            optionPara.classList.add('correct');
          }
          optionPara.textContent = option;
          resultItem.appendChild(optionPara);
        });

        const explanationPara = document.createElement('p');
        explanationPara.className = 'explanation';
        let explanationText = q.explanation.replace(/\\\[/g, '\\(').replace(/\\\]/g, '\\)');
        explanationPara.innerHTML = `Hướng dẫn giải: ${explanationText}`;
        resultItem.appendChild(explanationPara);

        chapterDiv.appendChild(resultItem);
      });

      chaptersDiv.appendChild(chapterDiv);
    }
  }

  // Gọi MathJax để render LaTeX
  if (typeof MathJax !== 'undefined') {
    MathJax.typesetPromise().then(() => {
      console.log('MathJax rendered successfully');
    }).catch(err => console.error('MathJax rendering error:', err));
  }

  filterChapters(); // Áp dụng bộ lọc mặc định
}

function getChapterName(chapter) {
  const chapterNames = {
    1: 'Tốc độ',
    2: 'Âm thanh',
    3: 'Quang học',
    4: 'Từ trường',
  };
  return chapterNames[chapter] || 'Chương không xác định';
}

function filterChapters() {
  const select = document.getElementById('chapterSelect');
  const selectedChapter = select.value;
  const chapters = document.querySelectorAll('.chapter');

  chapters.forEach(chapter => {
    const chapterNum = chapter.getAttribute('data-chapter');
    if (selectedChapter === 'all' || chapterNum === selectedChapter) {
      chapter.style.display = 'block';
    } else {
      chapter.style.display = 'none';
    }
  });
}