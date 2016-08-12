var Textbook = React.createClass({
  displayName: "Textbook",

  getInitialState: function () {
    return {
      textbook: this.props.textbook,
      editting: false
    };
  },
  remove: function () {
    this.props.onRemove(this.props.index);
  },
  edit: function () {
    this.setState({ editting: true });
  },
  editValue: function () {
    var txtbook = {};
    txtbook.title = this.refs.editTitle.value;
    txtbook.author = this.refs.editAuthor.value;
    this.props.onChange(txtbook, this.props.index);
    this.setState({ editting: false });
  },
  cancelValue: function () {
    this.setState({ editting: false });
  },
  editMode: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        { className: "bg-success" },
        "Textbook ",
        React.createElement(
          "i",
          null,
          this.props.index + 1
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "p",
        null,
        " Title:  ",
        React.createElement("input", { ref: "editTitle", type: "text", defaultValue: this.state.textbook.title }),
        " ",
        React.createElement(
          "i",
          null,
          "editing..."
        )
      ),
      React.createElement(
        "p",
        null,
        " Author: ",
        React.createElement("input", { ref: "editAuthor", type: "text", defaultValue: this.state.textbook.author }),
        " ",
        React.createElement(
          "i",
          null,
          "editing..."
        )
      ),
      React.createElement("div", { className: "btn btn-default btn-warning glyphicon glyphicon-remove remove", onClick: this.cancelValue }),
      React.createElement("div", { className: "btn btn-default btn-success glyphicon glyphicon-saved remove", onClick: this.editValue })
    );
  },
  normalMode: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        { className: "bg-success" },
        "Textbook ",
        React.createElement(
          "i",
          null,
          this.props.index + 1
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "p",
        null,
        " Title:  ",
        React.createElement(
          "i",
          null,
          this.state.textbook.title
        )
      ),
      React.createElement(
        "p",
        null,
        " Author: ",
        React.createElement(
          "i",
          null,
          this.state.textbook.author
        )
      ),
      React.createElement("div", { className: "btn btn-default btn-danger glyphicon glyphicon-trash remove", onClick: this.remove }),
      React.createElement("div", { className: "btn btn-default btn-warning glyphicon glyphicon-pencil remove", onClick: this.edit })
    );
  },
  render: function () {
    if (this.state.editting) {
      return this.editMode();
    } else {
      return this.normalMode();
    }
  }
});

var ListTextBook = React.createClass({
  displayName: "ListTextBook",

  getInitialState: function () {
    return {
      textbooks: this.props.textbooks
    };
  },
  remove: function (i) {
    var arr = this.state.textbooks;
    arr.splice(i, 1);
    this.setState({ textbooks: arr });
  },
  update: function (object, i) {
    var arr = this.state.textbooks;
    arr[i].title = object.title;
    arr[i].author = object.author;
    var id = this.props.id;
    var url = "https://backend.com/course/:id";
    $.put = function (url, data, callback, type) {
      if ($.isFunction(data)) {
        type = type || callback, callback = data, data = {};
      }

      return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: object,
        contentType: type
      });
    };
    // /course/:id

    this.setState({ textbooks: arr });
  },
  eachItem: function (textbook, i) {
    return React.createElement(
      Textbook,
      { key: i,
        index: i,
        textbook: textbook,
        onRemove: this.remove,
        onChange: this.update },
      "TextbookNumber : ",
      i + 1
    );
  },
  add: function (textbook) {
    var newBook = this.refs.addBook.value;
    if (newBook == "") {
      if (typeof textbook == 'undefined') {
        newBook = "Nueva textbook";
      } else {
        newBook = textbook;
      }
    }
    var arr = this.state.textbooks;
    var textbook = {
      title: newBook,
      author: ""
    };
    arr.push(textbook);
    console.log(arr);
    this.setState({ textbooks: arr });
    this.refs.addBook.value = "";
  },
  handleKeyDown: function (e) {
    if (e.charCode === 13) {
      this.add();
    }
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "middleBlock" },
      React.createElement(
        "header",
        null,
        React.createElement(
          "h3",
          null,
          "Textbooks:"
        ),
        React.createElement(
          "i",
          null,
          "Total: ",
          this.state.textbooks.length
        ),
        React.createElement(
          "div",
          { className: "input-group" },
          React.createElement("input", { ref: "addBook", type: "text", className: "form-control", placeholder: "Add TextBook...", onKeyPress: this.handleKeyDown }),
          React.createElement(
            "span",
            { className: "input-group-btn" },
            React.createElement(
              "div",
              { className: "btn btn-default btn-success", onClick: this.add.bind(null, "Nueva comida") },
              " + "
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "blockBooks" },
        this.state.textbooks.map(this.eachItem)
      )
    );
  }
});

