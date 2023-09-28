document.addEventListener("DOMContentLoaded", function() {
  const calendarDates = document.getElementById("calendar-dates");
  const currentMonth = document.getElementById("current-month");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const eventList = document.getElementById("event-list");

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonthIndex = currentDate.getMonth();

  prevMonthBtn.addEventListener("click", goToPreviousMonth);
  nextMonthBtn.addEventListener("click", goToNextMonth);

  displayCalendar(currentYear, currentMonthIndex);
  displayUpcomingEvents(currentYear, currentMonthIndex);

  function displayCalendar(year, month) {
    calendarDates.innerHTML = "";

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const weekRow = document.createElement("tr");
    daysOfWeek.forEach(day => {
      const dayCell = document.createElement("th");
      dayCell.innerText = day;
      weekRow.appendChild(dayCell);
    });
    calendarDates.appendChild(weekRow);

    for (let i = 0; i < 6; i++) {
      const weekRow = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        const dayCell = document.createElement("td");

        const currentDate = new Date(year, month, 1 + j - firstDay.getDay() + 7 * i);

        if (
          currentDate.getMonth() === month &&
          currentDate >= firstDay &&
          currentDate <= lastDay
        ) {
          dayCell.innerText = currentDate.getDate();

          if (currentDate.toDateString() === today.toDateString()) {
            dayCell.classList.add("current-date");
          }

          dayCell.addEventListener("click", function() {
            // Handle event when a date is clicked
          });

          const events = getEventsForMonth(year, month);
          const hasEvent = events.some(event => event.date.getDate() === currentDate.getDate());
          if (hasEvent) {
            dayCell.classList.add("event-date");
            const event = events.find(event => event.date.getDate() === currentDate.getDate());
            dayCell.setAttribute("data-tooltip", event.description);
            dayCell.addEventListener("mouseover", showEventDescription);
            dayCell.addEventListener("mouseout", hideEventDescription);
          }
        }

        weekRow.appendChild(dayCell);
      }

      calendarDates.appendChild(weekRow);
    }

    currentMonth.innerText = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long"
    }).format(firstDay);
  }

  function displayUpcomingEvents(year, month) {
    eventList.innerHTML = "";

    const events = getEventsForMonth(year, month);

    const today = new Date();
    const upcomingEvents = events.filter(event => event.date >= today);

    if (upcomingEvents.length === 0) {
      const noEventsMessage = document.createElement("p");
      noEventsMessage.innerText = "No upcoming events for this month.";
      eventList.appendChild(noEventsMessage);
    } else {
      upcomingEvents.forEach(event => {
        const eventDate = event.date.getDate();
        const eventItem = document.createElement("div");
        eventItem.innerHTML = `<strong>${eventDate}</strong> - ${event.title}`;
        eventList.appendChild(eventItem);
      });
    }
  }

  function goToPreviousMonth() {
    currentMonthIndex--;
    if (currentMonthIndex < 0) {
      currentYear--;
      currentMonthIndex = 11;
    }
    displayCalendar(currentYear, currentMonthIndex);
    displayUpcomingEvents(currentYear, currentMonthIndex);
  }

  function goToNextMonth() {
    currentMonthIndex++;
    if (currentMonthIndex > 11) {
      currentYear++;
      currentMonthIndex = 0;
    }
    displayCalendar(currentYear, currentMonthIndex);
    displayUpcomingEvents(currentYear, currentMonthIndex);
  }

  function getEventsForMonth(year, month) {
    const events = [      
      {
        date: new Date(2023, 6, 27),
        title: "Parents Day",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        date: new Date(2023, 7, 4),
        title: "Term 2 Closing Day",
        description: "School closes for the holiday."
      },
      {
        date: new Date(2023, 7, 28),
        title: "Term 3 Opening Day",
        description: "School Resumes after the holiday"
      },
      {
        date: new Date(2023, 9, 10),
        title: "Huduma Day",
        description: "National Holiday"
      },
      {
        date: new Date(2023, 9, 20),
        title: "Mashujaa Day",
        description: "National Holiday"
      },
      {
        date: new Date(2023, 11, 12),
        title: "Jamhuri Day",
        description: "National Holiday"
      },
      {
        date: new Date(2023, 11, 25),
        title: "Christmas Day",
        description: "National Holiday"
      },
      {
        date: new Date(2023, 11, 26),
        title: "Boxing Day",
        description: "National Holiday"
      }
     
    ];

    return events.filter(event => event.date.getMonth() === month);
  }

  function showEventDescription(event) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerText = event.target.getAttribute("data-tooltip");
    document.body.appendChild(tooltip);
    positionTooltip(event, tooltip);
  }

  function hideEventDescription(event) {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      document.body.removeChild(tooltip);
    }
  }

  function positionTooltip(event, tooltip) {
    const tooltipOffset = 10;
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const targetRect = event.target.getBoundingClientRect();
    const targetX = targetRect.x + targetRect.width / 2 - tooltipWidth / 2;
    const targetY = targetRect.y - tooltipHeight - tooltipOffset;
    tooltip.style.left = `${targetX}px`;
    tooltip.style.top = `${targetY}px`;
  }
});
