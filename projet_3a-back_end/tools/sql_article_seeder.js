const mysql =  require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database : 'esimed_projet3a_cms_blog'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });
 
//let select = db.query("SELECT * FROM user")
//console.log(select)

const slugify = articleTitle =>
                articleTitle
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
let slug = slugify("title-as--01")

let insertArticle1 = db.query("INSERT INTO article \
    (author_id, title, meta_title, slug, summary, published, created_at, content) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [2,
        "title-as--01",
        "meta-tilte-as--01",
        "slug-" + slug,
        "summary-as--01",
        true,
        new Date(),
        "Lorem ipsum dolor sit amet. At quia libero aut quaerat voluptatem id reiciendis optio et cumque blanditiis aut suscipit rerum et ipsa libero 33 omnis omnis. Sit quia adipisci id earum nobis At velit consequuntur 33 asperiores galisum ut aspernatur velit sed facilis quam qui fugiat omnis. \
        Qui dignissimos quis et quia quia id pariatur voluptatem qui voluptates magnam sed inventore excepturi ut reprehenderit odio. Aut quaerat modi id veritatis dicta quo incidunt vitae. Est facilis aliquid aut autem incidunt qui delectus vitae ad voluptatem nostrum. Et necessitatibus omnis sit expedita odio id atque repudiandae est excepturi quam hic consequatur doloribus. \
        Est fugiat rerum qui consequatur ipsum 33 consequatur nesciunt rem voluptas fuga 33 labore blanditiis non doloribus quibusdam. Rem earum molestias et quasi rerum hic dicta similique ea adipisci pariatur ut exercitationem consequuntur et aspernatur unde. Ut earum ipsum qui vitae adipisci eum excepturi laboriosam ut ipsum enim et quisquam incidunt a animi sint sit voluptas dolor. Et rerum deleniti cum velit inventore sed earum dolores et dolor eligendi ut possimus molestiae ab quam sapiente ut rerum vitae."
        ]   
    )

slug = slugify("title-as--02")

let insertArticle2 = db.query("INSERT INTO article \
    (author_id, title, meta_title, slug, summary, published, created_at, content) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [2,
        "title-as--02",
        "meta-tilte-as--02",
        "slug-" + slug,
        "summary-as--02",
        false,
        new Date(),
        "Lorem ipsum dolor sit amet. At quia libero aut quaerat voluptatem id reiciendis optio et cumque blanditiis aut suscipit rerum et ipsa libero 33 omnis omnis. Sit quia adipisci id earum nobis At velit consequuntur 33 asperiores galisum ut aspernatur velit sed facilis quam qui fugiat omnis. \
        Qui dignissimos quis et quia quia id pariatur voluptatem qui voluptates magnam sed inventore excepturi ut reprehenderit odio. Aut quaerat modi id veritatis dicta quo incidunt vitae. Est facilis aliquid aut autem incidunt qui delectus vitae ad voluptatem nostrum. Et necessitatibus omnis sit expedita odio id atque repudiandae est excepturi quam hic consequatur doloribus. \
        Est fugiat rerum qui consequatur ipsum 33 consequatur nesciunt rem voluptas fuga 33 labore blanditiis non doloribus quibusdam. Rem earum molestias et quasi rerum hic dicta similique ea adipisci pariatur ut exercitationem consequuntur et aspernatur unde. Ut earum ipsum qui vitae adipisci eum excepturi laboriosam ut ipsum enim et quisquam incidunt a animi sint sit voluptas dolor. Et rerum deleniti cum velit inventore sed earum dolores et dolor eligendi ut possimus molestiae ab quam sapiente ut rerum vitae."
        ]   
    )


slug = slugify("title-as--03")

let insertArticle3 = db.query("INSERT INTO article \
    (author_id, title, meta_title, slug, summary, published, created_at, content) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [2,
        "title-as--03",
        "meta-tilte-as--03",
        "slug-" + slug,
        "summary-as--03",
        true,
        new Date(),
        "Lorem ipsum dolor sit amet. At quia libero aut quaerat voluptatem id reiciendis optio et cumque blanditiis aut suscipit rerum et ipsa libero 33 omnis omnis. Sit quia adipisci id earum nobis At velit consequuntur 33 asperiores galisum ut aspernatur velit sed facilis quam qui fugiat omnis. \
        Qui dignissimos quis et quia quia id pariatur voluptatem qui voluptates magnam sed inventore excepturi ut reprehenderit odio. Aut quaerat modi id veritatis dicta quo incidunt vitae. Est facilis aliquid aut autem incidunt qui delectus vitae ad voluptatem nostrum. Et necessitatibus omnis sit expedita odio id atque repudiandae est excepturi quam hic consequatur doloribus. \
        Est fugiat rerum qui consequatur ipsum 33 consequatur nesciunt rem voluptas fuga 33 labore blanditiis non doloribus quibusdam. Rem earum molestias et quasi rerum hic dicta similique ea adipisci pariatur ut exercitationem consequuntur et aspernatur unde. Ut earum ipsum qui vitae adipisci eum excepturi laboriosam ut ipsum enim et quisquam incidunt a animi sint sit voluptas dolor. Et rerum deleniti cum velit inventore sed earum dolores et dolor eligendi ut possimus molestiae ab quam sapiente ut rerum vitae."
        ]   
    )

console.log(insertArticle1)
console.log(insertArticle2)
console.log(insertArticle3)

//process.exit()
