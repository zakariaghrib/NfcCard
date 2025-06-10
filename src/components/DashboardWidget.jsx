function DashboardWidget({ label, value, icon }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] shadow-md rounded-2xl p-4 flex items-center justify-between">
      <div>
        <div className="text-gray-500 dark:text-gray-300 text-sm">{label}</div>
        <div className="text-2xl font-bold text-black dark:text-white">{value}</div>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}

export default DashboardWidget;
