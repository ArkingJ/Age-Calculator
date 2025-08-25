# Age Calculator

A modern, responsive age calculator web application that calculates exact age in years, months, and days using the Luxon library.

## Live Demo

- Project page: [https://arkingj.github.io/Age-Calculator/](https://arkingj.github.io/Age-Calculator/)

## Reference

- Project brief on roadmap.sh: [https://roadmap.sh/projects/age-calculator](https://roadmap.sh/projects/age-calculator)

## Features

- **Custom Datepicker**: Beautiful, interactive date picker (no default HTML date input)
- **Precise Age Calculation**: Uses Luxon library for accurate age calculations
- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Real-time Results**: Instant age calculation with detailed breakdown
- **Birthday Information**: Shows days until next birthday and special birthday messages
- **Form Validation**: Ensures valid birth dates and prevents future dates
- **Mobile Responsive**: Works perfectly on all device sizes

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with gradients, shadows, and animations
- **JavaScript (ES6+)**: Object-oriented programming with classes
- **Luxon**: Advanced date/time manipulation library
- **CSS Grid**: Modern layout system for the calendar

## How to Use

1. **Open the Application**: Load `index.html` in any modern web browser
2. **Select Birth Date**: Click on the date input field to open the custom datepicker
3. **Navigate Calendar**: Use the arrow buttons to browse different months/years
4. **Choose Date**: Click on any date to select it
5. **Calculate Age**: Click the "Calculate Age" button to see your exact age
6. **View Results**: See your age in years, months, and days, plus birthday information

## Features Breakdown

### Custom Datepicker
- Month/year navigation with arrow buttons
- Week view with day selection
- Highlights today's date and selected date
- Responsive grid layout
- Smooth animations and hover effects

### Age Calculation
- Precise calculation using Luxon's `diff()` method
- Handles leap years correctly
- Accounts for month length variations
- Real-time updates

### Validation
- Prevents future birth dates
- Ensures date selection before calculation
- User-friendly error messages

### Birthday Information
- Shows days until next birthday
- Special messages for today and tomorrow
- Handles year transitions correctly

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process or dependencies to install

## Project Structure

```
Age-Calculator/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── LICENSE             # License information
```

## Customization

The application is highly customizable:

- **Colors**: Modify CSS custom properties in `style.css`
- **Date Format**: Change date display format in `script.js`
- **Calendar Layout**: Adjust grid and spacing in CSS
- **Animations**: Modify transition durations and effects

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this project.

---

**Note**: This application requires an internet connection to load the Luxon library from CDN. For offline use, download and include the Luxon library locally.
