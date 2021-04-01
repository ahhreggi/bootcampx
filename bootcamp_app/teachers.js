const { Pool } = require("pg");

const pool = new Pool({
  user: "ahhreggi",
  password: "123",
  port: "5432",
  host: "localhost",
  database: "bootcampx"
});

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE ${"$1" || "JUL02"}
ORDER BY teacher;
`, values)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  }).catch(err => console.error("query error", err.stack));