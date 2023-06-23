const stat_url = 'https://cse135kehu.site/api/static'; //static data route
const perf_url = 'https://cse135kehu.site/api/performance'; // performance data route
const act_url = 'https://cse135kehu.site/api/activity'; // activity data route

const generateSessionId = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).slice(2, 12);
  return timestamp + randomString;
};

function sendDataToEndpoint(url, data) {
  try {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Error adding entry:', error);
    return undefined;
  }
}

function areImagesEnabled() {
  var img = new Image();
  img.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
  return img.height > 0;
}

function isCSSAllowed() {
  var testElement = document.createElement('div');

  var computedStyle = window.getComputedStyle(testElement);
  var cssAllowed = computedStyle.getPropertyValue('display') !== 'none';

  return cssAllowed;
}

const sessionId = generateSessionId();

const staticData = {
  userAgent: navigator.userAgent,
  language: navigator.language,
  acceptsCookies: navigator.cookieEnabled,
  allowsJavaScript: true,
  allowsImages: areImagesEnabled(),
  allowsCSS: isCSSAllowed(),
  screenDimensionsWidth: window.screen.width,
  screenDimensionsHeight: window.screen.height,
  windowDimensionsWidth: window.innerWidth,
  windowDimensionsHeight: window.innerHeight,
  networkConnectionType: navigator.connection ? navigator.connection.type : 'unknown'
};

staticData.id = sessionId;

const static_response = sendDataToEndpoint(stat_url, staticData);

static_response.then(data => {
  if (data.ok) {
    console.log('Static Entry added successfully');
  } else {
    console.error('Failed to add entry');
  }
})
  .catch(error => {
    console.error('Error adding entry:', error);
  });

const performanceData = {};

const loadStartTime = performance.now();

window.addEventListener('load', function () {
  const timingObject = performance.getEntriesByType('navigation')[0];
  const endLoadTime = performance.now();
  const pageLoadTime = endLoadTime - loadStartTime;

  // entire timing object
  performanceData.name = timingObject.name;
  performanceData.entryType = timingObject.entryType;
  performanceData.startTime = timingObject.startTime;
  performanceData.duration = timingObject.duration;
  performanceData.initiatorType = timingObject.initiatorType;
  performanceData.nextHopProtocol = timingObject.nextHopProtocol;
  performanceData.renderBlockingStatus = timingObject.renderBlockingStatus;
  performanceData.workerStart = timingObject.workerStart;
  performanceData.redirectStart = timingObject.redirectStart;
  performanceData.redirectEnd = timingObject.redirectEnd;
  performanceData.fetchStart = timingObject.fetchStart;
  performanceData.domainLookupStart = timingObject.domainLookupStart;
  performanceData.domainLookupEnd = timingObject.domainLookupEnd;
  performanceData.connectStart = timingObject.connectStart;
  performanceData.secureConnectionStart = timingObject.secureConnectionStart;
  performanceData.connectEnd = timingObject.connectEnd;
  performanceData.requestStart = timingObject.requestStart;
  performanceData.responseStart = timingObject.responseStart;
  performanceData.responseEnd = timingObject.responseEnd;
  performanceData.transferSize = timingObject.transferSize;
  performanceData.encodedBodySize = timingObject.encodedBodySize;
  performanceData.decodedBodySize = timingObject.decodedBodySize;
  performanceData.responseStatus = timingObject.responseStatus;
  performanceData.unloadEventStart = timingObject.unloadEventStart;
  performanceData.unloadEventEnd = timingObject.unloadEventEnd;
  performanceData.domInteractive = timingObject.domInteractive;
  performanceData.domContentLoadedEventStart = timingObject.domContentLoadedEventStart;
  performanceData.domContentLoadedEventEnd = timingObject.domContentLoadedEventEnd;
  performanceData.domComplete = timingObject.domComplete;
  performanceData.loadEventStart = timingObject.loadEventStart;
  performanceData.loadEventEnd = timingObject.loadEventEnd;
  performanceData.type = timingObject.type;
  performanceData.redirectCount = timingObject.redirectCount;
  performanceData.activationStart = timingObject.activationStart;
  performanceData.loadStartTime = loadStartTime;
  performanceData.loadEventEnd = endLoadTime;
  performanceData.pageLoadTime = pageLoadTime;
  performanceData.id = sessionId;

  const perfomance_response = sendDataToEndpoint(perf_url, performanceData);

  perfomance_response.then(data => {
    if (data.ok) {
      console.log('Performance Entry added successfully');
    } else {
      console.error('Failed to add entry');
    }
  })
    .catch(error => {
      console.error('Error adding entry:', error);
    });
});

