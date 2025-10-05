export interface IPropsThecfhCalender {
    /** The selected date value (for single date mode) */
    value?: Date | null;
    
    /** Selected date range (for range mode) - array of [startDate, endDate] */
    valueRange?: [Date | null, Date | null];
    
    /** Mode of the calendar: 'single' for single date selection, 'range' for date range selection */
    mode?: 'single' | 'range';
    
    /** Width of the calendar component (default: "300px") */
    width?: string;
    
    /** Additional CSS class name for styling */
    className?: string;
    
    /** Inline styles for the component */
    style?: React.CSSProperties;
    
    /** Whether the calendar is disabled (default: false) */
    disabled?: boolean;
    
    /** Date format string (default: "dd/MM/yyyy") - for display purposes */
    format?: string;
    
    /** Minimum selectable date - dates before this will be disabled */
    minDate?: Date;
    
    /** Maximum selectable date - dates after this will be disabled */
    maxDate?: Date;
    
    /** Callback function called when date selection changes (for single date mode) */
    onChange?: (date: Date | null) => void;
    
    /** Callback function called when date range selection changes (for range mode) */
    onRangeChange?: (range: [Date | null, Date | null]) => void;
    
    /** Callback function called when calendar opens (for compatibility) */
    onOpen?: () => void;
    
    /** Callback function called when calendar closes (for compatibility) */
    onClose?: () => void;
}
