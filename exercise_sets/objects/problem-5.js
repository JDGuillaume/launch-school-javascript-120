/* eslint-disable max-lines-per-function */
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      return `${this.name} is a ${this.year} year student.`;
    },
    addCourse(course) {
      this.courses.push(course);
    },
    listCourses() {
      return this.courses;
    },
    addNote(code, text) {
      let selectedCourse = this.courses.filter(
        course => course['code'] === code
      )[0];
      if (selectedCourse.hasOwnProperty('note')) {
        selectedCourse.note += '; ' + text;
      } else {
        selectedCourse.note = text;
      }
    },
    updateNote(code, text) {
      let selectedCourse = this.courses.filter(
        course => course['code'] === code
      )[0];
      selectedCourse.note = text;
    },
    viewNotes() {
      return this.courses.forEach(course => {
        if (course.hasOwnProperty('note')) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },
  };
}

function createSchool() {
  return {
    students: [],

    addStudent(name, year) {
      const pupil = createStudent(name, year);

      if (['1st', '2nd', '3rd', '4th', '5th'].includes(pupil.year)) {
        this.students.push(pupil);
      } else {
        console.log(`Invalid Year!`);
      }
    },

    enrollStudent(studentName, course) {
      const selectedStudent = this.students.filter(
        student => student.name === studentName
      )[0];
      selectedStudent.addCourse(course);
    },

    addGrade(studentName, code, grade) {
      const selectedStudent = this.students.filter(
        student => student.name === studentName
      )[0];

      const selectedCourse = selectedStudent.courses.filter(
        course => course.code === code
      )[0];

      selectedCourse.grade = grade;
    },

    getReportCard(studentName) {
      const selectedStudent = this.students.filter(
        student => student.name === studentName
      )[0];

      selectedStudent.courses.forEach(course => {
        if (course.grade) {
          console.log(`${course.name} ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    // eslint-disable-next-line consistent-return
    courseReport(courseName) {
      let scores = {};

      this.students.forEach(student => {
        if (
          student
            .listCourses()
            .map(course => course.name)
            .includes(courseName)
        ) {
          let selectedCourse = student.courses.filter(
            course => course['name'] === courseName
          )[0];

          if (selectedCourse.grade) scores[student.name] = selectedCourse.grade;
        }
      });

      if (Object.keys(scores).length > 0) {
        console.log('');
        console.log(`=${courseName} Grades=`);

        Object.entries(scores).forEach(score =>
          console.log(`${score[0]}: ${score[1]}`)
        );

        console.log('---');

        let courseAverage =
          Object.values(scores).reduce((sum, value) => sum + value, 0) /
          Object.values(scores).length;

        console.log(`Course Average: ${Math.floor(courseAverage)}`);
      } else {
        return undefined;
      }
    },
  };
}

let school = createSchool();

// foo
school.addStudent('foo', '3rd');
school.enrollStudent('foo', {name: 'Math', code: 101, grade: 95});
school.enrollStudent('foo', {name: 'Advanced Math', code: 102, grade: 90});
school.enrollStudent('foo', {name: 'Physics', code: 202});

// bar
school.addStudent('bar', '1st');
school.enrollStudent('bar', {name: 'Math', code: 101, grade: 91});

// qux
school.addStudent('qux', '2nd');
school.enrollStudent('qux', {name: 'Math', code: 101, grade: 93});
school.enrollStudent('qux', {name: 'Advanced Math', code: 102, grade: 90});

school.getReportCard('foo');
school.courseReport('Math');
school.courseReport('Advanced Math');
console.log(school.courseReport('Physics'));
