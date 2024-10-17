import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart, Droplet, Percent, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString());
  const [notifications, setNotifications] = useState<{ goal: string; completed: boolean }[]>([]);

  const currentDate = new Date().toLocaleDateString();

  const fetchNotifications = (date: string) => {
    // Simulate fetching notifications based on the selected date
    const sampleNotifications = [
      { goal: 'Drink 2 liters of water', completed: true },
      { goal: 'Walk 8000 steps', completed: false },
      { goal: 'Complete daily exercise', completed: true },
      { goal: 'Meditate for 10 minutes', completed: false },
    ];
    setNotifications(sampleNotifications); // Replace with actual fetch logic
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    fetchNotifications(date);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-3xl font-bold mb-12 mt-8">Patient Dashboard</h1>

      {/* Health Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center">
        <DashboardCard
          title="Heart Rate"
          value="72 bpm"
          icon={<Heart className="text-red-500" size={24} />}
          link="/health-metrics"
        />
        <DashboardCard
          title="SpO2"
          value="98%"
          icon={<Droplet className="text-purple-500" size={24} />}
          link="/health-metrics"
        />
        <DashboardCard
          title="Blood Pressure"
          value="120/80 mmHg"
          icon={<Activity className="text-blue-500" size={24} />}
          link="/health-metrics"
        />
        <DashboardCard
          title="Risk Factor"
          value="15% chance"
          icon={<Percent className="text-red-500" size={24} />}
          link="/health-metrics"
        />
      </div>

      <div className="mt-10" />

      {/* Calendar and Steps/Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <DailyStreakCalendar onDateClick={handleDateClick} />
        <StepsCard steps={8000} goal={8000} date={currentDate} />
        <GoalsCard goalsCompleted={2} goalsTotal={2} date={currentDate} />
      </div>

      {/* Recent Notifications Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full">
        <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
        <div className="overflow-y-auto max-h-48">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className={`flex justify-between items-center mb-4 p-4 rounded-lg ${notification.completed ? 'bg-green-100' : 'bg-red-100'}`}
            >
              <p className="text-lg font-bold">{notification.goal}</p>
              <p className={`text-lg ${notification.completed ? 'text-green-500' : 'text-red-500'}`}>{notification.completed ? 'Completed' : 'Not Completed'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Daily Streak Calendar Component
const DailyStreakCalendar: React.FC<{ onDateClick: (date: string) => void }> = ({ onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(9); // October
  const [currentYear, setCurrentYear] = useState(2024);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  
  // Start day index for October 2024
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">
        <span>{`${currentYear}-${currentMonth + 1}`}</span>
        <div>
          <button onClick={handlePreviousMonth} className="mr-2">
            <ChevronLeft />
          </button>
          <button onClick={handleNextMonth}>
            <ChevronRight />
          </button>
        </div>
      </h3>
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Day indications */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="font-bold">{day}</div>
        ))}
        {/* Empty boxes for days before the start of the month */}
        {[...Array(startDay)].map((_, index) => (
          <div key={index} className="w-8 h-8"></div>
        ))}
        {[...Array(daysInMonth)].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full ${index % 2 === 0 ? ' bg-green-500' : 'bg-red-500'} hover:bg-blue-500 transition cursor-pointer`}
            title={`Date: ${index + 1}`}
            onClick={() => onDateClick(`${currentYear}-${currentMonth + 1}-${index + 1}`)}
          >
            <span className="text-white">{index + 1}</span> {/* Displaying the date number */}
          </div>
        ))}
      </div>
    </div>
  );
};

// Recent Notifications Component
const RecentNotifications: React.FC<{ notifications: { goal: string; completed: boolean }[] }> = ({ notifications }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
      <div className="overflow-y-auto max-h-48">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`flex justify-between items-center mb-4 p-4 rounded-lg ${notification.completed ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <p className="text-lg font-bold">{notification.goal}</p>
            <p className={`text-lg ${notification.completed ? 'text-green-500' : 'text-red-500'}`}>{notification.completed ? 'Completed' : 'Not Completed'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dashboard Card Component
const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode; link: string }> = ({ title, value, icon, link }) => {
  return (
    <Link
      to={link}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </Link>
  );
};

// Steps Card Component
const StepsCard: React.FC<{ steps: number; goal: number; date: string }> = ({ steps, goal, date }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Today's Steps</h3>
      <div className="flex items-center justify-between mb-4">
        <CheckCircle
          className={`text-orange-500 ${animate ? 'animate-fill' : ''}`}
          size={24}
        />
        <p className="text-3xl font-bold">{steps} steps</p>
      </div>
      <div className="flex justify-center items-center mb-2">
        <div className="relative">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="orange"
              strokeWidth="5"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={animate ? '0' : '440'}
              className={animate ? 'animate-fill' : ''}
            />
            <text x="60" y="65" textAnchor="middle" fontSize="18" fill="#000">
              {steps}/{goal}
            </text>
          </svg>
        </div>
      </div>
      <p className="text-md text-gray-600 mt-2">Date: {date}</p>
    </div>
  );
};

// Goals Card Component
const GoalsCard: React.FC<{ goalsCompleted: number; goalsTotal: number; date: string }> = ({ goalsCompleted, goalsTotal, date }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Today's Goals</h3>
      <div className="flex items-center justify-between mb-4">
        <CheckCircle
          className={`text-green-500 ${animate ? 'animate-fill' : ''}`}
          size={24}
        />
        <p className="text-3xl font-bold">{goalsCompleted} goals</p>
      </div>
      <div className="flex justify-center items-center mb-2">
        <div className="relative">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="green"
              strokeWidth="5"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={animate ? '0' : '440'}
              className={animate ? 'animate-fill' : ''}
            />
            <text x="60" y="65" textAnchor="middle" fontSize="18" fill="#000">
              {goalsCompleted}/{goalsTotal}
            </text>
          </svg>
        </div>
      </div>
      <p className="text-md text-gray-600 mt-2">Date: {date}</p>
    </div>
  );
};

export default Dashboard;