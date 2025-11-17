export interface EmployeeResponse_As_Entity {
  employeeId: string;
  name: string;
  email: string;
  roleId: string;
}
export interface EmployeeResponse_C_I {
  employeeId: string;
  name: string;
  email: string;
  role: {
    roleId: string;
    roleType: string;
    shiftType: string;
  };
}
