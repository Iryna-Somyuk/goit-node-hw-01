const fs = require('fs/promises');
const path = require("path");



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
  
  function removeContact(contactId) {
    // ...твій код
  }
  
  function addContact(name, email, phone) {
    // ...твій код
  }

  module.exports ={
    listContacts,
    getContactById,
  }