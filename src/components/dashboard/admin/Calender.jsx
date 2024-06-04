/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  format,
  add,
  sub,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  parseISO,
  isWithinInterval,
} from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Month");
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [assignedUser, setAssignedUser] = useState([]);
  const [addTask, setAddTask] = useState({});
  const [users, setUsers] = useState([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    color: "blue",
  });
  const [assignedTo, setAssignedTo] = useState("");
  const [taskId, setTaskId] = useState("");

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

  const toggleDateSelection = (date) => {
    setSelectedDates((prevSelectedDates) => {
      if (
        prevSelectedDates.some((selectedDate) => isSameDay(selectedDate, date))
      ) {
        return prevSelectedDates.filter(
          (selectedDate) => !isSameDay(selectedDate, date)
        );
      } else {
        return [...prevSelectedDates, date];
      }
    });
  };

  const openModal = () => {
    const sortedSelectedDates = [...selectedDates].sort(
      (a, b) => a.getTime() - b.getTime()
    );
    setNewEvent({
      ...newEvent,
      start: format(sortedSelectedDates[0], "yyyy-MM-dd"),
      end: format(
        sortedSelectedDates[sortedSelectedDates.length - 1],
        "yyyy-MM-dd"
      ),
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      description: "",
      color: "blue",
    });
    setSelectedDates([]);
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // const fetchTaskData = async () => {
  //   const myHeaders = new Headers()
  //   myHeaders.append(
  //     'Authorization',
  //     `Bearer ${localStorage.getItem('access')}`
  //   )

  //   const requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow'
  //   }

  //   await fetch(
  //     'https://wbt-onelogin.onrender.com/api/v1/task/all',
  //     requestOptions
  //   )
  //     .then(async response => {
  //       const data = await response.json()
  //       setTaskinfo(data?.data)
  //     })
  //     .catch(error => console.error(error))
  // }

  const fetchUsers = async () => {
    const myHeaders = new Headers()
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('access')}`
    )

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    // console.log(requestOptions);

    await fetch(
      'https://wbt-onelogin.onrender.com/api/v1/user/all/',
      requestOptions
    )
      .then(async response => {
        const data = await response.json()
        console.log(data)
        setAssignedUser(
          data?.data.map(user => ({ name: user.name, value: user._id }))
        )
      })

      .catch(error => console.error(error))
  }


  const handleAssignTask = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      "authorization",
      `Bearer ${localStorage.getItem("access")}`
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      assignedUser: assignedTo,
      startDate: newEvent.start,
      endDate: newEvent.end,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://wbt-onelogin.onrender.com/api/v1/task/${taskId}/assign/`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        setEvents((prevState) => ({
          ...prevState,
          assign: [...prevState.assign, data.data],
        }));
        alert("Assigned Successfully, waiting for approval");
        closeModal();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = () => {
    handleAssignTask();
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
            className={`h-20 relative p-2 border border-gray-200 cursor-pointer ${
              selectedDates.some((selectedDate) => isSameDay(selectedDate, day))
                ? "bg-blue-100"
                : selectedDates.length > 0 &&
                  selectedDates.some((selectedDate) =>
                    isWithinInterval(day, {
                      start: selectedDates[0],
                      end: selectedDates[selectedDates.length - 1],
                    })
                  )
                ? "bg-blue-50"
                : ""
            }`}
            onClick={() => toggleDateSelection(day)}
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
  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="p-2 border border-gray-200">
            <div className="font-semibold">{format(day, "EEEE, MMM d")}</div>
            {events.map(
              (event) =>
                isSameDay(day, parseISO(event.start)) && (
                  <div
                    key={event.title}
                    className={`bg-${event.color}-200 text-${event.color}-800 rounded p-1 mt-2`}
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

  const renderDayView = () => {
    const day = currentDate;
    return (
      <div className="p-2 border border-gray-200">
        <div className="font-semibold">{format(day, "EEEE, MMM d")}</div>
        {events.map(
          (event) =>
            isSameDay(day, parseISO(event.start)) && (
              <div
                key={event.title}
                className={`bg-${event.color}-200 text-${event.color}-800 rounded p-1 mt-2`}
              >
                {event.title}
              </div>
            )
        )}
      </div>
    );
  };

  const renderAgendaView = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="space-y-4">
        {days.map((day) => (
          <div key={day} className="border-b border-gray-200 pb-2">
            <div className="font-semibold">{format(day, "EEEE, MMM d")}</div>
            {events.map(
              (event) =>
                isSameDay(day, parseISO(event.start)) && (
                  <div
                    key={event.title}
                    className={`bg-${event.color}-200 text-${event.color}-800 rounded p-1 mt-2`}
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
        <div
          className="relative h-screen"
          style={{ height: "calc(-350px + 100vh)" }}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="flex space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleToday}
              >
                Today
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleNext}
              >
                Next
              </button>
            </span>
            <span className="text-xl font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <span className="flex space-x-2">
              <button
                type="button"
                className={`px-4 py-2 ${
                  view === "Month" ? "bg-blue-500 text-white" : "bg-gray-200"
                } rounded hover:bg-gray-300`}
                onClick={() => setView("Month")}
              >
                Month
              </button>
              <button
                type="button"
                className={`px-4 py-2 ${
                  view === "Week" ? "bg-blue-500 text-white" : "bg-gray-200"
                } rounded hover:bg-gray-300`}
                onClick={() => setView("Week")}
              >
                Week
              </button>
              <button
                type="button"
                className={`px-4 py-2 ${
                  view === "Day" ? "bg-blue-500 text-white" : "bg-gray-200"
                } rounded hover:bg-gray-300`}
                onClick={() => setView("Day")}
              >
                Day
              </button>
              <button
                type="button"
                className={`px-4 py-2 ${
                  view === "Agenda" ? "bg-blue-500 text-white" : "bg-gray-200"
                } rounded hover:bg-gray-300`}
                onClick={() => setView("Agenda")}
              >
                Agenda
              </button>
            </span>
          </div>
          {view === "Month" && renderMonthView()}
          {view === "Week" && renderWeekView()}
          {view === "Day" && renderDayView()}
          {view === "Agenda" && renderAgendaView()}
          <div className="mt-4">
            {selectedDates.length > 0 && (
              <div>
               
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                  onClick={openModal}
                >
                  Assign Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-1/2 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Assign Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Start</label>
                <input
                  type="date"
                  name="start"
                  value={newEvent.start}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">End</label>
                <input
                  type="date"
                  name="end"
                  value={newEvent.end}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
              <div>
                <label className="block font-medium">Color</label>
                <select
                  name="color"
                  value={newEvent.color}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                </select>
              </div>
              <div>
                    <label
                      htmlFor='assignedTo'
                      className='block font-bold mb-2'
                    >
                      Assigned To:
                    </label>
                    <select
                      type='text'
                      id='assignedTo'
                      value={addTask.assignedTo}
                      onChange={e =>
                        setAddTask({ ...addTask, assignedTo: e.target.value })
                      }
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded'
                    >
                      <option value=''>Assigned To</option>
                      {users &&
                        users.map((item, index) => (
                          <option value={item?.username} key={index}>
                            {item?.username}
                          </option>
                        ))}
                    </select>
                  </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddEvent}
              >
                Assign
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
