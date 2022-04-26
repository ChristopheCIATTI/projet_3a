const fs = require('fs')
const path = require('path')

//import fetch from 'node-fetch' 

//const Item = require('./item')
//const List = require('./list')

module.exports = (articleService, userService) => {
    
    /*
    userAccountService, 
    userService,
    customerManagerService,
    projectManagerService,
    invoiceManagerService
    */
   
    return new Promise(async (resolve, reject) => {

        try {

            //const data = fs.readFileSync('sql/article.sql', 'utf8')                  
            //console.log(data)

            //await articleService.dao.db.query(data)
            /*await userService.dao.db.query("CREATE TABLE `user` (`id` int(11) NOT NULL, \
                `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, \
                `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, \
                `birth_date` date NOT NULL, \
                `email_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, \
                `postal_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, \
                `phone_number` int(11) NOT NULL, \
                `turnover` int(11) NOT NULL, \
                `company_charges` int(11) NOT NULL, \
                `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL \
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci")
            await customerManagerService.dao.db.query("CREATE TABLE `customer_manager` ( \
                `id` int(11) NOT NULL, \
                `client_id` int(11) NOT NULL \
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;")
            await customerManagerService.dao.db.query("CREATE TABLE `business` ( \
                `id` int(11) NOT NULL, \
                `user_id` int(11) NOT NULL, \
                `name` varchar(255) NOT NULL, \
                `contact_name` varchar(255) NOT NULL, \
                `email` varchar(255) NOT NULL, \
                `phone_number` varchar(255) NOT NULL, \
                `postal_address` varchar(255) NOT NULL \
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;")
            await customerManagerService.dao.db.query(CREATE TABLE `customer` ( \
                `id` int(11) NOT NULL, \
                `user_id` int(11) NOT NULL, \
                `name` varchar(255) NOT NULL, \
                `email` varchar(255) NOT NULL, \
                `phone_number` varchar(255) NOT NULL, \
                `postal_address` varchar(255) NOT NULL \
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;)
            await projectManagerService.dao.db.query(CREATE TABLE `project_manager` ( \
                `id` int(11) NOT NULL, \
                `name` varchar(255) NOT NULL, \
                `client_id` int(11) NOT NULL, \
                `status` varchar(255) NOT NULL, \
                `user_id` int(11) NOT NULL \
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            await invoiceManagerService.dao.db.query(CREATE TABLE `invoice` ( \
                `id` int(11) NOT NULL, \
                `project_id` int(11) NOT NULL, \
                `status` varchar(255) NOT NULL, \
                `edit_date` date NOT NULL, \
                `limit_pay` date NOT NULL, \
                `effective_pay` date NOT NULL, \
                `notes` varchar(255) DEFAULT NULL, \
                `user_id` int(11) NOT NULL \
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            await invoiceManagerService.dao.db.query(CREATE TABLE `invoicerow` ( \
                `id` int(11) NOT NULL, \
                `libelle` varchar(255) NOT NULL, \
                `unit_price` int(11) NOT NULL, \
                `quantity` int(11) NOT NULL, \
                `invoice_id` int(11) NOT NULL \
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
            */
        }
        catch (e) {
            console.log(e)
            //if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
            //    resolve()
            //}
            //else {
            //    reject(e)
            //}
            //return
        }

        //userAccountService.insert("User1", "user1@exemple.com", "azerty")
        //userAccountService.insert("User2", "user2@exemple.com", "azerty")
        

        resolve()
    })
}
