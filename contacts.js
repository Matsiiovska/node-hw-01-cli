const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();
const contactsPath = path.resolve("db", "contacts.json");




// TODO: задокументувати кожну функцію
async function listContacts() {
        //читаємо вміст файлу
        const data = await fs.readFile(contactsPath, 'utf-8');
        //парсимо json-рядок у масив об'єктв контактів
        const contacts = JSON.parse(data);
        return contacts;

}

async function getContactById(contactId) {
        //отримуємо масив усіх контактів
        const contacts = await listContacts();
        //знаходимо контакт з вказаним id
        const contact = contacts.find((c) => c.id === contactId);
        //повертаємо знайдениий контакт або null якщо його не знайдено
        return contact || null;

}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }
        const [removedContact] = contacts.splice(index, 1);//видаляємо контакт з масиву
            await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            return removedContact;
   

    
}

async function addContact(name, email, phone) {
            const contacts = await fs.readFile(contactsPath, 'utf-8');
    const contactsArray = JSON.parse(contacts);

    // Генеруємо новий ідентифікатор для контакту
  const id = uuidv4();

    // Створюємо об'єкт нового контакту
    const newContact = {
      id,
      name,
      email,
      phone,
    };

    // Додаємо новий контакт до списку
    contactsArray.push(newContact);

    // Зберігаємо оновлений список контактів у файлі
    await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));

    return newContact;



}
    
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

