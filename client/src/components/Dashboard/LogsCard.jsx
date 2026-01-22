import { useEffect, useState, useMemo } from "react";
import useDateTimeOptions from "../../hooks/useDateTimeOptions";
import { getUserAttendance } from "../../api/attendance";
import "../../styles/LogsCard.css";

function LogsCard({ userName = "User", reload }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [logs, setLogs] = useState([]);

  const { timeOptions, toGMT8 } = useDateTimeOptions();

  // Convert schedule times to GMT+8 for display
  const scheduleDisplay = useMemo(() => {
    if (!user?.todaySchedule) return "No schedule today";

    const startGMT8 = toGMT8(user.todaySchedule.startTime);
    const endGMT8 = toGMT8(user.todaySchedule.endTime);

    if (!startGMT8 || !endGMT8) return "No schedule today";

    const startTimeStr = startGMT8.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Manila",
    });

    const endTimeStr = endGMT8.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Manila",
    });

    return `${startTimeStr} - ${endTimeStr}`;
  }, [user?.todaySchedule, toGMT8]);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) return;

      try {
        const res = await getUserAttendance(userId);
        const sortedLogs = res.attendance
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3)
          .map((r) => {
            const ti = toGMT8(r.timeIn);
            const to = toGMT8(r.timeOut);

            return {
              timeIn: ti ? ti.toLocaleTimeString("en-US", timeOptions) : "-",
              timeOut: to ? to.toLocaleTimeString("en-US", timeOptions) : "-",
            };
          });

        setLogs(sortedLogs);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      }
    };

    fetchLogs();
  }, [userId, reload, timeOptions, toGMT8]);

  return (
    <div className="logs-card">
      <div className="logs-card__header">
        <span>{scheduleDisplay}</span>
        <span>{userName}</span>
      </div>
      <div className="logs-card__body">
        <div className="logs-card__title">Logs</div>
        <div className="logs-card__table-container">
          <table className="logs-card__table">
            <thead>
              <tr>
                <th>Time in</th>
                <th>Time out</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.timeIn}</td>
                    <td>{log.timeOut}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No logs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LogsCard;