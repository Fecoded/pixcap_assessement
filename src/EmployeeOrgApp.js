"use strict";
exports.__esModule = true;
var Employee_1 = require("./Employee");
var EmployeeOrgApp = /** @class */ (function () {
    function EmployeeOrgApp(ceo) {
        this.ceo = ceo;
    }
    EmployeeOrgApp.prototype.findEmployee = function (employee, requiredId) {
        return employee.subordinates.find(function (employee) { return employee.uniqueId === requiredId; });
    };
    EmployeeOrgApp.prototype.findIndexEmployee = function (employee, requiredId) {
        return employee.subordinates.findIndex(function (employee) { return employee.uniqueId === requiredId; });
    };
    EmployeeOrgApp.prototype.undoOperation = function (employee, subordinate) {
        var addEmployee = employee.subordinates.push(subordinate);
        return addEmployee;
    };
    EmployeeOrgApp.prototype.moveOperation = function (employee, employeeID, supervisor, supervisorIdx) {
        if (employee) {
            if (employee.subordinates.length > 0) {
                var element = this.findEmployee(employee, employeeID);
                var elementIdx = this.findIndexEmployee(employee, employeeID);
                var result = void 0;
                if (element) {
                    for (var ele = 0; ele < this.ceo.subordinates.length; ele++) {
                        var res = this.ceo.subordinates[ele];
                        if (res.uniqueId === employee.uniqueId) {
                            this.oldSupervisor = res.uniqueId;
                            return;
                        }
                        console.log("result", employee.uniqueId);
                    }
                    // Undo Operation
                    this.employeeIdx = element;
                    this.newSupervisorIdx = supervisor;
                    var removeElement = element.subordinates.splice(0);
                    // add remove element to
                    removeElement.forEach(function (element) {
                        return employee === null || employee === void 0 ? void 0 : employee.subordinates.push(element);
                    });
                    employee.subordinates.splice(elementIdx, 1);
                    supervisor === null || supervisor === void 0 ? void 0 : supervisor.subordinates.push(element);
                    if (supervisor) {
                        this.newEmployeeIdx = this.findEmployee(supervisor, employeeID);
                    }
                    return;
                }
                else {
                    var employeeLength = employee.subordinates.length;
                    for (var x = 0; x < employeeLength; x++) {
                        var employee_Sub = employee.subordinates[x];
                        if (employee_Sub) {
                            if (employee_Sub.subordinates.length > 0) {
                                var _element = this.findEmployee(employee_Sub, employeeID);
                                var _elementIdx = this.findIndexEmployee(employee_Sub, employeeID);
                                if (_element) {
                                    var removeElement = _element.subordinates.splice(0);
                                    // add removed element to
                                    removeElement.forEach(function (element) {
                                        return employee === null || employee === void 0 ? void 0 : employee.subordinates.push(element);
                                    });
                                    employee_Sub.subordinates.splice(_elementIdx, 1);
                                    supervisor === null || supervisor === void 0 ? void 0 : supervisor.subordinates.push(_element);
                                    return;
                                }
                                else {
                                    var employeeSubLength = employee_Sub.subordinates.length;
                                    for (var y = 0; y < employeeSubLength; y++) {
                                        var employee_sub = employee_Sub.subordinates[y];
                                        if (employee_sub) {
                                            if (employee_sub.subordinates.length > 0) {
                                                var __element = this.findEmployee(employee_sub, employeeID);
                                                var __elementIdx = this.findIndexEmployee(employee_sub, employeeID);
                                                if (__element) {
                                                    var removeElement = __element.subordinates.splice(0);
                                                    // add removed element to
                                                    removeElement.forEach(function (element) {
                                                        return employee === null || employee === void 0 ? void 0 : employee.subordinates.push(element);
                                                    });
                                                    employee_sub.subordinates.splice(__elementIdx, 1);
                                                    supervisor === null || supervisor === void 0 ? void 0 : supervisor.subordinates.push(__element);
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    EmployeeOrgApp.prototype.move = function (employeeID, supervisorID) {
        var _this = this;
        var orgLength = this.ceo.subordinates.length;
        // Find Employee
        var employee = this.findEmployee(this.ceo, employeeID);
        var employeeIdx = this.findIndexEmployee(this.ceo, employeeID);
        var supervisor = this.findEmployee(this.ceo, supervisorID);
        var supervisorIdx = this.findIndexEmployee(this.ceo, supervisorID);
        if (employee) {
            var removeElement = employee.subordinates.splice(0);
            // add removed element to
            removeElement.forEach(function (element) { var _a; return (_a = _this.ceo) === null || _a === void 0 ? void 0 : _a.subordinates.push(element); });
            this.ceo.subordinates.splice(employeeIdx, 1);
            supervisor === null || supervisor === void 0 ? void 0 : supervisor.subordinates.push(employee);
        }
        else {
            for (var idx = 0; idx < orgLength; idx++) {
                employee = this.ceo.subordinates[idx];
                this.moveOperation(employee, employeeID, supervisor, supervisorIdx);
                var employeeSubordinateLength = employee.subordinates.length;
                for (var i = 0; i < employeeSubordinateLength; i++) {
                    var employeeSub = employee.subordinates[i];
                    this.moveOperation(employeeSub, employeeID, supervisor, supervisorIdx);
                }
            }
        }
        // console.log(JSON.stringify(this.ceo));
    };
    EmployeeOrgApp.prototype.undo = function () {
        // console.log("UNDO", JSON.stringify(this.ceo));
        var body = {
            employeeIdx: this.employeeIdx,
            newsupervisor: this.newSupervisorIdx,
            oldSupervisor: this.oldSupervisor
        };
        console.log("UNDO", body);
    };
    return EmployeeOrgApp;
}());
var app = new EmployeeOrgApp(Employee_1.ceo);
app.move(11, 4);
app.undo();