var Course = React.createClass({
  displayName: "Course",

  getInitialState: function () {
    return {
      like: Boolean(this.props.like),
      course: this.props.course,
      editing: false
    };
  },
  mensaje: function () {
    var nombre = this.props.name;
    alert("mensaje function" + nombre);
    this.setState({ like: !this.state.like });
  },
  removeObject: function () {
    this.props.onRemove(this.props.index);
  },
  editObject: function () {
    this.setState({ editing: true });
  },
  update: function () {
    var curso = {};
    curso.id = this.refs.edtId.value;
    curso.name = this.refs.edtNombre.value;
    curso.description = this.refs.edtDescription.value;
    this.props.onChange(curso, this.props.index);
    this.setState({ editing: false });
  },
  cancel: function () {
    this.setState({ editing: false });
  },
  editMode: function () {
    return React.createElement(
      "div",
      { className: "centerBlock" },
      React.createElement(
        "h3",
        { className: "bg-success" },
        "Curso ",
        this.state.course.name,
        " "
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          " ID :",
          React.createElement("input", { ref: "edtId", type: "text", defaultValue: this.state.course.id })
        ),
        React.createElement(
          "p",
          null,
          "Nombre :",
          React.createElement("input", { ref: "edtNombre", type: "text", defaultValue: this.state.course.name })
        ),
        React.createElement(
          "p",
          null,
          " Description :",
          React.createElement("input", { ref: "edtDescription", type: "text", defaultValue: this.state.course.description })
        ),
        React.createElement("div", { className: "btn btn-default btn-success glyphicon glyphicon-saved remove", onClick: this.update }),
        React.createElement("div", { className: "btn btn-default btn-warning glyphicon glyphicon-remove remove", onClick: this.cancel }),
        React.createElement(ListTextBook, { textbooks: this.state.course.textbooks, id: this.state.course.id }),
        React.createElement(
          "span",
          { onClick: this.mensaje },
          "Click Here!"
        ),
        React.createElement("br", null),
        React.createElement(
          "span",
          null,
          " Like : ",
          String(this.state.like)
        )
      )
    );
  },
  normalMode: function () {
    return React.createElement(
      "div",
      { className: "centerBlock" },
      React.createElement(
        "h3",
        { className: "bg-success" },
        "Curso ",
        this.state.course.name,
        " "
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          " ID :",
          React.createElement(
            "i",
            null,
            " ",
            this.state.course.id,
            " "
          )
        ),
        React.createElement(
          "p",
          null,
          "Nombre :",
          React.createElement(
            "i",
            null,
            " ",
            this.state.course.name,
            " "
          )
        ),
        React.createElement(
          "p",
          null,
          " Description :",
          React.createElement(
            "i",
            null,
            " ",
            this.state.course.description,
            " "
          )
        ),
        React.createElement("div", { className: "btn btn-default btn-warning glyphicon glyphicon-pencil remove", onClick: this.editObject }),
        React.createElement("div", { className: "btn btn-default btn-danger glyphicon glyphicon-trash remove", onClick: this.removeObject }),
        React.createElement(ListTextBook, { textbooks: this.state.course.textbooks, id: this.state.course.id }),
        React.createElement(
          "span",
          { onClick: this.mensaje },
          "Click Here!"
        ),
        React.createElement("br", null),
        React.createElement(
          "span",
          null,
          " Like : ",
          String(this.state.like)
        )
      )
    );
  },
  render: function () {
    if (this.state.editing) {
      return this.editMode();
    } else {
      return this.normalMode();
    }
  }
});
var ListCourses = React.createClass({
  displayName: "ListCourses",

  getInitialState: function () {
    return {
      courses: [{
        id: "123",
        name: "Introduction to Advertising",
        description: "Learn about advertising",
        textbooks: [{
          author: "Joe Smith",
          title: "Mobile Advertising Fundamentals"
        }, {
          author: "Eli Hinnegan",
          title: "Introduction to Location-Based Advertising"
        }, {
          author: "Edward Bernays",
          title: "Public Relations"
        }]
      }]
    };
  },
  add: function (course) {
    var newCourse = this.refs.newCourse.value;
    if (newCourse == "") {
      if (typeof course == 'undefined') {
        newCourse = "Nueva course";
      } else {
        newCourse = course;
      }
    }
    var arr = this.state.courses;
    var course = {
      id: "100",
      name: newCourse,
      description: newCourse,
      textbooks: []
    };
    arr.push(course);
    console.log(arr);
    this.setState({ courses: arr });
    this.refs.newCourse.value = "";
  },
  removeList: function (i) {
    var arr = this.state.courses;
    arr.splice(i, 1);
    this.setState({ courses: arr });
  },
  editList: function (objeto, i) {
    var arr = this.state.courses;
    arr[i].id = objeto.id;
    arr[i].name = objeto.name;
    arr[i].description = objeto.description;
    this.setState({ courses: arr });
  },
  eachItem: function (course, i) {
    return React.createElement(
      Course,
      { key: i,
        index: i,
        name: course.name,
        id: course.id,
        description: course.description,
        course: course,
        onRemove: this.removeList,
        onChange: this.editList },
      "CourseNumber : ",
      i + 1
    );
  },
  handleKeyDown: function (e) {
    if (e.charCode === 13) {
      this.add();
    }
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "header",
        null,
        React.createElement(
          "h3",
          null,
          "Cursos Activos:"
        ),
        React.createElement(
          "i",
          null,
          "Total: ",
          this.state.courses.length
        )
      ),
      React.createElement(
        "div",
        { className: "input-group" },
        React.createElement("input", { ref: "newCourse", type: "text", className: "form-control", placeholder: "Add Course Name...", onKeyPress: this.handleKeyDown }),
        React.createElement(
          "span",
          { className: "input-group-btn" },
          React.createElement(
            "div",
            { className: "btn btn-default btn-success", onClick: this.add.bind(null, "Nueva comida") },
            " + "
          )
        )
      ),
      React.createElement(
        "div",
        null,
        this.state.courses.map(this.eachItem)
      )
    );
  }
});

var Teacher = React.createClass({
  displayName: "Teacher",

  render: function () {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Hi Teacher!"
      ),
      React.createElement(ListCourses, null)
    );
  }
});

var Pais = React.createClass({
  displayName: "Pais",

  componentWillMount: function () {
    var pais;
    $.getJSON("https://restcountries.eu/rest/v1/all", function (data) {
      for (pais in data) {
        console.log(pais, data[pais].name);
      }
    });
  },
  render: function () {
    return React.createElement(
      "div",
      null,
      "HOLA!"
    );
  }
});

ReactDOM.render(React.createElement(
  "div",
  { className: "centerBlock" },
  React.createElement(Teacher, null),
  React.createElement(Pais, null)
), document.getElementById('demo'));