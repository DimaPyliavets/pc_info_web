const infoList = document.getElementById("infoList");
const performanceLevel = document.getElementById("performanceLevel");

function displayInfo(label, value) {
  const listItem = document.createElement("li");
  listItem.textContent = `${label}: ${value}`;
  infoList.appendChild(listItem);
}

function determinePerformanceLevel(cores, ram) {
  const numCores = parseInt(cores, 10);
  const numRam = parseFloat(ram);
  if (numCores >= 4 && numRam >= 8) {
    return "High Performance PC";
  } else if (numCores >= 2 && numRam >= 4) {
    return "Medium Performance PC";
  } else {
    return "Low Performance PC";
  }
}

window.onload = function () {
  if (navigator.cpuClass) {
    displayInfo("CPU Model", navigator.cpuClass);
  } else {
    displayInfo("CPU Model", "N/A");
  }
  displayInfo("CPU Cores", navigator.hardwareConcurrency || "N/A");
  if (navigator.gpu) {
    navigator.gpu
      .requestAdapter()
      .then((adapter) => {
        const gpuInfo = adapter.name || "N/A";
        displayInfo("GPU Model", gpuInfo);
        if (adapter.features && adapter.features.memory) {
          const gpuMemory = adapter.features.memory;
          displayInfo("GPU Memory (GB)", `${gpuMemory / (1024 * 1024)} GB`);
        } else {
          displayInfo("GPU Memory", "N/A");
          
        }
      })
      .catch((error) => {
        console.error("Failed to get GPU information:", error);
      });
  } else {
    displayInfo("GPU Model", "//");
    displayInfo("GPU Memory", navigator.gpuMemory);
  }
  displayInfo("RAM (GB)", (navigator.deviceMemory || 0));
  displayInfo(
    "Operating System",
    window.navigator.oscpu || window.navigator.platform
  );
  displayInfo("Browser", window.navigator.userAgent);
  displayInfo(
    "Screen Resolution",
    `${window.innerWidth} x ${window.innerHeight}`
  );
  displayInfo("Language", window.navigator.language);
  displayInfo(
    "Timezone",
    window.Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  displayInfo("IP Address", "Fetching...");
  fetch("https://api64.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      displayInfo("IP Address", data.ip);
    })
    .catch((error) => {
      console.error("Failed to fetch IP address:", error);
    });
  const cpuCores = navigator.hardwareConcurrency || "N/A";
  const ram = (navigator.deviceMemory || 0).toFixed(2);
  const performance = determinePerformanceLevel(cpuCores, ram);
  performanceLevel.textContent = `Performance Level: ${performance}`;
};