var activityData = {
  id: sessionId,
  error: null,
  mouseX: null,
  mouseY: null,
  mouseButton: null,
  mouseScrollX: null,
  mouseScrollY: null,
  keyType: null,
  keyEvent: null,
  keyCode: null,
  shiftKey: null,
  ctrlKey: null,
  altKey: null,
  metaKey: null,
  idleStart: null,
  idleEnd: null,
  idleDuration: null,
  enterPageTime: null,
  leavePageTime: null,
  currentPage: window.location.href
};

var lastActivityTime = performance.now();
var idleTimeout = null;

function startIdleTimer() {
  idleTimeout = setTimeout(function () {
    activityData.idleStart = lastActivityTime;
    activityData.idleEnd = performance.now();
    activityData.idleDuration = activityData.idleEnd - activityData.idleStart;
  }, 2000);
}

function endIdleTimer() {
  if (idleTimeout) {
    clearTimeout(idleTimeout);
    idleTimeout = null;
    if (activityData.idleStart) {
      activityData.idleEnd = performance.now();
      activityData.idleDuration = activityData.idleEnd - activityData.idleStart;
    }
  }
}

function handlePageEnter() {
  activityData.enterPageTime = performance.now();
}

function handlePageLeave() {
  activityData.leavePageTime = performance.now();
}

function lastPageLeave() {
  activityData.currentPage = window.location.href;
}

window.onerror = function (message) {
  activityData.error = { message: message };
};

window.addEventListener('mousemove', function (event) {
  activityData.mouseX = event.clientX;
  activityData.mouseY = event.clientY;
  activityData.mouseButton = event.button;
  activityData.mouseScrollX = window.scrollX;
  activityData.mouseScrollY = window.scrollY;
  lastActivityTime = performance.now();
  endIdleTimer();
  startIdleTimer();
});

window.addEventListener('keydown', function (event) {
  activityData.keyType = 'keydown';
  activityData.keyEvent = event.key;
  activityData.keyCode = event.code;
  activityData.shiftKey = event.shiftKey;
  activityData.ctrlKey = event.ctrlKey;
  activityData.altKey = event.altKey;
  activityData.metaKey = event.metaKey;
  lastActivityTime = performance.now();
  endIdleTimer();
  startIdleTimer();
});

window.addEventListener('keyup', function (event) {
  activityData.keyType = 'keyup';
  activityData.keyEvent = event.key;
  activityData.keyCode = event.code;
  activityData.shiftKey = event.shiftKey;
  activityData.ctrlKey = event.ctrlKey;
  activityData.altKey = event.altKey;
  activityData.metaKey = event.metaKey;
  lastActivityTime = performance.now();
  endIdleTimer();
  startIdleTimer();
});

window.addEventListener('DOMContentLoaded', handlePageEnter);

window.addEventListener('beforeunload', function () {
  lastPageLeave();
  handlePageLeave();

  const activity_response = sendDataToEndpoint(act_url, activityData);

  activity_response.then(data => {
    if (data.ok) {
      console.log('Activity Entry added successfully');
    } else {
      console.error('Failed to add entry');
    }
  })
    .catch(error => {
      console.error('Error adding entry:', error);
    });
});

startIdleTimer();

setInterval(function () {
  const activity_response = sendDataToEndpoint(act_url, activityData);

  activity_response.then(data => {
    if (data.ok) {
      console.log('Activity Entry added successfully');
    } else {
      console.error('Failed to add entry');
    }
  })
    .catch(error => {
      console.error('Error adding entry:', error);
    });
}, 5000);
