//==============================================================================
// ■ Database-Mock (db/mock.js)
//------------------------------------------------------------------------------
//     Generate mock data.
//==============================================================================
const faker = require("faker/locale/en");
//------------------------------------------------------------------------------
const { $save } = require("./file");

//------------------------------------------------------------------------------
// ● Special-"User"
//------------------------------------------------------------------------------
const specialUser = {
  id: "125f9b98-6e4b-4d93-8eb4-c2f5fc0ff624",
  email: "ambratolm@gmail.com",
  password: "$2y$12$ohrqO.nw0fy6EfG6v/2eWeDV5sV1ELAnCUQ28x5UhZgPBL6JymkLa", // amb123pass
  name: "ambratolm",
  description: "Making cool things for cool multimedias",
  avatar:
    "https://3.bp.blogspot.com/-sUrbPwVErNo/Vd3kcH5K6-I/AAAAAAAADRo/9Hy0tFt6jXA/s1600/Guard_ASBP.jpg",
  role: "admin",
  createdAt: "2010-01-01"
};

//------------------------------------------------------------------------------
// ● Generate-"Users"
// ------------------------------------------------------------------------------
function generateUsers(max = 50) {
  if (max <= 0) {
    return [];
  }
  const users = [specialUser];
  for (let i = 1; i < max; i++) {
    users.push({
      id: faker.random.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.internet.userName(),
      description: faker.lorem.words(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.between("2010-01-01", "2020-01-01")
    });
  }
  return users;
}

//------------------------------------------------------------------------------
// ● Generate-"Notes"
//------------------------------------------------------------------------------
function generateNotes(max = 50, { users = [], specialMax = 10 } = {}) {
  if (max <= 0 || users.length === 0) {
    return [];
  }
  if (specialMax < 0) {
    specialMax = 0;
  }
  const notes = [];
  for (let i = 0; i < specialMax; i++) {
    notes.push({
      id: faker.random.uuid(),
      userId: specialUser.id,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.between(
        specialUser.createdAt,
        new Date().toString()
      )
    });
  }
  for (let i = 0; i < max - specialMax; i++) {
    const user = faker.random.arrayElement(users);
    notes.push({
      id: faker.random.uuid(),
      userId: user.id,
      title: faker.random.word(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.between(user.createdAt, new Date().toString())
    });
  }
  return notes;
}

//------------------------------------------------------------------------------
// ● Create-Collections
//------------------------------------------------------------------------------
const users = generateUsers(50);
const notes = generateNotes(100, { users, specialMax: 10 });
(async () => await $save({ users, notes }))();
