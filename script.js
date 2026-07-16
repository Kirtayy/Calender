(function () {
  "use strict";

  var EVENTS_KEY = "calendarEvents";
  var LANG_KEY = "calendarLang";

  var translations = {
    tr: {
      months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
      weekdays: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
      today: "Bugün",
      addEvent: "Etkinlik Ekle",
      titleLabel: "Başlık",
      timeLabel: "Saat",
      descriptionLabel: "Açıklama",
      save: "Kaydet",
      cancel: "Vazgeç",
      edit: "Düzenle",
      delete: "Sil",
      noEvents: "Bu güne ait etkinlik yok.",
      locale: "tr-TR"
    },
    en: {
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      today: "Today",
      addEvent: "Add Event",
      titleLabel: "Title",
      timeLabel: "Time",
      descriptionLabel: "Description",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      noEvents: "No events for this day.",
      locale: "en-US"
    },
    de: {
      months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
      weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
      today: "Heute",
      addEvent: "Termin hinzufügen",
      titleLabel: "Titel",
      timeLabel: "Uhrzeit",
      descriptionLabel: "Beschreibung",
      save: "Speichern",
      cancel: "Abbrechen",
      edit: "Bearbeiten",
      delete: "Löschen",
      noEvents: "Keine Termine an diesem Tag.",
      locale: "de-DE"
    }
  };

  var state = {
    lang: loadLang(),
    viewDate: new Date(),
    events: loadEvents(),
    selectedDateKey: null,
    editingEventId: null
  };

  var monthYearLabel = document.getElementById("monthYearLabel");
  var weekdayRow = document.getElementById("weekdayRow");
  var calendarGrid = document.getElementById("calendarGrid");
  var prevMonthBtn = document.getElementById("prevMonthBtn");
  var nextMonthBtn = document.getElementById("nextMonthBtn");
  var todayBtn = document.getElementById("todayBtn");
  var langButtons = document.querySelectorAll(".lang-btn");

  var modalOverlay = document.getElementById("modalOverlay");
  var modalDateLabel = document.getElementById("modalDateLabel");
  var closeModalBtn = document.getElementById("closeModalBtn");
  var eventList = document.getElementById("eventList");
  var addEventBtn = document.getElementById("addEventBtn");
  var eventForm = document.getElementById("eventForm");
  var eventIdInput = document.getElementById("eventId");
  var eventTitleInput = document.getElementById("eventTitle");
  var eventTimeInput = document.getElementById("eventTime");
  var eventDescriptionInput = document.getElementById("eventDescription");
  var cancelFormBtn = document.getElementById("cancelFormBtn");

  function t(key) {
    return translations[state.lang][key];
  }

  function loadLang() {
    var saved = localStorage.getItem(LANG_KEY);
    return saved && translations[saved] ? saved : "tr";
  }

  function loadEvents() {
    try {
      var raw = localStorage.getItem(EVENTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveEvents() {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(state.events));
  }

  function formatDateKey(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function applyLanguage(lang) {
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;

    langButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });

    renderCalendar();

    if (modalOverlay.classList.contains("open") && state.selectedDateKey) {
      renderModalHeader(state.selectedDateKey);
      renderEventList(state.selectedDateKey);
    }
  }

  function renderModalHeader(dateKey) {
    var date = parseDateKey(dateKey);
    modalDateLabel.textContent = date.toLocaleDateString(t("locale"), {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long"
    });
  }

  function parseDateKey(dateKey) {
    var parts = dateKey.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function renderCalendar() {
    var year = state.viewDate.getFullYear();
    var month = state.viewDate.getMonth();

    monthYearLabel.textContent = translations[state.lang].months[month] + " " + year;

    weekdayRow.innerHTML = "";
    translations[state.lang].weekdays.forEach(function (day) {
      var cell = document.createElement("div");
      cell.className = "weekday-cell";
      cell.textContent = day;
      weekdayRow.appendChild(cell);
    });

    calendarGrid.innerHTML = "";

    var firstOfMonth = new Date(year, month, 1);
    var startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first
    var gridStart = new Date(year, month, 1 - startOffset);

    var today = new Date();
    var todayKey = formatDateKey(today);

    for (var i = 0; i < 42; i++) {
      var cellDate = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      var dateKey = formatDateKey(cellDate);
      var isOutside = cellDate.getMonth() !== month;

      var cell = document.createElement("div");
      cell.className = "day-cell" + (isOutside ? " outside" : "") + (dateKey === todayKey ? " today" : "");
      cell.dataset.date = dateKey;

      var numberEl = document.createElement("div");
      numberEl.className = "day-number";
      numberEl.textContent = cellDate.getDate();
      cell.appendChild(numberEl);

      if (state.events[dateKey] && state.events[dateKey].length > 0) {
        var dot = document.createElement("div");
        dot.className = "event-dot";
        cell.appendChild(dot);
      }

      cell.addEventListener("click", function () {
        openDayModal(this.dataset.date);
      });

      calendarGrid.appendChild(cell);
    }
  }

  function openDayModal(dateKey) {
    state.selectedDateKey = dateKey;
    state.editingEventId = null;
    renderModalHeader(dateKey);
    renderEventList(dateKey);
    hideForm();
    modalOverlay.classList.add("open");
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    state.selectedDateKey = null;
    hideForm();
  }

  function renderEventList(dateKey) {
    var events = state.events[dateKey] || [];
    eventList.innerHTML = "";

    if (events.length === 0) {
      var empty = document.createElement("div");
      empty.className = "empty-message";
      empty.textContent = t("noEvents");
      eventList.appendChild(empty);
      return;
    }

    events
      .slice()
      .sort(function (a, b) {
        return (a.time || "").localeCompare(b.time || "");
      })
      .forEach(function (ev) {
        var item = document.createElement("div");
        item.className = "event-item";

        var info = document.createElement("div");
        info.className = "event-info";

        if (ev.time) {
          var timeEl = document.createElement("div");
          timeEl.className = "event-time";
          timeEl.textContent = ev.time;
          info.appendChild(timeEl);
        }

        var titleEl = document.createElement("div");
        titleEl.className = "event-title";
        titleEl.textContent = ev.title;
        info.appendChild(titleEl);

        if (ev.description) {
          var descEl = document.createElement("div");
          descEl.className = "event-description";
          descEl.textContent = ev.description;
          info.appendChild(descEl);
        }

        var actions = document.createElement("div");
        actions.className = "event-actions";

        var editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "edit-btn";
        editBtn.textContent = t("edit");
        editBtn.addEventListener("click", function () {
          showForm(ev);
        });

        var deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = t("delete");
        deleteBtn.addEventListener("click", function () {
          deleteEvent(dateKey, ev.id);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        item.appendChild(info);
        item.appendChild(actions);
        eventList.appendChild(item);
      });
  }

  function showForm(existingEvent) {
    eventForm.classList.remove("hidden");
    addEventBtn.classList.add("hidden");

    if (existingEvent) {
      state.editingEventId = existingEvent.id;
      eventIdInput.value = existingEvent.id;
      eventTitleInput.value = existingEvent.title;
      eventTimeInput.value = existingEvent.time || "";
      eventDescriptionInput.value = existingEvent.description || "";
    } else {
      state.editingEventId = null;
      eventIdInput.value = "";
      eventTitleInput.value = "";
      eventTimeInput.value = "";
      eventDescriptionInput.value = "";
    }

    eventTitleInput.focus();
  }

  function hideForm() {
    eventForm.classList.add("hidden");
    addEventBtn.classList.remove("hidden");
    eventForm.reset();
    state.editingEventId = null;
  }

  function generateId() {
    if (window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  function addEvent(dateKey, data) {
    if (!state.events[dateKey]) {
      state.events[dateKey] = [];
    }
    state.events[dateKey].push({
      id: generateId(),
      title: data.title,
      time: data.time,
      description: data.description
    });
    saveEvents();
  }

  function updateEvent(dateKey, id, data) {
    var events = state.events[dateKey] || [];
    var target = events.find(function (ev) {
      return ev.id === id;
    });
    if (target) {
      target.title = data.title;
      target.time = data.time;
      target.description = data.description;
      saveEvents();
    }
  }

  function deleteEvent(dateKey, id) {
    if (!state.events[dateKey]) return;
    state.events[dateKey] = state.events[dateKey].filter(function (ev) {
      return ev.id !== id;
    });
    if (state.events[dateKey].length === 0) {
      delete state.events[dateKey];
    }
    saveEvents();
    renderEventList(dateKey);
    renderCalendar();
  }

  prevMonthBtn.addEventListener("click", function () {
    state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() - 1, 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", function () {
    state.viewDate = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 1);
    renderCalendar();
  });

  todayBtn.addEventListener("click", function () {
    state.viewDate = new Date();
    renderCalendar();
  });

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLanguage(btn.dataset.lang);
    });
  });

  closeModalBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  addEventBtn.addEventListener("click", function () {
    showForm(null);
  });

  cancelFormBtn.addEventListener("click", function () {
    hideForm();
  });

  eventForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = eventTitleInput.value.trim();
    if (!title) return;

    var data = {
      title: title,
      time: eventTimeInput.value,
      description: eventDescriptionInput.value.trim()
    };

    if (state.editingEventId) {
      updateEvent(state.selectedDateKey, state.editingEventId, data);
    } else {
      addEvent(state.selectedDateKey, data);
    }

    hideForm();
    renderEventList(state.selectedDateKey);
    renderCalendar();
  });

  applyLanguage(state.lang);
})();
