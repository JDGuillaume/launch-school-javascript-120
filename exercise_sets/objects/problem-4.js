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

let foo = createStudent('Foo', '1st');
console.log(foo.info());
console.log(foo.listCourses());
foo.addCourse({name: 'Math', code: 101});
foo.addCourse({name: 'Advanced Math', code: 102});
console.log(foo.listCourses());
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
foo.updateNote(101, 'Fun course');
foo.viewNotes();
