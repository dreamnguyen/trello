function _defineProperty(obj, key, value) // tạo hàm defineproperty với 3 tham số obj, key, value
{if (key in obj) // nếu key trong obj
  {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); // các giá trị 
} else 
  {obj[key] = value;}return obj;} // obj[key] = value thì trả về obj
class DragAndDropApp extends React.Component {constructor(...args) {super(...args);_defineProperty(this, "state",
    {
      tasks: [
      {
        name: "Add More Tasks",
        category: "todo" }] });_defineProperty(this, "onDragOver",



    ev => { // khởi tạo 
      ev.preventDefault();  
    });_defineProperty(this, "onDragStart",

    (ev, name) => {
      ev.dataTransfer.setData("id", name);// giữ dữ liệu đang đc kéo và thả và setData theo "id" với
    });_defineProperty(this, "onDrop", 

    (ev, cat) => {
      const id = ev.dataTransfer.getData("id"); // tạo biến id gán với ev.dataTransfer.getData("id") giữ dữ liệu đang đc kéo vào thả với "id"

      let tasks = this.state.tasks.filter(task => { //tạo biến tasks gán bằng lọc dữ liệu qua phương thức filter 
        if (task.name == id) {
          task.category = cat;
        }
        return task;
      });
      this.setState({
        ...this.state,
        tasks });

    });_defineProperty(this, "handleKeyPress",

    ev => {
      if (ev.key == "Enter" && ev.target.value != "") {
        this.setState({
          tasks: [
          ...this.state.tasks,
          { name: ev.target.value, category: "todo" }] });


        ev.target.value = " ";
      }
    });}

  render() {
    var tasks = {
      todo: [],
      working: [],
      complete: [],
      trash: [] };


    this.state.tasks.forEach(t => {
      tasks[t.category].push( 
      React.createElement("div", {
        className: "item-container",
        key: t.name,
        draggable: true,
        onDragStart: e => this.onDragStart(e, t.name) },

      t.name));


    });



    return (
      React.createElement("div", null,  // trả về thẻ div 
      React.createElement("div", { id: "background-image" }),  // trả về thẻ div có id là background-image
      React.createElement("div", { class: "container" },  // trả về thẻ div có class là container 
      React.createElement("div", { // trả về thẻ div  có class là drop-are
        className: "drop-area",
        onDragOver: e => this.onDragOver(e), // thực hiện thao tác kéo thả
        onDrop: e => this.onDrop(e, "todo") },  // thực hiện thao tác drop vào phần todo

      React.createElement("h1", null, "Todo"), // // trả về thẻ h1 có tên là Todo
      tasks.todo), 

      React.createElement("div", { // // trả về thẻ div  có class là drop-area 
        className: "drop-area",
        onDragOver: e => this.onDragOver(e), // thực hiện thao tác kéo thả 
        onDrop: e => this.onDrop(e, "working") }, // thực hiện thao tác drop vào phần working

      React.createElement("h1", null, "Working"), // // trả về thẻ h1 có tên là Working
      tasks.working), 

      React.createElement("div", { // trả về thẻ div có class là drop-area
        className: "drop-area",
        onDragOver: e => this.onDragOver(e), //thực hiện thao tác kéo thả 
        onDrop: e => this.onDrop(e, "complete") },  //thực hiện thao tác drop vào phần complete

      React.createElement("h1", null, "Complete"),// trả về thẻ h1 có tên là Complete
      tasks.complete)), 


      React.createElement("div", null, // trả về thẻ div 
      React.createElement("input", { // trả về thẻ input 
        onKeyPress: e => this.handleKeyPress(e), // thực hiện hành động nhận dữ liệu từ ô input 
        className: "input",
        type: "text",
        placeholder: "Task Name" }), 


      React.createElement("div", { // trả về thẻ div với class là trash-drop
        class: "trash-drop",
        onDrop: e => this.onDrop(e, "trash"), // thực hiện hành động drop 
        onDragOver: e => this.onDragOver(e) }, "Drop here to remove")))); // khi di chuyển sự kiện event vào đây thì sẽ xóa 
  }}


ReactDOM.render( React.createElement(DragAndDropApp, null), document.getElementById("root"));