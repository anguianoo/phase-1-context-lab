/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//   const eligibleDates = this.timeInEvents.map(function (e) {
//     return e.date;
//   });

//   const payable = eligibleDates.reduce(
//     function (memo, d) {
//       return memo + wagesEarnedOnDate.call(this, d);
//     }.bind(this),
//     0
//   ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

//   return payable;
// };

// Your code here
function createEmployeeRecord(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payRate: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeData) {
  return employeeData.map((row) => {
    return createEmployeeRecord(row);
  });
}

let createTimeInEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

let createTimeOutEvent = function (dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

let hoursWorkedOnDate = function (soughtDate) {
  let inEvent = this.timeInEvents.find((e) => {
    return e.date === soughtDate;
  });

  let outEvent = this.timeOutEvents.find((e) => {
    return e.date === soughtDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

let wagesEarnedOnDate = function (dateSought) {
  let rawWage = hoursWorkedOnDate(dateSought) * this.payPerHour;
  return parseFloat(rawWage.toString());
};

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map((e) => {
    return e.date;
  });

  let payable = eligibleDates.reduce((memo, d) => {
    return memo + wagesEarnedOnDate(this, d);
  }, 0);

  return payable;
};

let findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((rec) => {
    return rec.firstName === firstName;
  });
};

let calculatePayroll = function (arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce((memo, rec) => {
    return memo + allWagesFor(rec);
  }, 0);
};
