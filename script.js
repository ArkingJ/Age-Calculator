// Initialize Luxon DateTime
const { DateTime } = luxon;

class AgeCalculator {
    constructor() {
        this.currentDate = DateTime.now();
        this.selectedDate = null;
        this.currentMonth = this.currentDate.month;
        this.currentYear = this.currentDate.year;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderCalendar();
        this.setupForm();
    }
    
    bindEvents() {
        // Datepicker toggle
        document.getElementById('birthdate').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleDatepicker();
        });
        
        // Navigation buttons
        document.getElementById('prev-month').addEventListener('click', () => {
            this.previousMonth();
        });
        
        document.getElementById('next-month').addEventListener('click', () => {
            this.nextMonth();
        });
        
        // Year selector
        document.querySelector('.year-selector').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleYearDropdown();
        });
        
        // Close datepicker when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.date-input-container') && !e.target.closest('.datepicker')) {
                this.hideDatepicker();
            }
            // Close year dropdown when clicking outside
            if (!e.target.closest('.year-selector') && !e.target.closest('.year-dropdown')) {
                this.hideYearDropdown();
            }
        });
        
        // Form submission
        document.getElementById('age-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateAge();
        });
    }
    
    setupForm() {
        // Set current month and year in header
        this.updateHeader();
        // Populate year dropdown
        this.populateYearDropdown();
    }
    
    toggleDatepicker() {
        const datepicker = document.getElementById('datepicker');
        if (datepicker.classList.contains('show')) {
            this.hideDatepicker();
        } else {
            this.showDatepicker();
        }
    }
    
    showDatepicker() {
        document.getElementById('datepicker').classList.add('show');
    }
    
    hideDatepicker() {
        document.getElementById('datepicker').classList.remove('show');
        this.hideYearDropdown();
    }
    
    toggleYearDropdown() {
        const yearDropdown = document.getElementById('year-dropdown');
        if (yearDropdown.classList.contains('show')) {
            this.hideYearDropdown();
        } else {
            this.showYearDropdown();
        }
    }
    
    showYearDropdown() {
        document.getElementById('year-dropdown').classList.add('show');
    }
    
    hideYearDropdown() {
        document.getElementById('year-dropdown').classList.remove('show');
    }
    
    previousMonth() {
        if (this.currentMonth === 1) {
            this.currentMonth = 12;
            this.currentYear--;
        } else {
            this.currentMonth--;
        }
        this.updateHeader();
        this.renderCalendar();
    }
    
    nextMonth() {
        if (this.currentMonth === 12) {
            this.currentMonth = 1;
            this.currentYear++;
        } else {
            this.currentMonth++;
        }
        this.updateHeader();
        this.renderCalendar();
    }
    
    updateHeader() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        document.getElementById('current-month').textContent = monthNames[this.currentMonth - 1];
        document.querySelector('.year-selector').textContent = this.currentYear;
    }
    
    populateYearDropdown() {
        const yearDropdown = document.getElementById('year-dropdown');
        const yearContent = yearDropdown.querySelector('.year-dropdown-content');
        yearContent.innerHTML = '';
        
        // Generate years from 1900 to current year + 10
        const startYear = 1900;
        const endYear = this.currentDate.year + 10;
        
        for (let year = endYear; year >= startYear; year--) {
            const yearOption = document.createElement('div');
            yearOption.className = 'year-option';
            yearOption.textContent = year;
            
            // Highlight current year
            if (year === this.currentYear) {
                yearOption.classList.add('selected');
            }
            
            yearOption.addEventListener('click', () => {
                this.selectYear(year);
            });
            
            yearContent.appendChild(yearOption);
        }
    }
    
    selectYear(year) {
        this.currentYear = year;
        this.updateHeader();
        this.renderCalendar();
        this.hideYearDropdown();
    }
    
    renderCalendar() {
        const calendarDays = document.getElementById('calendar-days');
        calendarDays.innerHTML = '';
        
        const firstDayOfMonth = DateTime.local(this.currentYear, this.currentMonth, 1);
        const lastDayOfMonth = firstDayOfMonth.endOf('month');
        const startDate = firstDayOfMonth.startOf('week');
        const endDate = lastDayOfMonth.endOf('week');
        
        let currentDate = startDate;
        
        while (currentDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = currentDate.day;
            
            // Capture an immutable reference for this cell to avoid closure issues
            const dateForCell = currentDate;
            
            // Check if this day is from another month
            if (dateForCell.month !== this.currentMonth) {
                dayElement.classList.add('other-month');
            }
            
            // Check if this is today
            if (dateForCell.hasSame(this.currentDate, 'day')) {
                dayElement.classList.add('today');
            }
            
            // Check if this is the selected date
            if (this.selectedDate && dateForCell.hasSame(this.selectedDate, 'day')) {
                dayElement.classList.add('selected');
            }
            
            // Add click event
            dayElement.addEventListener('click', () => {
                this.selectDate(dateForCell);
            });
            
            calendarDays.appendChild(dayElement);
            currentDate = currentDate.plus({ days: 1 });
        }
    }
    
    selectDate(date) {
        this.selectedDate = date;
        this.updateInput();
        this.renderCalendar();
        this.hideDatepicker();
    }
    
    updateInput() {
        if (this.selectedDate) {
            const formattedDate = this.selectedDate.toFormat('MMMM dd, yyyy');
            document.getElementById('birthdate').value = formattedDate;
        }
    }
    
    calculateAge() {
        if (!this.selectedDate) {
            alert('Please select a birth date first.');
            return;
        }
        
        // Validate that birth date is not in the future
        if (this.selectedDate > this.currentDate) {
            alert('Birth date cannot be in the future.');
            return;
        }
        
        // Calculate age using Luxon
        const age = this.currentDate.diff(this.selectedDate, ['years', 'months', 'days']);
        
        // Display results
        document.getElementById('years').textContent = age.years;
        document.getElementById('months').textContent = age.months;
        document.getElementById('days').textContent = age.days;
        
        // Show result container
        document.getElementById('result').style.display = 'block';
        
        // Add birthday info
        this.updateBirthdayInfo();
        
        // Scroll to results
        document.getElementById('result').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    updateBirthdayInfo() {
        const todayStart = this.currentDate.startOf('day');
        const nextBirthday = this.getNextBirthday();
        const diffDaysFloat = nextBirthday.diff(todayStart, 'days').days;
        const daysUntilBirthday = Math.max(0, Math.ceil(diffDaysFloat));
        
        let birthdayText = '';
        if (daysUntilBirthday === 0) {
            birthdayText = "🎉 Happy Birthday! 🎉";
        } else if (daysUntilBirthday === 1) {
            birthdayText = "🎂 Your birthday is tomorrow!";
        } else {
            birthdayText = `🎂 Your next birthday is in ${daysUntilBirthday} days`;
        }
        
        document.getElementById('birthday-info').textContent = birthdayText;
    }
    
    getNextBirthday(nextYear = false) {
        const baseYear = this.currentDate.year; // use today's year, not the calendar's visible year
        let targetYear = nextYear ? baseYear + 1 : baseYear;
        
        let targetMonth = this.selectedDate.month;
        let targetDay = this.selectedDate.day;
        
        // Handle Feb 29 birthdays on non-leap years -> default to Feb 28
        const isLeapDay = (targetMonth === 2 && targetDay === 29);
        const isTargetYearLeap = DateTime.local(targetYear).isInLeapYear;
        if (isLeapDay && !isTargetYearLeap) {
            targetDay = 28;
        }
        
        let nextBirthday = DateTime.local(targetYear, targetMonth, targetDay).startOf('day');
        const todayStart = this.currentDate.startOf('day');
        
        // If the birthday this year has passed, move to next year and re-apply leap handling
        if (!nextYear && nextBirthday < todayStart) {
            targetYear = baseYear + 1;
            const isNextYearLeap = DateTime.local(targetYear).isInLeapYear;
            let adjustedDay = (isLeapDay && !isNextYearLeap) ? 28 : this.selectedDate.day;
            nextBirthday = DateTime.local(targetYear, targetMonth, adjustedDay).startOf('day');
        }
        
        return nextBirthday;
    }
}

// Initialize the age calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AgeCalculator();
});