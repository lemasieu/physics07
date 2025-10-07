# Physics07

A lightweight web-based quiz application designed for practicing Physics Grade 7 topics. This project is built using HTML, CSS, and JavaScript, providing a user-friendly interface with features like random question generation, progress tracking, and detailed explanations for each answer.

## Demo
https://xn--msiu-goa8b.vn/github/physics07/

## Features
- Randomly generates 10 questions per quiz with a balanced mix of easy, medium, and hard difficulty levels.
- Tracks user progress and displays the score and accuracy percentage.
- Provides detailed explanations for each question to aid learning.
- Responsive design that works on both desktop and mobile devices.
- Topic-based quiz selection for focused practice.

## Installation
1. **Clone the repository:**
   ```
   git clone https://github.com/lemasieu/physics07.git
   ```
2. **Navigate to the project directory:**
   ```
   cd physics07
   ```
3. **Open the Project**
   - Open `index.html` for the test practice mode or `review.html` for the review mode in a web browser.
   - Ensure an internet connection is available for MathJax to load from its CDN.

## Usage
### Test Practice Mode
- Access via `index.html`.
- Answer questions and receive immediate feedback.
- (Note: Specific features like timer or score depend on `script.js` implementation.)

### Review Mode
- Access via `review.html`.
- Use the dropdown menu to select a chapter (1-4) or view all chapters.
- Each question shows its text, 4 answer options (correct one in green), and an explanation.

## File Structure
- `index.html`: Main file for the test practice interface.
- `styles.css`: CSS file for styling the test interface.
- `script.js`: JavaScript file for test mode functionality.
- `review.html`: Main file for the review interface.
- `style-rw.css`: CSS file for styling the review interface.
- `script-rw.js`: JavaScript file for review mode functionality.
- `questions.json`: JSON file containing the question data for both modes.

## Technologies Used
- **HTML**: Structure of the application.
- **CSS**: Styling with a dark theme and responsive design.
- **JavaScript**: Logic for quiz functionality and dynamic content.

## Contributing
Feel free to fork this repository, submit issues, or create pull requests to improve the project. Suggestions for new features or additional questions are welcome!

## License
This project is open-source and available under the MIT License.

## Contact
For any questions or feedback, please reach out to lemasieu via GitHub.

---

*Note: This project is inspired by the chemistry07 repository but excludes the theory view feature.*
```
