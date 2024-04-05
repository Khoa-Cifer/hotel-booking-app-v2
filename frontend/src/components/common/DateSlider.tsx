import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"
import { useState } from "react"

const DateSlider = ({ onDateChange, onFilterChange }) => {

    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
        key: "selection"
    })

    const handleSelect = (ranges) => {
        setDateRange(ranges.selection)
        onDateChange(ranges.selection.startDate, ranges.selection.endDate)
        onFilterChange(ranges.selection.startDate, ranges.selection.endDate)
    }

    const handleClearFilter = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        })
        onDateChange(null, null)
        onFilterChange(null, null)
    }

    return (
        <div>
            <h5>Filter bookings by date</h5>
            <DateRangePicker className="mb-4" ranges={[dateRange]} onChange={handleSelect}/>
            <button className="btn btn-secondary" onClick={handleClearFilter}>
                Clear Filter
            </button>
        </div>
    )
}

export default DateSlider