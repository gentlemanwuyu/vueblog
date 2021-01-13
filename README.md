# Vue博客前端项目
这是一个使用vue2.6+typescript+vuetify搭建的博客前端项目

## 拉取代码
```
git clone https://github.com/gentlemanwuyu/vueblog.git
```

## npm安装
```
npm install
```

## 本地运行
```
npm run serve
```

## 线上打包项目
```
npm run build
```

## Nginx配置
```
server {
    listen       80;
    server_name  前端项目地址;
    autoindex on;

    root /var/www/blog/blog/dist/;
    location / {
        index  index.html;
        try_files $uri $uri/ /index.html;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header REMOTE-HOST $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        if ($http_user_agent ~* "spider|bot") {
            proxy_pass http://127.0.0.1:3000;
        }
    }

    location ^~ /api/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass API项目地址;
    }
}
```

### API项目请参考[blog-api](https://github.com/gentlemanwuyu/vueblog-api)