const adminUsers = [
  {
    _id: "1",
    firstname: "Kavindu",
    lastname: "Samaraweera",
    email: "kavindu.s@eyepax.com",
    joineddate: "2022-10-23",
  },
  {
    _id: "2",
    firstname: "Bagya",
    lastname: "Kaushallya",
    email: "bagya.k@eyepax.com",
    joineddate: "2022-10-23",
  },
  {
    _id: "3",
    firstname: "Ruzbihan",
    lastname: "Zaleek",
    email: "ruzbihan.z@eyepax.com",
    joineddate: "2022-10-24",
  },
];

export function getAdminUsers() {
  return adminUsers;
}
