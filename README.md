# Physics07

A lightweight web-based quiz application designed for practicing Physics Grade 7 topics. Built with HTML, CSS, and JavaScript, it offers a user-friendly interface with random question generation, progress tracking, and detailed explanations. Perfect for students to enhance their physics skills!

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/physics07](https://www.sieu.io.vn/github/physics07)

## ✨ Features

- **Random Question Generation** – Each quiz generates 10 questions with a balanced mix of easy, medium, and hard difficulty levels
- **Progress Tracking** – Displays your score and accuracy percentage in real-time
- **Detailed Explanations** – Every question comes with an explanation to aid learning
- **Topic-Based Selection** – Choose from 4 chapters for focused practice
- **Responsive Design** – Works seamlessly on both desktop and mobile devices
- **Review Mode** – Browse all questions with correct answers highlighted and explanations rendered via MathJax

## 🛠️ Technologies Used

- **HTML5** – Structure of the application
- **CSS3** – Styling with a dark theme and responsive design
- **JavaScript (Vanilla)** – Logic for quiz functionality and dynamic content
- **MathJax** – Rendering of mathematical expressions in explanations
- **JSON** – Question data storage

## 📁 Project Structure

```
physics07/
├── index.html      # Main file for the test practice interface
├── styles.css      # CSS file for styling the test interface
├── script.js       # JavaScript file for test mode functionality
├── review.html     # Main file for the review interface
├── style-rw.css    # CSS file for styling the review interface
├── script-rw.js    # JavaScript file for review mode functionality
├── questions.json  # JSON file containing the question data for both modes
└── README.md       # Project documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/physics07.git
   ```
2. **Navigate to the project folder**
   ```bash
   cd physics07
   ```
   
3. **Run the application with a local server**

⚠️ Important: This project loads data from a JSON file, so you need to use a local development server instead of opening `index.html` directly in your browser to avoid CORS issues.

- **Using VS Code** – Install the "Live Server" extension, right-click on `index.html`, and select "Open with Live Server"
- **Using Python** – Run `python -m http.server` (Python 3) or `python -m SimpleHTTPServer` (Python 2) and open `http://localhost:8000`
- **Using Node.js** – Install `http-server` globally (`npm install -g http-server`) and run `http-server` in the project folder

## 📝 How It Works

### Test Practice Mode

1. **Access via `index.html`** – Open the test practice interface in your browser
2. **Answer questions** – Select one of the multiple-choice options for each question
3. **Receive feedback** – Get immediate feedback on whether your answer is correct
4. **Track your progress** – The score and accuracy percentage are displayed as you go

### Review Mode

1. **Access via `review.html`** – Open the review interface in your browser
2. **Select a chapter** – Use the dropdown menu to choose a chapter (1–4) or view all chapters
3. **Browse questions** – Each question displays:
   - The question text
   - 4 answer options (the correct answer is highlighted in green)
   - A detailed explanation with mathematical formulas rendered via MathJax
4. **Switch chapters** – Change the dropdown selection to review questions from different chapters

**How questions are stored:**

The `questions.json` file contains all question data for both modes, including:

- Question text
- Answer options
- Correct answer
- Chapter number
- Detailed explanation

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is open-source and available under the MIT License.
