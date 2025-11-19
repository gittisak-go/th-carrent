export function getDaysCountFromDateRange(dateRange: string)
{
    // Split the date range string to get the start and end dates
    const [startDateStr, endDateStr] = dateRange.split(' - ');

    // Parse the dates
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    // Calculate the difference in time (in milliseconds)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

    // Convert time difference from milliseconds to days
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}