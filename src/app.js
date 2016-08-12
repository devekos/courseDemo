var Textbook = React.createClass({
  getInitialState: function() {
    return {
      textbook: this.props.textbook,
      editting :false,
    };
  },
  remove : function () {
    this.props.onRemove(this.props.index)
  },
  edit:  function () {
    this.setState({editting:true});

  },
  editValue: function () {
    var txtbook = {};
    txtbook.title = this.refs.editTitle.value;
    txtbook.author = this.refs.editAuthor.value;
    this.props.onChange(txtbook, this.props.index);
    this.setState({editting:false});
  },
  cancelValue: function() {
    this.setState({editting:false});
  },
  editMode :function() {
    return (
      <div>
        <h3 className="bg-success">Textbook <i>{this.props.index+1}</i></h3>
        <br />
        <p> Title:  <input ref="editTitle" type="text" defaultValue={this.state.textbook.title}/> <i>editing...</i></p>
        <p> Author: <input ref="editAuthor" type="text" defaultValue={this.state.textbook.author}/> <i>editing...</i></p>
        <div className="btn btn-default btn-warning glyphicon glyphicon-remove remove" onClick={this.cancelValue}></div>
        <div className="btn btn-default btn-success glyphicon glyphicon-saved remove" onClick={this.editValue}></div>
      </div>
    );
  },
  normalMode :function() {
    return (
      <div>
        <h3 className="bg-success">Textbook <i>{this.props.index+1}</i></h3>
        <br />
        <p> Title:  <i>{this.state.textbook.title}</i></p>
        <p> Author: <i>{this.state.textbook.author}</i></p>
        <div className="btn btn-default btn-danger glyphicon glyphicon-trash remove" onClick={this.remove}></div>
        <div className="btn btn-default btn-warning glyphicon glyphicon-pencil remove" onClick={this.edit}></div>
      </div>
    );
  },
  render: function() {
    if (this.state.editting) {
      return this.editMode();
    }
    else {
      return this.normalMode();
    }
  }
})

var ListTextBook = React.createClass({
  getInitialState: function() {
    return {
      textbooks: this.props.textbooks
    };
  },
  remove: function(i) {
    var arr = this.state.textbooks;
    arr.splice(i,1);
    this.setState({textbooks : arr});
  },
  update: function(object, i) {
    var arr = this.state.textbooks;
    arr[i].title =object.title;
    arr[i].author =object.author;
    var id = this.props.id;
    var url= "https://backend.com/course/:id";
    $.put = function(url, data, callback, type){
      if ( $.isFunction(data) ){
        type = type || callback,
        callback = data,
        data = {}
      }

      return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: object,
        contentType: type
      });
    }
    // /course/:id

    this.setState({textbooks: arr});
  },
  eachItem: function(textbook, i) {
       return (
               <Textbook key={i}
                   index={i}
                   textbook= {textbook}
                   onRemove={this.remove}
                   onChange={this.update}>
                   TextbookNumber : {i+1}
               </Textbook>
           );
   },
   add: function(textbook) {
       var newBook = this.refs.addBook.value;
       if (newBook == "")
       {
           if(typeof textbook == 'undefined')
           {
               newBook = "Nueva textbook";
           }
           else
           {
               newBook = textbook;
           }
       }
       var arr = this.state.textbooks;
       var textbook = {
         title : newBook,
         author: "",
       }
       arr.push(textbook);
       console.log(arr);
       this.setState({textbooks: arr});
       this.refs.addBook.value = "";
   },
   handleKeyDown: function(e){
        if( e.charCode === 13 ) {
                this.add();
            }
    },
  render: function() {
    return (
      <div className="middleBlock">
        <header>
          <h3>Textbooks:</h3>
          <i>Total: {this.state.textbooks.length}</i>
          <div className="input-group">
            <input ref="addBook" type="text" className="form-control" placeholder="Add TextBook..." onKeyPress={this.handleKeyDown}/>
            <span className="input-group-btn">
              <div className="btn btn-default btn-success" onClick={this.add.bind(null, "Nueva comida")} > + </div>
            </span>
          </div>
        </header>
        <div className="blockBooks">
          {this.state.textbooks.map(this.eachItem)}
        </div>
      </div>
    );
  }
})

