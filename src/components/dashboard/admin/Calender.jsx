/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { format, add, sub, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Month");
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", description: "", color: "blue" });

  const handleToday = () => setCurrentDate(new Date());
  const handleNext = () => {
    if (view === "Month") {
      setCurrentDate(add(currentDate, { months: 1 }));
    } else if (view === "Week") {
      setCurrentDate(add(currentDate, { weeks: 1 }));
    } else {
      setCurrentDate(add(currentDate, { days: 1 }));
    }
  };
  const handleBack = () => {
    if (view === "Month") {
      setCurrentDate(sub(currentDate, { months: 1 }));
    } else if (view === "Week") {
      setCurrentDate(sub(currentDate, { weeks: 1 }));
    } else {
      setCurrentDate(sub(currentDate, { days: 1 }));
    }
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setNewEvent({ ...newEvent, start: format(date, "yyyy-MM-dd"), end: format(date, "yyyy-MM-dd") });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEvent({ title: "", start: "", end: "", description: "", color: "green" });
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    closeModal();
  };

  const renderMonthView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className="h-28 relative p-2 border border-gray-200 cursor-pointer"
            onClick={() => openModal(day)}
          >
            <div>{format(day, "dd")}</div>
            {events.map(
              (event) =>
                isSameDay(day, parseISO(event.start)) && (
                  <div
                    key={event.title}
                    className={`absolute inset-0 bg-${event.color}-200 text-${event.color}-800 rounded p-1`}
                  >
                    {event.title}
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="relative h-screen" style={{ height: "calc(-350px + 100vh)" }}>
          <div className="flex justify-between items-center mb-4">
            <span className="flex space-x-2">
              <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={handleToday}>Today</button>
              <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={handleBack}>Back</button>
              <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={handleNext}>Next</button>
            </span>
            <span className="text-xl font-semibold">{format(currentDate, "MMMM yyyy")}</span>
            <span className="flex space-x-2">
              <button type="button" className={`px-4 py-2 ${view === "Month" ? "bg-green-500 text-white" : "bg-gray-200"} rounded hover:bg-gray-300`} onClick={() => setView("Month")}>Month</button>
              <button type="button" className={`px-4 py-2 ${view === "Week" ? "bg-green-500 text-white" : "bg-gray-200"} rounded hover:bg-gray-300`} onClick={() => setView("Week")}>Week</button>
              <button type="button" className={`px-4 py-2 ${view === "Day" ? "bg-green-500 text-white" : "bg-gray-200"} rounded hover:bg-gray-300`} onClick={() => setView("Day")}>Day</button>
              <button type="button" className={`px-4 py-2 ${view === "Agenda" ? "bg-green-500 text-white" : "bg-gray-200"} rounded hover:bg-gray-300`} onClick={() => setView("Agenda")}>Agenda</button>
            </span>
          </div>
          {view === "Month" && renderMonthView()}
          {/* Render Week, Day, and Agenda views similarly */}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add Event
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        To add an event, kindly fill up the title and choose the event color and press the add button.
                      </p>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Event Title</label>
                        <input
                          type="text"
                          name="title"
                          value={newEvent.title}
                          onChange={handleEventChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          type="date"
                          name="start"
                          value={newEvent.start}
                          onChange={handleEventChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          type="date"
                          name="end"
                          value={newEvent.end}
                          onChange={handleEventChange}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Select Event Color</label>
                        <div className="mt-2 flex items-center space-x-3">
                          {["blue", "green","red"].map((color) => (
                            <button
                              key={color}
                              type="button"
                              className={`w-8 h-8 rounded-full bg-${color}-500 ${newEvent.color === color ? "ring-2 ring-offset-2 ring-green-500" : ""}`}
                              onClick={() => setNewEvent({ ...newEvent, color })}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddEvent}
                >
                  Add Event
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
