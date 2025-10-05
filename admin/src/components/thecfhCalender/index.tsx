import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { IPropsThecfhCalender } from "./type";
import styles from "./style.module.css";
import Image from "next/image";
import calendarIcon from "../../assets/images/calender.svg";

// Extend dayjs with plugins
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

/**
 * ThecfhCalender - A simple calendar component for single date or date range selection
 * 
 * Features:
 * - Single date selection mode
 * - Date range selection mode (startDate - endDate)
 * - Direct selection on calendar grid
 * - Visual feedback for selected dates and ranges
 * 
 * @param props IPropsThecfhCalender
 * @returns JSX.Element
 */
export default function ThecfhCalender({
  value,
  valueRange,
  mode = 'single',
  width = "260px",
  className,
  style,
  disabled = false,
  minDate,
  maxDate,
  onChange,
  onRangeChange,
}: IPropsThecfhCalender) {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize selected dates from props
  React.useEffect(() => {
    if (mode === 'single' && value) {
      setSelectedStartDate(value);
      setSelectedEndDate(null);
      // Navigate to the month containing the selected date
      setCurrentMonth(dayjs(value));
    } else if (mode === 'range' && valueRange) {
      setSelectedStartDate(valueRange[0]);
      setSelectedEndDate(valueRange[1]);
      // Navigate to the month containing the start date
      if (valueRange[0]) {
        setCurrentMonth(dayjs(valueRange[0]));
      }
    }
  }, [mode, value, valueRange]);


  const isDateSelected = (date: Dayjs) => {
    if (mode === 'single') {
      return selectedStartDate && dayjs(selectedStartDate).isSame(date, 'day');
    } else {
      if (!selectedStartDate) return false;
      if (!selectedEndDate) {
        return dayjs(selectedStartDate).isSame(date, 'day');
      }
      return date.isBetween(dayjs(selectedStartDate), dayjs(selectedEndDate), 'day', '[]');
    }
  };

  const isDateInRange = (date: Dayjs) => {
    if (mode !== 'range' || !selectedStartDate || !selectedEndDate) return false;
    return date.isBetween(dayjs(selectedStartDate), dayjs(selectedEndDate), 'day', '[]');
  };

  const isStartDate = (date: Dayjs) => {
    return selectedStartDate && dayjs(selectedStartDate).isSame(date, 'day');
  };

  const isEndDate = (date: Dayjs) => {
    return selectedEndDate && dayjs(selectedEndDate).isSame(date, 'day');
  };

  const isToday = (date: Dayjs) => {
    return date.isSame(dayjs(), 'day');
  };

  const isCurrentMonth = (date: Dayjs) => {
    return date.isSame(currentMonth, 'month');
  };

  const isDateDisabled = (date: Dayjs) => {
    if (minDate && date.toDate() < minDate) return true;
    if (maxDate && date.toDate() > maxDate) return true;
    return false;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => 
      direction === 'prev' 
        ? prev.subtract(1, 'month')
        : prev.add(1, 'month')
    );
  };

  const getInputValue = () => {
    if (mode === 'single') {
      return selectedStartDate ? dayjs(selectedStartDate).format('DD/MM/YYYY') : '';
    } else {
      if (selectedStartDate && selectedEndDate) {
        return `${dayjs(selectedStartDate).format('DD/MM/YYYY')} - ${dayjs(selectedEndDate).format('DD/MM/YYYY')}`;
      } else if (selectedStartDate) {
        return dayjs(selectedStartDate).format('DD/MM/YYYY');
      }
      return '';
    }
  };

  const handleInputClick = () => {
    if (!disabled) {
      // If calendar is opening and we have selected dates, navigate to the correct month
      if (!isOpen) {
        if (mode === 'single' && selectedStartDate) {
          setCurrentMonth(dayjs(selectedStartDate));
        } else if (mode === 'range' && selectedStartDate) {
          setCurrentMonth(dayjs(selectedStartDate));
        }
      }
      setIsOpen(!isOpen);
    }
  };

  const handleDateSelect = (date: Dayjs) => {
    const dateObj = date.toDate();
    
    // Check if date is within min/max range
    if (minDate && dateObj < minDate) return;
    if (maxDate && dateObj > maxDate) return;

    if (mode === 'single') {
      setSelectedStartDate(dateObj);
      setSelectedEndDate(null);
      onChange?.(dateObj);
      setIsOpen(false); // Close calendar after selection
    } else if (mode === 'range') {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // Start new selection
        setSelectedStartDate(dateObj);
        setSelectedEndDate(null);
        onRangeChange?.([dateObj, null]);
      } else {
        // Complete the range selection
        if (dateObj < selectedStartDate) {
          // If clicked date is before start date, swap them
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(dateObj);
          onRangeChange?.([dateObj, selectedStartDate]);
        } else {
          setSelectedEndDate(dateObj);
          onRangeChange?.([selectedStartDate, dateObj]);
        }
        setIsOpen(false); // Close calendar after range selection
      }
    }
  };

  const monthDays = React.useMemo(() => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const startOfCalendar = startOfMonth.startOf('week');
    const endOfCalendar = endOfMonth.endOf('week');
    
    const days = [];
    let current = startOfCalendar;
    
    while (current.isSameOrBefore(endOfCalendar)) {
      days.push(current);
      current = current.add(1, 'day');
    }
    
    return days;
  }, [currentMonth]);

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className={`${styles.calendarWrapper} ${className || ""}`}
      style={{
        width,
        ...style,
      }}
    >
      {/* Input Field */}
      <div className={styles.inputContainer}>
        <input
          style={{...style,  width,}}
          type="text"
          value={getInputValue()}
          onClick={handleInputClick}
          readOnly
          disabled={disabled}
          placeholder={mode === 'single' ? 'Select date' : 'Select date range'}
          className={styles.dateInput}
        />
        <Image src={calendarIcon} alt="calendar" onClick={handleInputClick} />
      </div>

      {/* Calendar Popup */}
      {isOpen && (
        <div className={styles.calendarContainer}>
          <div className={styles.calendarHeader}>
            <button
              onClick={() => navigateMonth('prev')}
              disabled={disabled}
              className={styles.navButton}
            >
              ‹
            </button>
            <h3 className={styles.monthYear}>
              {currentMonth.format('MMMM YYYY')}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              disabled={disabled}
              className={styles.navButton}
            >
              ›
            </button>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map((day, index) => (
              <div key={index} className={styles.weekDay}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.calendarGrid}>
            {monthDays.map((date, index) => {
              const isSelected = isDateSelected(date);
              const inRange = isDateInRange(date);
              const isStart = isStartDate(date);
              const isEnd = isEndDate(date);
              const isTodayDate = isToday(date);
              const isCurrentMonthDate = isCurrentMonth(date);
              const isDisabled = isDateDisabled(date);

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={disabled || isDisabled}
                  className={`
                    ${styles.dayButton}
                    ${!isCurrentMonthDate ? styles.otherMonth : ''}
                    ${isSelected ? styles.selected : ''}
                    ${inRange ? styles.inRange : ''}
                    ${isStart ? styles.startDate : ''}
                    ${isEnd ? styles.endDate : ''}
                    ${isTodayDate ? styles.today : ''}
                    ${isDisabled ? styles.disabled : ''}
                  `}
                >
                  {date.date()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}