var Course = React.createClass({
  getInitialState: function(){
        return {
            like: Boolean(this.props.like),
            course: this.props.course,
            editing: false,
        }
  },
  mensaje: function() {
      var nombre = this.props.name;
      alert("mensaje function"+nombre);
      this.setState({like : !this.state.like})
  },
  removeObject : function () {
    this.props.onRemove(this.props.index);
  },
  editObject:function () {
    this.setState({editing:true});
  },
  update: function() {
    var curso = {};
    curso.id = this.refs.edtId.value;
    curso.name = this.refs.edtNombre.value;
    curso.description = this.refs.edtDescription.value;
    this.props.onChange(curso,this.props.index);
    this.setState({editing:false});
  },
  cancel: function () {
    this.setState({editing:false});
  },
  editMode: function() {
    return(
      <div className="centerBlock">
        <h3 className="bg-success">Curso {this.state.course.name} </h3>
        <div>
          <p> ID :
            <input ref="edtId" type="text" defaultValue={this.state.course.id} />
          </p>
          <p>Nombre :
            <input ref="edtNombre" type="text" defaultValue={this.state.course.name} />
          </p>
          <p> Description :
            <input ref="edtDescription" type="text" defaultValue={this.state.course.description} />
          </p>
          <div className="btn btn-default btn-success glyphicon glyphicon-saved remove" onClick={this.update}></div>
          <div className="btn btn-default btn-warning glyphicon glyphicon-remove remove" onClick={this.cancel}></div>
          <ListTextBook textbooks={this.state.course.textbooks} id={this.state.course.id}/>
          <span onClick={this.mensaje}>Click Here!</span>
          <br />
          <span> Like : {String(this.state.like)}</span>
        </div>

      </div>
    )
  },
  normalMode: function() {
    return(
      <div className="centerBlock">
        <h3 className="bg-success">Curso {this.state.course.name} </h3>
        <div>
          <p> ID :
            <i> {this.state.course.id} </i>
          </p>
          <p>Nombre :
            <i> {this.state.course.name} </i>
          </p>
          <p> Description :
            <i> {this.state.course.description} </i>
          </p>
          <div className="btn btn-default btn-warning glyphicon glyphicon-pencil remove" onClick={this.editObject}></div>
          <div className="btn btn-default btn-danger glyphicon glyphicon-trash remove" onClick={this.removeObject}></div>
          <ListTextBook textbooks={this.state.course.textbooks}  id={this.state.course.id}/>
          <span onClick={this.mensaje}>Click Here!</span>
          <br />
          <span> Like : {String(this.state.like)}</span>
        </div>

      </div>
    )
  },
  render: function() {
    if (this.state.editing) {
      return this.editMode();
    }
    else {
      return this.normalMode();
    }
  }
})
var ListCourses = React.createClass({
  getInitialState: function() {
    return {
        courses:[
            {
            id: "123",
            name: "Introduction to Advertising",
            description: "Learn about advertising",
            textbooks: [
              {
                author: "Joe Smith",
                title: "Mobile Advertising Fundamentals"
              },
              {
                author: "Eli Hinnegan",
                title: "Introduction to Location-Based Advertising"
              },
              {
                author: "Edward Bernays",
                title: "Public Relations"
              },
            ]
          },

      ],
      coursesoriginal:[
          {
          id: "123",
          name: "Introduction to Advertising",
          description: "Learn about advertising",
          textbooks: [
            {
              author: "Joe Smith",
              title: "Mobile Advertising Fundamentals"
            },
            {
              author: "Eli Hinnegan",
              title: "Introduction to Location-Based Advertising"
            },
            {
              author: "Edward Bernays",
              title: "Public Relations"
            },
          ]
        },

    ],
    };
  },
  componentWillMount: function(){
    var arr = this.state.courses;
    console.log(arr);
    // this.setState({coursesoriginal:arr});
  },
  add: function(course) {
        var newCourse = this.refs.newCourse.value;
        if (newCourse == "")
        {
            if(typeof course == 'undefined')
            {
                newCourse = "Nueva course";
            }
            else
            {
                newCourse = course;
            }
        }
        var arr = this.state.courses;
        var course = {
          id:"100",
          name : newCourse,
          description: newCourse,
          textbooks: [],
        }
        arr.push(course);
        console.log(arr);
        this.setState({courses: arr});
        this.refs.newCourse.value = "";
    },
  removeList: function(i) {
    var arr = this.state.courses;
    arr.splice(i, 1);
    this.setState({courses:arr});
  },
  editList: function(objeto, i) {
    var arr = this.state.courses;
    arr[i].id = objeto.id;
    arr[i].name = objeto.name;
    arr[i].description = objeto.description;
    this.setState({courses:arr});

  },
  eachItem: function(course, i) {
       return (
               <Course key={i}
                   index={i}
                   name={course.name}
                   id= {course.id}
                   description= {course.description}
                   course= {course}
                   onRemove={this.removeList}
                   onChange={this.editList}>
                   CourseNumber : {i+1}
               </Course>
           );
   },
 handleKeyDown: function(e){
      if( e.charCode === 13 ) {
              this.add();
          }
  },
  restore: function() {
    var original = this.state.coursesoriginal;
    console.log(original);
    this.setState({courses:original});
  },
  render: function() {
    return (
      <div>
        <header>
          <div className="btn btn-warning glyphicon glyphicon-saved remove" onClick={this.restore}>Restore Data</div>
          <h3>Cursos Activos:</h3>
          <i>Total: {this.state.courses.length}</i>
        </header>
        <div className="input-group">
          <input ref="newCourse" type="text" className="form-control" placeholder="Add Course Name..." onKeyPress={this.handleKeyDown} />
          <span className="input-group-btn">
            <div className="btn btn-default btn-success" onClick={this.add.bind(null, "Nueva comida")} > + </div>
          </span>
        </div>
        <div>
          {this.state.courses.map(this.eachItem)}
        </div>
      </div>
    );
  }
})

var Teacher = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hi Teacher!</h1>
        <ListCourses />

      </div>
    );
  }
})

var Pais = React.createClass({
  componentWillMount: function(){
    var pais;
    $.getJSON("https://restcountries.eu/rest/v1/all", function(data) {
        for (pais in data) {
          console.log(pais, data[pais].name);
        }
    })
  },
  render: function() {
    return (
      <div>HOLA!</div>
    );
  }
})

ReactDOM.render(
  <div className="centerBlock">
    <Teacher />
  </div>
  ,
  document.getElementById('demo')
);
