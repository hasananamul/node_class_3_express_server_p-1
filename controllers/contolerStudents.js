const fs = require("fs");
const path = require("path")

//Get data from json data
const students = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/students.json')))

//New Id generator
const newId = () => {
      if(students.length){
            return students[students.length -1].id + 1
      }else{
            return 1;
      }
}

//Get data fron
const getStudents = (req,res) => {
      students.length ? res.status(200).json(students) : res.send("Data not found !")
}

//Get single data
const getSingleStudent = (req,res) => {
      // Params ID identify
      let id = req.params.id;
      if(students.some(data => data.id == id)){
            res.status(200).json(students.find(data => data.id == id))
      }else{
            res.send(`Your requested data (id: ${id}) not found`);
      }
      
}

//Post data for create for new data
const postRequest = (req,res) => {
      let {name, age, skill, location, classs} = req.body;
      console.log(name);
      if(name == '' || age == '' || skill == '' || location == '' || classs == ''){
            res.send("Plese fill all field !")
      }else{
            students.push({
                  id : newId(),
                  ...req.body
            })
            fs.writeFileSync(path.join(__dirname,"../data/students.json"), JSON.stringify(students))
            res.send("Data added issuccessfullly ")
      }
}

//Update single data
const updateRequest = (req,res) => {
      // Params ID identify
      let id = req.params.id;
      if(students.some(data => data.id == id)){
            students[students.findIndex(data => data.id == id)] = {
                  id : id,
                  ...req.body
            }
            fs.writeFileSync(path.join(__dirname, "../data/students.json"), JSON.stringify(students))
            res.status(200).json({"message" : "Data updated is successfully !"})
      }else{
            res.status(202).json({"message" : "Data not found !"})
      }
}

//Delete data from server
const deleteRequest = (req,res) => {
      // Params ID identify
      let id = req.params.id;
      if(students.some(data => data.id == id)){
           let filtered_students = students.filter(data => data.id != id);
           fs.writeFileSync(path.join(__dirname, "../data/students.json"), JSON.stringify(filtered_students))
           res.status(200).json({"message" : "Your data is successfully deleted"})

      }else{
            res.status(202).json({"alert" : ` Data not found for ${req.params.id} `})
      }
}

module.exports = {
      getStudents,
      getSingleStudent,
      postRequest,
      updateRequest,
      deleteRequest
}