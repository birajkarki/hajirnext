export const handlePresetClick = (preset, setSelectionRange) => {
  const now = new Date();
  let startDate, endDate;

  switch (preset) {
    case "today":
      startDate = now;
      endDate = now;
      break;
    case "yesterday":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1);
      endDate = new Date(now);
      endDate.setDate(now.getDate() - 1);
      break;
    case "thisWeek":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - now.getDay()); // First day of the current week
      endDate = new Date(now);
      endDate.setDate(startDate.getDate() + 6); // Last day of the current week
      break;
    case "lastWeek":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - now.getDay() - 7); // First day of the last week
      endDate = new Date(now);
      endDate.setDate(startDate.getDate() + 6); // Last day of the last week
      break;
    case "thisMonth":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of the current month
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
      break;
    case "lastMonth":
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); // First day of the last month
      endDate = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the last month
      break;
    case "allMonths":
      startDate = new Date(now.getFullYear(), 0, 1); // First day of the current year
      endDate = new Date(now.getFullYear(), 11, 31); // Last day of the current year
      break;

    default:
      startDate = now;
      endDate = now;
  }

  setSelectionRange({ startDate, endDate, key: "selection" });
};
