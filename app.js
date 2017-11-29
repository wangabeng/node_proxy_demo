var express = require('express');
var app = express();

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

// 坑
// 本来想实现输入：'a.abeng.cn'跳转到'http://localhost:3000'
// 但是'a.abeng.cn'这个服务器没有开启 如何能捕获req呢？？？？所以本例用localhost:9000做实验
// 输入localhost:9000 因为设置了代理服务器 会跳转到http://localhost:4000服务器上
// 
/*app.use(proxyPass({
	'a.abeng.cn': 'http://localhost:3000',
	'b.abeng.cn': 'http://localhost:4000'
}));

function proxyPass (config) {
	return function (req, res, next) {
		var target = config[req.hostname];
		proxy.web(req, res, {
			target: target
		});
	}
}*/
app.use((req, res) => {
	proxy.web(req, res, {
		target:'http://localhost:4000'
	});
});

// 基本用法测试
/*app.use((req, res, next) => {
	console.log(req.hostname);
	proxy.web(req, res, {
		target: 'http://localhost:4000'
	});
});*/

app.listen(9000); // 输入localhost：900 会跳转到4000的服务器上



// 应用服务器A 绑定域名 a.abeng.cn
var app3000 = express();
app3000.get('/', function (req, res) {
	res.end('3000');
});
app3000.listen(3000);


// 应用服务器B 绑定域名 b.abeng.cn
var app4000 = express();
app4000.get('/abeng', function (req, res) {
	res.end('4000');
});
app4000.listen(4000);

