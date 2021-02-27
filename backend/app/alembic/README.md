Generic single-database configuration.

修改Model后自动生成迁移脚本
```shell
$ alembic revision --autogenerate -m "xxx"
```

根据迁移脚本更新数据库
```shell
$ alembic upgrade head
```