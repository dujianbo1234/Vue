const express = require('express');
const app = express();

const ejs = require('ejs');

const bodyParser = require('body-parser');

const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: 'mysql_001',
    user: 'root',
    password: 'root'
})

//设置默认采用的模板引擎名称
app.set('view engine', 'ejs')
//设置模板页面的存放路径
app.set('views', './views')

// 注册解析表单数据中间件
app.use(bodyParser.urlencoded({ extended:false }));
// 把/node_modules 文件夹,托管为静态资源目录
app.use('/node_modules', express.static('node_modules'));

app.get('/', (req, res) => {
    //使用render函数前，一定要保证安装和配置了ejs模板引擎
    res.render('index.ejs', { name: 'zs', age: 22 })

})
// 用户请求的是注册页面
app.get('/register', (req, res) => {
    res.render('./user/register.ejs')
})
//登录页面请求
app.get('/login', (req, res) => {
    res.render('./user/login.ejs')
})

//要注册新用户了
app.post('/register', (req, res) => {
    // TODO: 完成用户注册的业务逻辑
    const body = req.body;
    // 判断用户输入的数据是否完整
    if(body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0){
        return res.send({msg:'请填写完整的表单数据后再注册用户!', status: 501})
    }
    // 查询用户名是否重复
    const sql1 = 'select count(*) as count from blog_users where username=?'
    conn.query(sql1, body.username,()=>{
        // 如果查询失败,则告知客户端失败
        if(err) return res.send({ msg: '用户名查重失败!', status:502 });
    })
    res.send({ msg:'新用户注册成功', status: 200 });
})


app.listen(3000, () => {
    console.log('server running at http://127.0.0.1:3000')
})