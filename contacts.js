const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require('nanoid');



 const contactsPath = path.join(__dirname, 'db/contacts.json');
//  console.log(contactsPath);

 const getPath = async (filePath) => {
const data = await fs.readFile(filePath);
return JSON.parse(data);
 }

// TODO: задокументувати кожну функцію
async function listContacts() {
    try {
      const readData = await getPath(contactsPath);
  
      console.table(readData);
  
      return readData;
    } catch (error) {
      console.log(error.message);
    }
  }
  
  async function getContactById(contactId) {
    try {
        const readData = await getPath(contactsPath);
        const result = readData.find(item => item.id === contactId);
        console.table(result);
    }catch (error){
        console.log(error.message);
    }
  }

   async function addContact(name, email, phone) {
    try {
      const readData = await getPath(contactsPath);
const newContact = {
  id: nanoid(),
  name,
  email,
  phone,
}
const newData = [...readData, newContact];

const addContacts = await fs.writeFile(
  contactsPath,
  JSON.stringify(newData, null, 2)
);

console.table(newData);

return addContacts;
  }catch (error){
      console.log(error.message);
  }
  }

    
  async function removeContact(contactId) {
    try {
      const readData = await getPath(contactsPath);
      const deleteById = readData.filter(item => item.id !== contactId);
      const resultRemove = await fs.writeFile(
        contactsPath,
        JSON.stringify(deleteById, null, 2)
      );
  
      console.table(deleteById);
  
      return resultRemove;
  }catch (error){
      console.log(error.message);
  }
  }

  module.exports ={
    listContacts,
    getContactById,
    addContact,
    removeContact,
  }