import { ceo } from "./Employee";

interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}

interface IEmployeeOrgApp {
  ceo: Employee;
}

class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  employeeIdx: unknown;
  oldSupervisor: unknown;
  newSupervisorIdx: unknown;
  newEmployeeIdx: unknown;

  constructor(ceo: Employee) {
    this.ceo = ceo;
  }

  findEmployee(employee: Employee, requiredId: number) {
    return employee.subordinates.find(
      (employee) => employee.uniqueId === requiredId
    );
  }

  findIndexEmployee(employee: Employee, requiredId: number) {
    return employee.subordinates.findIndex(
      (employee) => employee.uniqueId === requiredId
    );
  }

  undoOperation(employee: Employee, subordinate: Employee) {
    let addEmployee = employee.subordinates.push(subordinate);
    return addEmployee;
  }

  moveOperation(employee: Employee, employeeID: number, supervisor?: Employee) {
    if (employee) {
      if (employee.subordinates.length > 0) {
        let element = this.findEmployee(employee, employeeID);

        let elementIdx = this.findIndexEmployee(employee, employeeID);
        if (element) {
          let removeElement = element.subordinates.splice(0);

          // add remove element to
          removeElement.forEach((element) =>
            employee?.subordinates.push(element)
          );

          employee.subordinates.splice(elementIdx, 1);
          supervisor?.subordinates.push(element);
          if (supervisor) {
            this.newEmployeeIdx = this.findEmployee(supervisor, employeeID);
          }

          return;
        } else {
          const employeeLength = employee.subordinates.length;

          for (let x = 0; x < employeeLength; x++) {
            let employee_Sub = employee.subordinates[x];

            if (employee_Sub) {
              if (employee_Sub.subordinates.length > 0) {
                let _element = this.findEmployee(employee_Sub, employeeID);

                let _elementIdx = this.findIndexEmployee(
                  employee_Sub,
                  employeeID
                );

                if (_element) {
                  let removeElement = _element.subordinates.splice(0);

                  // add removed element to
                  removeElement.forEach((element) =>
                    employee?.subordinates.push(element)
                  );

                  employee_Sub.subordinates.splice(_elementIdx, 1);
                  supervisor?.subordinates.push(_element);
                  return;
                } else {
                  const employeeSubLength = employee_Sub.subordinates.length;

                  for (let y = 0; y < employeeSubLength; y++) {
                    let employee_sub = employee_Sub.subordinates[y];

                    if (employee_sub) {
                      if (employee_sub.subordinates.length > 0) {
                        let __element = this.findEmployee(
                          employee_sub,
                          employeeID
                        );

                        let __elementIdx = this.findIndexEmployee(
                          employee_sub,
                          employeeID
                        );

                        if (__element) {
                          let removeElement = __element.subordinates.splice(0);

                          // add removed element to
                          removeElement.forEach((element) =>
                            employee?.subordinates.push(element)
                          );

                          employee_sub.subordinates.splice(__elementIdx, 1);
                          supervisor?.subordinates.push(__element);
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
  }

  move(employeeID: number, supervisorID: number): void {
    const orgLength = this.ceo.subordinates.length;

    // Find Employee
    let employee = this.findEmployee(this.ceo, employeeID);
    let employeeIdx = this.findIndexEmployee(this.ceo, employeeID);
    let supervisor = this.findEmployee(this.ceo, supervisorID);
    let supervisorIdx = this.findIndexEmployee(this.ceo, supervisorID);

    if (employee) {
      let removeElement = employee.subordinates.splice(0);

      // add removed element to
      removeElement.forEach((element) => this.ceo?.subordinates.push(element));

      this.ceo.subordinates.splice(employeeIdx, 1);
      supervisor?.subordinates.push(employee);
    } else {
      for (let idx = 0; idx < orgLength; idx++) {
        employee = this.ceo.subordinates[idx];

        this.moveOperation(employee, employeeID, supervisor);

        const employeeSubordinateLength = employee.subordinates.length;

        for (let i = 0; i < employeeSubordinateLength; i++) {
          let employeeSub = employee.subordinates[i];

          this.moveOperation(employeeSub, employeeID, supervisor);
        }
      }
    }

    // console.log(JSON.stringify(this.ceo));
  }

  undo(): void {
    // console.log("UNDO", JSON.stringify(this.ceo));
  }

  redo(): void {}
}

const app = new EmployeeOrgApp(ceo);
app.move(11, 4);
// app.undo();
// app.redo();
