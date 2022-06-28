const { response } = require('express')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt');
const { callbackify } = require('util');
const { promise } = require('bcrypt/promises');

module.exports = (articleService, userService) => { 
    return new Promise(async (resolve, reject) => {
        const content = '<h1>Est facilis sapiente qui possimus sunt. </h1><p>Lorem ipsum dolor sit amet. \
        Aut quas accusamus aut maxime asperiores qui explicabo commodi id quia voluptas. \
        Ut accusamus corporis qui asperiores suscipit aut cumque nihil  ipsum quos quo totam \
        sapiente ut delectus vero est eaque quae. Eos rerum fugit eum velit quae non illo aliquam \
        est expedita voluptatibus et minima mollitia ut rerum aperiam ut natus nihil. Qui quisquam \
        placeat hic vero amet eum quasi porro et harum tempora est quasi molestias ex repudiandae quia.\
        Est sint quaerat <em>Sit quia quo autem consectetur</em>. Non ipsum eligendi ut minima obcaecati \
        <strong>Ab aliquam aut illum totam</strong>. Ut molestias aliquam sit minima voluptate ut \
        perspiciatis perspiciatis non consequatur quos qui nobis omnis aut iusto iste sit consectetur \
        error. Ea officia repellat in mollitia vitae est vero dolore et saepe doloribus in enim debitis et\
        aperiam corporis qui nobis aliquid. Aut architecto facere id ducimus delectus aut asperiores \
        deleniti est corporis fugit qui sapiente cumque ut consequuntur voluptatem est possimus alias. \
        </p><ol><li>Ut mollitia iste non assumenda blanditiis sed omnis tempore sit galisum ducimus. \
        </li><li>Eos harum quia et consectetur accusantium quo quibusdam omnis id nobis libero. \
        </li><li>Sit nesciunt dignissimos ut voluptates molestiae est autem reprehenderit sed harum voluptatem. \
        </li><li>Aut saepe libero ut magni adipisci. </li><li>Et earum soluta quo asperiores porro ut architecto omnis. \
        </li></ol><blockquote cite="https://www.loremipzum.com">Sit molestiae aperiam et blanditiis totam et earum omnis\
        eum magnam velit a voluptas dolores non mollitia quibusdam? </blockquote><h2>Est dolores deserunt qui \
        facilis aspernatur. </h2><p>Vel consequatur minus sed expedita odit33 dicta et repellat iure 33 voluptatem maxime.\
        Et placeat molestiae aut nihil dolore <em>Sed aspernatur non placeat quae</em> ut officia error et ullam quos et \
        aspernatur dolores. Est deleniti minus <a href="https://www.loremipzum.com" target="_blank">Cum suscipit eum dolores\
        dolores qui omnis omnis non quam neque</a>? A voluptatum quae a galisum dolorem est quisquam vitae vel quos \
        praesentium ut delectus doloremque sed maiores voluptates non voluptatem laborum! Est culpa nostrum est earum ipsam \
        ad recusandae nihil eos sapiente nesciunt id reprehenderit excepturi sed atque repudiandae. Vel Quis dolor est \
        doloremque quidem ab tenetur dolore et iste saepe? Aut eius accusamus in nulla internos qui laudantium numquam. Eos \
        beatae galisum vel odit excepturi est facilis quisquam. Id consequatur nesciunt et illo laudantium id placeat iusto et\
        consectetur veritatis ut laudantium recusandae cum iusto aperiam a nihil ducimus. </p><dl><dt><dfn>Aut sequi modi et \
        suscipit molestiae? </dfn></dt><dd>Id dolorem commodi aut corporis consequatur et aperiam amet. </dd><dt><dfn>In \
        accusantium exercitationem et consectetur molestiae. </dfn></dt><dd>Et voluptatem iusto ut harum quisquam. </dd></dl>\
        <h3>Ut earum corrupti qui labore fugiat ad porro rerum. </h3><p>Et sint delectus vel veniam quod ut sapiente laudantium et voluptatem ducimus et facere galisum. \
        Eum omnis perferendis sed molestiae inciduntaut rerum. Non voluptas quae cum quaerat quibusdam in molestiae quia ut \
        modi animi a itaque tenetur. Eum voluptatum tempore ea sapiente porro cum quas sequi ut eaque cumque. Est vitae \
        internos <strong>Hic sunt id impedit perspiciatis eos quia minus</strong>. Quo dignissimos voluptatem qui quidem \
        tenetur ad sapiente voluptas quo quia sequi vel veritatis deleniti? Est repudiandae quam \
        <a href="https://www.loremipzum.com" target="_blank">Aut galisum</a> eum molestias corrupti nam veniam sunt? \
        </p><ul><li>Non quidem molestias qui velit mollitia et quis voluptatem. </li><li>Et tenetur fuga 33 sint ducimus \
        non expedita sint eos quia molestias. </li><li>Hic delectus voluptatem 33 vero quas id tenetur enim. </li><li>Qui \
        pariatur ipsum ut similique reprehenderit ut quidem magni. </li><li>Vel eveniet vero ut neque ipsam non accusamus \
        nisi. </li><li>Sit nostrum voluptatem eos esse quod eum fuga aliquam. </li></ul><h4>In rerum nihil cum nobis \
        recusandae. </h4><p>Et quasi minus eos nemo illo  voluptatum quisquam sit corrupti inventore et aliquid laudantium. \
        Et doloribus veritatis qui culpa fuga <strong>Eos nulla id internos quae vel quibusdam rerum sit labore corrupti\
        </strong>! Ad galisum pariatur <a href="https://www.loremipzum.com" target="_blank">Et internos sit deserunt omnis</a>.\
        Est saepe asperiores <em>Ad blanditiis et soluta temporibus ad quaerat placeat</em>. Est quam asperiores ut nostrum \
        sunt aut magnam aliquid. </p><pre><code>&lt;!-- Eos architecto beatae. --&gt;<br>&lt;molestias&gt;Nam voluptatem alias in temporibus \
        consectetur.&lt;/molestias&gt;<br>&lt;dolorum&gt;Aut quos nihil.&lt;/dolorum&gt;<br>&lt;voluptate&gt;Rem galisum ullam \
        ut placeat modi et harum nobis!&lt;/voluptate&gt;<br></code></pre><h5>Ea sunt nostrum ex veritatis beatae? </h5><p>Nam \
        consequatur suscipit et omnis nulla est voluptatibus inventore sit similique Quis et beatae aperiam ut iure dolore. \
        Sit laborum pariatur sed provident quia et delectus cumque qui eaque corrupti. Et laboriosam libero ut dolorem enim \
        qui voluptas similique qui vero molestiae et itaque eveniet. Sit nesciunt doloremque quo animi placeat eum corrupti \
        illo cum unde exercitationem et tempore minus id officiis dolorem in dolor nobis. Vel sequi quaerat33 veritatis ex \
        galisum voluptas. Et totam repellat et voluptatem omnis nam  optio et internos dicta sed eius deserunt in minima minima. \
        Non maiores laborum <em>Ea perferendis qui deserunt dolores et tempora provident</em> quo quae ratione et accusantium \
        praesentium. </p>'

        try {
            new Promise((resolve, reject) => {
                userService.dao.db.query("SELECT * FROM user", (err, rows, fields) => {
                    if(err) {
                        return reject(err);
                    }
                    resolve(rows);
                })
            })
            .then(response => {
                if(response.length === 0) {
                    try {
                        (async function seedUser() {
                            const pwd = await bcrypt.hash("user1", 10);
                            userService.dao.db.query("INSERT INTO user (firstName, lastName, email, passwordHash, registeredAt) \
                            VALUES (?, ?, ?, ?, ?)",
                            ["userTest1", "userTest1", "userTest1@test.test", pwd, new Date()],
                            (err, rows, fields) => {
                                if (err) {
                                    return reject(err);
                                }
                                resolve(rows);
                            })
                        })()
                    }
                    catch(e) {console.log(e)}                    

                    try {
                        (async function seedUser() {
                            const pwd = await bcrypt.hash("user2", 10);
                            userService.dao.db.query("INSERT INTO user (firstName, lastName, email, passwordHash, registeredAt) \
                            VALUES (?, ?, ?, ?, ?)",
                            ["userTest2", "userTest2", "userTest2@test.test", pwd, new Date()],
                            (err, rows, fields) => {
                                if (err) {
                                    return reject(err);
                                }
                                resolve(rows);
                            })
                        })()
                    }
                    catch(e) {console.log(e)}

                    try {
                        (async function seedUser() {
                            const pwd = await bcrypt.hash("user3", 10);
                            userService.dao.db.query("INSERT INTO user (firstName, lastName, email, passwordHash, registeredAt) \
                            VALUES (?, ?, ?, ?, ?)",
                            ["userTest3", "userTest3", "userTest3@test.test", pwd, new Date()],
                            (err, rows, fields) => {
                                if (err) {
                                    return reject(err);
                                }
                                resolve(rows);
                            })
                        })()
                    }
                    catch(e) {console.log(e)}
                    
                }
            })

            const slugify = articleTitle =>
            articleTitle
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');

            
            new Promise((resolve, reject) => {
                articleService.dao.db.query("SELECT * FROM article", (err, rows, fields) => {
                    if(err) {
                        return reject(err);
                    }
                    resolve(rows);
                })
            })
            .then(response => {
                if(response.length === 0) {
                    
                        /*let idrf = []
                        let getUserId = new Promise((resolve, reject) => {
                            userService.dao.db.query("SELECT id FROM user WHERE user.email = 'userTest1@test.test'",
                                (err, rows, fields) => {
                                    if (err) {
                                        return reject(err);
                                    }
                                    resolve(rows[0].id)      
                                });              
                              })

                            
                            //getUserId.then(response => console.log(response))
                         
                            const userId = getUserId.then(response => resolve(response))
                            //getUserId.then(response => {idrf = response})
                            
                            const getUserIdOut = async () => {
                                const a = await getUserId;
                                console.log("getUserIdOut")
                                console.log(a);
                                return a;
                              };
                              
                            const xx = getUserIdOut();

                           console.log("xx")
                           console.log(xx)
                            //await userService.dao.db.query("SELECT id FROM user WHERE user.email = 'userTest1@test.test'")
                            /*let id = *///await userService.dao.db.query("SELECT id FROM user WHERE user.email = 'userTest1@test.test'")
                            //console.log(id)
                            
                       // }
                      
                        //console.log(getId())
                        //getId().then(response => console.log(response))
                    try {   
                        // Article 1 User 1
                        (async function seedArticle() {
                            articleService.dao.db.query("INSERT INTO article  \
                            (author_id, title, meta_title, slug, summary, published, created_at, published_at, updated_at, content) \
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            [1,
                            "Titre Article 1 - Test",
                            "Meta Titre Article 1 - Test",
                            slugify("Titre Article 1 - Test"),
                            "Summary Article 1 Test",
                            1,
                            new Date(),
                            new Date(),
                            new Date(),
                            content
                            ])
                        })()
                    }
                    catch(e) {console.log(e)}

                    try {   
                        // Article 2 User 2
                        (async function seedArticle() {
                            articleService.dao.db.query("INSERT INTO article  \
                            (author_id, title, meta_title, slug, summary, published, created_at, published_at, updated_at, content) \
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            [2,
                            "Titre Article 2 - Test",
                            "Meta Titre Article 2 - Test",
                            slugify("Titre Article 2 - Test"),
                            "Summary Article 2 Test",
                            1,
                            new Date(),
                            new Date(),
                            new Date(),
                            content
                            ])
                        })()
                    }
                    catch(e) {console.log(e)}

                    try {   
                        // Article 3 User 3
                        (async function seedArticle() {
                            articleService.dao.db.query("INSERT INTO article  \
                            (author_id, title, meta_title, slug, summary, published, created_at, published_at, updated_at, content) \
                            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            [3,
                            "Titre Article 3 - Test",
                            "Meta Titre Article 3 - Test",
                            slugify("Titre Article 3 - Test"),
                            "Summary Article 3 Test",
                            1,
                            new Date(),
                            new Date(),
                            new Date(),
                            content
                            ])
                        })()
                    }
                    catch(e) {console.log(e)}
                }
            }) 
            
            /*
            
              const slugify = articleTitle =>
                articleTitle
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');

            const slug = slugify(article.title)
            
            */

/*
insertUser(user) {
return new Promise((resolve, reject) => {
this.db.query("INSERT INTO user (firstName, lastName, email, passwordHash, registeredAt) VALUES (?, ?, ?, ?, ?)", 
[user.firstname, user.lastName, user.email, user.passwordHash, user.registeredAt], (err, rows, fields) => {
if (err) {
return reject(err);
}
resolve(rows);
})
})
}
*/



            
            //Article
            //const isempty = articleService.dao.db.query("SELECT * FROM article")
           /*
            const isempty = new Promise((resolve, reject) => {
            articleService.dao.db.query("SELECT * FROM article", (err, rows, fields) => {
                if(err) {
                    return reject(err);
                }
                resolve(rows);
                })
           })
           
           isempty.then(response => {
            if(response.length === 0) {
                console.log("table vide")
                //seed
            }

           })
          */
            //console.log(isnotexist)
            //const data = fs.readFileSync('sql/article.sql', 'utf8')                  
         /*
            articleService.dao.db.query(" \
                CREATE TABLE `article` ( \
                    `id` int(11) NOT NULL, \
                    `author_id` int(11) DEFAULT NULL, \
                    `parent_id` int(11) DEFAULT NULL, \
                    `title` int(11) NOT NULL, \
                    `meta_title` text DEFAULT NULL, \
                    `slug` varchar(255) DEFAULT NULL, \
                    `summary` varchar(255) DEFAULT NULL, \
                    `published` tinyint(1) NOT NULL, \
                    `created_at` date NOT NULL, \
                    `updated_at` date NOT NULL, \
                    `published_at` date NOT NULL, \
                    `content` varchar(255) NOT NULL \
                    ) \
                ")
             
                articleService.dao.db.query("ALTER TABLE `article` ADD PRIMARY KEY (`id`);")
                articleService.dao.db.query("ALTER TABLE `article` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;")
                articleService.dao.db.query("COMMIT;")
        */

            /*
            await userService.dao.db.query("CREATE TABLE `user` (`id` int(11) NOT NULL, \
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


/*
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
            
            /*
            articleService.dao.db.query(" \
            CREATE TABLE `article` ( \
                `id` int(11) NOT NULL, \
                `author_id` int(11) DEFAULT NULL, \
                `parent_id` int(11) DEFAULT NULL, \
                `title` int(11) NOT NULL, \
                `meta_title` text DEFAULT NULL, \
                `slug` varchar(255) DEFAULT NULL, \
                `summary` varchar(255) DEFAULT NULL, \
                `published` tinyint(1) NOT NULL, \
                `created_at` date NOT NULL, \
                `updated_at` date NOT NULL, \
                `published_at` date NOT NULL, \
                `content` varchar(255) NOT NULL \
                ) \
            ")
         
            articleService.dao.db.query("ALTER TABLE `article` ADD PRIMARY KEY (`id`);")
            articleService.dao.db.query("ALTER TABLE `article` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;")
            articleService.dao.db.query("COMMIT;")
                */

            //if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
            //    resolve()
            //}
            //else {
            //    reject(e)
            //}
            //return

            // IF E create table

            //manage error message here
        }

        //userAccountService.insert("User1", "user1@exemple.com", "azerty")
        //userAccountService.insert("User2", "user2@exemple.com", "azerty")
        

        resolve()
    })
}
